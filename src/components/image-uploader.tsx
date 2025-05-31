import {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {Button} from '#/components/ui/button'
import {cn} from '#/lib/utils'
import {ImageIcon, X} from 'lucide-react'
import {BASE_URL} from '../utils/constants'
import {v4 as uuid} from 'uuid'


interface ImageUploaderProps {
  files: UploadItem[]
  setFiles: (files: UploadItem[]) => void
  className?: string
  maxFiles?: number
}

export interface UploadItem {
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

const ImageUploader = ({files = [], setFiles, className, maxFiles = 5}: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [updateKey, setUpdateKey] = useState<string | null>(null)

  // Cleanup object URLs when component unmounts or when items are removed
  // useEffect(() => {
  //   return () => {
  //     files.forEach((item) => {
  //       URL.revokeObjectURL(item.previewUrl)
  //     })
  //   }
  // }, [files])

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const newItems: UploadItem[] = acceptedFiles.slice(0, maxFiles - files.length).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      status: 'uploading',
      id: uuid(),
    }))

    // First update with new items
    const updatedUploads = [...files, ...newItems]
    setFiles(updatedUploads)
    setIsUploading(true)
    setUpdateKey(uuid())
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
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
      const newList = [...files]
      const removedItem = newList[index]
      if (removedItem?.previewUrl) URL.revokeObjectURL(removedItem.previewUrl)
      newList.splice(index, 1)
      setFiles(newList)
    },
    [files, setFiles]
  )

  useEffect(() => {
    if (updateKey !== null) {
      console.log("Starting upload process")

      // Upload each file sequentially
      const uploadPromises = files
        .filter((item) => item.status === 'uploading')
        .map((item) => {
          return new Promise(async (resolve, reject) => {

            try {
              console.log('Uploading file:', item.id)
              const formData = new FormData()
              formData.append('file', item.file)

              const res = await fetch(BASE_URL + '/dish/image/upload', {
                method: 'POST',
                body: formData,
              })

              if (!res.ok) {
                const errorData = await res.json().catch(() => ({}))
                throw new Error(errorData.message || `Upload failed with status ${res.status}`)
              }

              const data: UploadResponse = await res.json()
              console.log("Upload response for file:", item.id, data)

              if (!data.url) {
                throw new Error('Server response missing image URL')
              }

              // Update the specific file's status
              const updatedFiles = files.map((file) =>
                file.id === item.id
                  ? {...file, status: 'success' as const, serverUrl: data.url}
                  : file
              )
              setFiles(updatedFiles)
              resolve(item.id)


            } catch (err: any) {
              console.error('Upload error for item:', item.id, err)
              // Update the specific file's error status
              const updatedFiles = files.map((file) =>
                file.id === item.id
                  ? {...file, status: 'error' as const, error: err.message || 'Failed to upload'}
                  : file
              )
              setFiles(updatedFiles)
              reject(item.id)
            }
          })

        })

      Promise.allSettled(uploadPromises)
        .then((response) => {
          console.log('All uploads completed successfully')
          const changesFiles = [...files]

          response.forEach(({status, value, reason}: any) => {
            changesFiles.forEach((item) => {
              if (status === 'fulfilled') {
                item.status = 'success'
                item.serverUrl = value as string
              } else {
                item.status = 'error'
                item.error = reason as string
              }
            })


          })
          // Final check for any remaining uploading files
          // const finalFiles = files.map((file) => {

          //   file.id === 'uploading'
          //     ? {...file, status: 'error' as const, error: 'Failed to upload'}
          //     : file
          // })
          setFiles(changesFiles)
          setIsUploading(false)
          setUpdateKey(null)

        })
        .catch((error) => {
          console.error('Batch upload error:', error)
        })
        .finally(() => {
          // Final check for any remaining uploading files
          // const finalFiles = files.map((file) =>
          //   file.status === 'uploading'
          //     ? {...file, status: 'error' as const, error: 'Failed to upload'}
          //     : file
          // )
          // setFiles(finalFiles)
          // setIsUploading(false)
          // setUpdateKey(null)
        })
    }
  }, [updateKey, files, setFiles])

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

      {files.map((item, index) => (
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
              {item.status === 'uploading' && <span className="text-yellow-500">Uploading...</span>}
              {item.status === 'success' && <span className="text-green-500">Uploaded ✅</span>}
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

export default ImageUploader
