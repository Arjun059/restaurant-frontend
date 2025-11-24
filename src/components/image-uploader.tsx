import ImageUploading from 'react-images-uploading'
import type {ImageListType} from 'react-images-uploading'
import {Button} from '#/components/ui/button'
import {cn} from '#/lib/utils'
import {ImageIcon, X} from 'lucide-react'

interface ImageHandlerProps {
  files: File[]
  setFiles: (files: File[]) => void
  className?: string
  maxFiles?: number
  disable?: boolean
}

const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8MB in bytes
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif',]

const ImageHandler = ({
  files = [],
  setFiles,
  className,
  maxFiles = 5,
  disable
}: ImageHandlerProps) => {
  const onChange =
    (imageList: ImageListType) => {

      console.log(imageList.filter((item) => {
        console.log(item.file?.type, "type of file")
        return true
      }))

      const validFiles = imageList.filter(file => {
        if (!file.file) return false


        console.log(file.file.type, 'type of file')

        // // Check file type
        if (!ALLOWED_TYPES.includes(file.file.type)) {
          console.error(`Invalid file type: ${file.file.type}`)

          return false
        }

        // Check file size
        if (file.file.size > MAX_FILE_SIZE) {
          console.error(`File too large: ${file.file.size} bytes`)
          return false
        }

        return true
      }).map(file => file.file as File)

      setFiles(validFiles)
    }

  const removeImage = (index: number) => {
    console.log("index", index, 'remvoe indes')
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }


  return (
    <div className={cn('w-full space-y-4', className)}>
      <ImageUploading
        multiple
        value={files.map(file => ({data_url: URL.createObjectURL(file), file}))}
        onChange={onChange}
        maxNumber={maxFiles}
        // acceptType={ALLOWED_TYPES}
        maxFileSize={MAX_FILE_SIZE}
      >
        {({
          imageList,
          onImageUpload,
          isDragging,
          dragProps,
          errors
        }) => (
          <div className="space-y-4">
            <div
              {...dragProps}
              className={cn(
                'cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors',
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-primary/50',
                disable && 'opacity-50 cursor-not-allowed'
              )}
              onClick={onImageUpload}
            >
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                <div className="text-muted-foreground text-sm">
                  {isDragging ? (
                    <p>Drop the images here</p>
                  ) : (
                    <p>Drag & drop images, or click to select</p>
                  )}
                </div>
                <p className="text-muted-foreground text-xs">
                  Supports: PNG, JPG, GIF (Max {maxFiles} images, 10MB each)
                </p>
              </div>
            </div>

            {errors && (
              <div className="text-red-500 text-sm">
                {errors.maxNumber && <p>Maximum {maxFiles} images allowed</p>}
                {errors.acceptType && <p>Only PNG, JPG, and GIF files are allowed</p>}
                {errors.maxFileSize && <p>Maximum file size is 8MB</p>}
              </div>
            )}
            <div className='space-y-0'>
              <ImagesList
                images={imageList.map((item) => ({name: item.file?.name, url: item.data_url})) as any}
                onRemove={removeImage}
                isDisabled={disable}
              />
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

export default ImageHandler

type ImageListPropType = {
  images: {url: string, name: string, folder?: string}[];
  onRemove: (index: number) => void;
  isDisabled?: boolean
}
export function ImagesList({images, onRemove, isDisabled}: ImageListPropType) {
  return (
    <div className='space-y-4'>
      {
        images.map((image, index) => (
          <div key={index} className="flex items-center gap-3 rounded-lg border bg-card p-2">
            <div className="h-12 w-12 flex-shrink-0">
              <img
                src={image.url}
                alt={`Preview ${index + 1}`}
                className="h-full w-full rounded-md object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">
                {image?.name || `Image ${index + 1}`}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="flex-shrink-0 border-red-100"
              onClick={() => onRemove(index)}
              disabled={isDisabled}
              type='button'
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))
      }
    </div>
  )
}
