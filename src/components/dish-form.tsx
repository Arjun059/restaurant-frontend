import {useState} from 'react'
import {Button} from '#/components/ui/button'
import {Input} from '#/components/ui/input'
import {Label} from '#/components/ui/label'
import {Textarea} from '#/components/ui/textarea'
import ImageUploader from './image-uploader'


interface DishFormData {
  name: string
  description: string
  price: string
  images: File[]
}

interface DishFormProps {
  onSubmit: (data: DishFormData) => void
  initialData?: Partial<DishFormData>
}

export default function DishForm({onSubmit, initialData}: DishFormProps) {
  const [formData, setFormData] = useState<DishFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    images: initialData?.images || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleImagesChange = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      images: files,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Dish Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
          placeholder="Enter dish name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({...prev, description: e.target.value}))}
          placeholder="Enter dish description"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData((prev) => ({...prev, price: e.target.value}))}
          placeholder="Enter price"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Images</Label>
        <ImageUploader
          files={formData.images}
          setFiles={handleImagesChange}
          maxFiles={5}
          className="mt-2"
        />
      </div>

      <Button type="submit" className="w-full">
        Save Dish
      </Button>
    </form>
  )
}
