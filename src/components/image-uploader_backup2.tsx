import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { ImageIcon, X } from 'lucide-react'
import { BASE_URL } from '../utils/constants'
import { v4 as uuid } from 'uuid'

interface ImageUploaderProps {
  onChange?: (files: File[] | []) => void
  className?: string
  maxFiles?: number
}

interface UploadItem {
  file: File
  previewUrl: string
  status: 'uploading' | 'success' | 'error'
  error?: string
  id: string
  serverUrl?: string
}

interface UploadResponse {
  url: string
  message?: string
}

export default function ImageUploader({ onChange, className, maxFiles = 5 }: ImageUploaderProps) {
  const [uploads, setUploads] = useState<UploadItem[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Cleanup object URLs when component unmounts or when items are removed
  useEffect(() => {
    return () => {
      uploads.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl)
      })
    }
  }, [uploads])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      const newItems: UploadItem[] = acceptedFiles
        .slice(0, maxFiles - uploads.length)
        .map((file) => ({
          file,
          previewUrl: URL.createObjectURL(file),
          status: 'uploading',
          id: uuid(),
        }))

      setUploads((prev) => [...prev, ...newItems])
      setIsUploading(true)

      // Upload each file sequentially to avoid overwhelming the server
      const uploadPromises = newItems.map((item) => uploadImageToServer(item.file, item.id))
      Promise.all(uploadPromises)
        .then(() => {
          setIsUploading(false)
          // Notify parent component of successful uploads
          if (onChange) {
            const successfulUploads = uploads
              .filter((item) => item.status === 'success')
              .map((item) => item.file)
            onChange(successfulUploads.length > 0 ? successfulUploads : [])
          }
        })
        .catch((error) => {
          console.error('Batch upload error:', error)
          setIsUploading(false)
        })
    },
    [onChange, maxFiles, uploads]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles,
    multiple: true,
    disabled: isUploading,
  })

  const removeImage = useCallback(
    (index: number) => {
      setUploads((prev) => {
        const newList = [...prev]
        const removedItem = newList[index]
        if (removedItem?.previewUrl) URL.revokeObjectURL(removedItem.previewUrl)
        newList.splice(index, 1)
        return newList
      })

      if (onChange) {
        const remainingFiles = uploads
          .filter((_, i) => i !== index)
          .filter((item) => item.status === 'success')
          .map((item) => item.file)
        onChange(remainingFiles.length > 0 ? remainingFiles : [])
      }
    },
    [onChange, uploads]
  )

  const uploadImageToServer = async (file: File, id: string): Promise<void> => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch(BASE_URL + '/dish/image/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || `Upload failed with status ${res.status}`)
      }

      const data: UploadResponse = await res.json()

      if (!data.url) {
        throw new Error('Server response missing image URL')
      }

      setUploads((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: 'success', serverUrl: data.url } : item
        )
      )
    } catch (err: any) {
      console.error('Upload error:', err)
      setUploads((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: 'error', error: err.message || 'Failed to upload' }
            : item
        )
      )
      throw err // Re-throw to handle in Promise.all
    }
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors',
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50',
          isUploading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
          <div className="text-muted-foreground text-sm">
            {isDragActive ? (
              <p>Drop the images here</p>
            ) : isUploading ? (
              <p>Uploading images...</p>
            ) : (
              <p>Drag & drop images, or click to select</p>
            )}
          </div>
          <p className="text-muted-foreground text-xs">
            Supports: JPG, PNG, WEBP (Max {maxFiles} images)
          </p>
        </div>
      </div>

      {uploads.map((item, index) => (
        <div key={item.id} className="flex items-center gap-3 rounded-lg border bg-card p-2">
          <div className="h-12 w-12 flex-shrink-0">
            <img
              src={item.previewUrl}
              alt={`Preview ${index + 1}`}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">Image {index + 1}</p>
            <p className="text-xs text-muted-foreground">
              {item.status === 'uploading' && 'Uploading...'}
              {item.status === 'success' && 'Uploaded ✅'}
              {item.status === 'error' && (
                <span className="text-red-500">{item.error || 'Failed to upload ❌'}</span>
              )}
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="flex-shrink-0 border-red-100"
            onClick={() => removeImage(index)}
            disabled={isUploading}
          >
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  )
}
