import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '#/components/ui/button';
import { cn } from '#/lib/utils';
import { ImageIcon, X } from 'lucide-react';

interface ImageUploaderProps {
  onChange?: (files: File[] | null) => void;
  className?: string;
  maxFiles?: number;
}

export default function ImageUploader({ onChange, className, maxFiles = 5 }: ImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      if (onChange) {
        onChange(acceptedFiles);
      }
      const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews].slice(0, maxFiles));
    }
  }, [onChange, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles,
    multiple: true
  });

  const removeImage = (index: number) => {
    setPreviews(prev => {
      const newPreviews = [...prev];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
    if (onChange) {
      onChange([]);
    }
  };

  const clearAllImages = () => {
    setPreviews([]);
    if (onChange) {
      onChange([]);
    }
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            {isDragActive ? (
              <p>Drop the images here</p>
            ) : (
              <p>Drag & drop images, or click to select</p>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Supports: JPG, PNG, WEBP (Max {maxFiles} images)
          </p>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {previews.length} of {maxFiles} images uploaded
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllImages}
            >
              Clear All
            </Button>
          </div>
          <div className="space-y-2">
            {previews.map((preview, index) => (
              <div
                key={`preview-${preview}`}
                className="flex items-center gap-3 p-2 rounded-lg border bg-card"
              >
                <div className="w-12 h-12 flex-shrink-0">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">Image {index + 1}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="flex-shrink-0 border-red-100"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}