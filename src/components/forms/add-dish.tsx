
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
import {useEffect} from 'react'

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

  // Clear price when variants are added
  useEffect(() => {
    const subscription = form.watch((data: any) => {
      const variants = data.variants || [];
      if (variants.length > 0 && data.price) {
        form.setValue('price', undefined);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

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
              render={({field}) => {
                const variants = form.watch('variants') || [];
                const isVariantsPresent = variants.length > 0;

                return (
                  <FormItem>
                    <FormLabel>
                      Price (₹)
                      {isVariantsPresent && <span className="text-muted-foreground text-sm"> (Optional)</span>}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={isVariantsPresent ? "Leave empty if using variants" : "249"}
                        disabled={isVariantsPresent}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
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

            {/* Variants Section */}
            <div className="md:col-span-2 space-y-4 border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Variants (Optional)</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const variants = form.getValues('variants') || []
                    form.setValue('variants', [
                      ...variants,
                      {id: `temp-${Date.now()}`, name: '', price: 0}
                    ])
                  }}
                >
                  + Add Variant
                </Button>
              </div>

              {(() => {
                const variants = form.watch('variants') || []
                return variants.length > 0 ? (
                  <div className="space-y-3">
                    {variants.map((variant: any, index: number) => (
                      <div key={variant.id || index} className="flex flex-col md:flex-row gap-3 items-end bg-white p-3 rounded-lg">
                        <div className="w-full md:flex-1">
                          <label className="text-sm font-medium">Variant Name</label>
                          <Input
                            placeholder="e.g., Half Plate"
                            value={variant.name}
                            onChange={(e) => {
                              const newVariants = [...variants]
                              newVariants[index].name = e.target.value
                              form.setValue('variants', newVariants)
                            }}
                            className="mt-1"
                          />
                        </div>
                        <div className="w-full md:w-32">
                          <label className="text-sm font-medium">Price (₹)</label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={variant.price}
                            onChange={(e) => {
                              const newVariants = [...variants]
                              newVariants[index].price = parseFloat(e.target.value) || 0
                              form.setValue('variants', newVariants)
                            }}
                            className="mt-1"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => {
                            form.setValue('variants', variants.filter((_: any, i: number) => i !== index))
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-3">No variants added yet. Click "Add Variant" to add one.</p>
                )
              })()}
            </div>
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
export const createAddDishFormSchema = () => {
  let schema: z.ZodObject<any> = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    description: z.string().min(10, {
      message: 'Description must be at least 10 characters.',
    }),
    price: z.coerce.number().optional(),
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
    variants: z.array(z.object({
      id: z.string().optional(),
      name: z.string().min(1, {
        message: 'Variant name is required.',
      }),
      price: z.coerce.number().min(0, {
        message: 'Price must be at least ₹0.',
      }),
    })).default([]),
  });

  const api = {
    extend<T extends z.ZodRawShape>(shape: T) {
      schema = schema.extend(shape)
      return api
    },

    build() {
      return schema.refine(
        (data) => {
          // If no variants, price is required
          if (!data.variants || data.variants.length === 0) {
            return data.price !== undefined && data.price > 0;
          }
          // If variants exist, price is optional
          return true;
        },
        {
          message: 'Price must be at least ₹1 when no variants are added.',
          path: ['price'],
        }
      )
    },
  }

  return api
}
