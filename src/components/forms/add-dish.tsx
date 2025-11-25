
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form'

import {Button} from '#/components/ui/button'

import {Input} from '#/components/ui/input'
import {Textarea} from '#/components/ui/textarea'
import Select from 'react-select'
import {Switch} from '#/components/ui/switch'

import ImageHandler from '#/components/image-uploader'
import {Dish_Categories} from '#/utils/constants'
import RatingStars from '#/components/rating-stars'
import {z} from 'zod'
import type {ReactNode} from 'react'

const defaultMaxImageAllowed = 5

type AddDishFormType = {
  form: any,
  onSubmit: (value: any) => void;
  isLoading?: boolean
  isDisabled?: boolean
  submitText?: string
  fieldsInjection?: {
    preImages?: (form: any) => ReactNode
    postImages?: (form: any) => ReactNode
  }
  fieldsConfig?: {
    images?: {
      maxFiles?: number
    }

  }
}
export function AddDishForm({form, onSubmit, isLoading, isDisabled, submitText = "Add Food Item", fieldsInjection, fieldsConfig = {}}: AddDishFormType) {
  const {images} = fieldsConfig;

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
                  <FormLabel>Name</FormLabel>
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

            {/* pre image field hook */}
            {fieldsInjection && fieldsInjection.preImages && fieldsInjection.preImages(form)}
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
                      maxFiles={images?.maxFiles ?? defaultMaxImageAllowed}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* post image field hook */}
            {fieldsInjection && fieldsInjection.postImages && fieldsInjection.postImages(form)}

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
                      className="resize-none h-36"
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
              disabled={isLoading || isDisabled}
              onClick={() => form.reset()}>
              Reset
            </Button>
            <Button loading={isLoading} disabled={isDisabled} type="submit">{submitText}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

// Form validation schema
export const AddDishFormSchema = z.object({
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

