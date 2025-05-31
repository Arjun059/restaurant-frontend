'use client'
import {useForm, type SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {Button} from '#/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form'
import {Input} from '#/components/ui/input'
import {Textarea} from '#/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import {Switch} from '#/components/ui/switch'
import {toast} from '#/hooks/use-toast'
import ImageHandler from '#/components/image-uploader'

// Form validation schema
const foodFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  price: z.coerce.number().min(1, {
    message: 'Price must be at least ₹1.',
  }),
  category: z.string({
    required_error: 'Please select a category.',
  }),
  veg: z.boolean().default(true),
  preparationTime: z.string().min(1, {
    message: 'Please enter preparation time.',
  }),
  bestSeller: z.boolean().default(false),
  images: z
    .array(z.any())
    .min(1, {
      message: 'Please upload at least one image.',
    })
    .default([]),
})

type FoodFormValues = z.infer<typeof foodFormSchema>

export default function AddDish() {
  const form = useForm<FoodFormValues>({
    // @ts-ignore
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      veg: true,
      preparationTime: '',
      images: [],
      bestSeller: false,
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<any> = async () => {
    toast({
      description: 'Dish added successfully',
      duration: 3000,
      variant: 'success',
    })
  }

  return (
    <div className="rounded-lg bg-white">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name */}
            <FormField
              control={form.control as any}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Food Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chicken Biryani" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control as any}
              name="price"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Price (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="249" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control as any}
              name="category"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="main-course">Main Course</SelectItem>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                      <SelectItem value="beverage">Beverage</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preparation Time */}
            <FormField
              control={form.control as any}
              name="preparationTime"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Preparation Time</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="30-40" {...field} className="pr-16" />
                      <span className="absolute select-none inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                        minutes
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Veg/Non-Veg */}
            <FormField
              control={form.control as any}
              name="veg"
              render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Vegetarian</FormLabel>
                    <FormDescription>Is this a vegetarian item?</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Best Seller */}
            <FormField
              control={form.control as any}
              name="bestSeller"
              render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Best Seller</FormLabel>
                    <FormDescription>Mark as a best selling item</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormField
              control={form.control as any}
              name="images"
              render={({field}) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Dish Images</FormLabel>
                  <FormControl>
                    <ImageHandler
                      setFiles={(newFiles) => {
                        // Ensure we're always passing an array to the form
                        field.onChange(newFiles)
                      }}
                      files={field.value || []}
                      maxFiles={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control as any}
              name="description"
              render={({field}) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Hyderabadi style dum biryani with succulent chicken pieces"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit">Add Food Item</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
