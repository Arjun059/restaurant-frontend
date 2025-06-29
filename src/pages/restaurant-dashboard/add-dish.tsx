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
import Select from 'react-select'
import {Switch} from '#/components/ui/switch'
import {toast} from 'sonner'

import ImageHandler from '#/components/image-uploader'
import {fetcher} from '#/utils/fetcher'
import {useMutation} from '@tanstack/react-query'
import {Dish_Categories} from '../../utils/constants'
import RatingStars from '../../components/rating-stars'

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
  categories: z.array(z.object({
    value: z.string(),
    label: z.string()
  }))
    .min(1, {
      message: 'Please select a category.',
    }),
  veg: z.boolean().default(true),
  preparationTime: z.string().min(1, {
    message: 'Please enter preparation time.',
  }),
  bestSeller: z.boolean().default(false),
  rating: z.number().default(0),
  images: z
    .array(z.any())
    .min(1, {
      message: 'Please upload at least one image.',
    })
    .default([]),
})

type FoodFormValues = z.infer<typeof foodFormSchema>

export default function AddDish() {
  const mutation = useMutation({
    mutationFn: (formData: any) => {
      return fetcher('/admin/dashboard/dish/add', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': "unset"
        }
      })
    },
    onSuccess: (data) => {
      console.log(data, 'response data')
      toast.success('Dish added successfully')
    },
    onError: (err: any) => {
      console.log(err, 'this is error add dish')

      toast.error('Error occur on dish add')
    },
  })
  const form = useForm<FoodFormValues>({
    // @ts-ignore
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: 'dahi balle',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
      price: 40,
      categories: [],
      veg: false,
      preparationTime: '10',
      images: [],
      bestSeller: false,
      rating: 0,
    },
    mode: 'onChange',
  })

  console.log(form.watch('categories'), "category")

  const onSubmit: SubmitHandler<any> = async (values) => {

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', String(values.price));
    formData.append('veg', String(values.veg));
    formData.append('preparationTime', values.preparationTime);
    formData.append('bestSeller', String(values.bestSeller));
    formData.append('rating', String(values.rating));

    if (values.categories?.length) {
      values.categories.forEach((item: any) => {
        formData.append('categories', item.value);
      })
    }

    // Append multiple images
    values.images.forEach((image: File) => {
      formData.append('images', image); // same key 'images' for all
    });

    mutation.mutate(formData)
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
              name="categories"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={[Dish_Categories[0]]}
                      isMulti
                      name="categories"
                      options={Dish_Categories}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
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
            <FormField
              control={form.control as any}
              name="rating"
              render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Rating</FormLabel>
                    <FormDescription>This rating have been shown in dish detail page</FormDescription>
                  </div>
                  <FormControl>
                    <RatingStars rating={field.value} onChange={field.onChange}></RatingStars>
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
            <Button type="button" variant="outline"
              disabled={mutation.isPending}
              onClick={() => form.reset()}>
              Reset
            </Button>
            <Button loading={mutation.isPending} type="submit">Add Food Item</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
