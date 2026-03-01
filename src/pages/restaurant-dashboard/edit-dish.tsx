"use client"
import {useEffect, useMemo} from 'react'
import {useForm, type SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {toast} from 'sonner'

import {fetcher} from '#/utils/fetcher'
import {useMutation, useQuery} from '@tanstack/react-query'
import {Dish_Categories} from '#/utils/constants'
import {queryClient} from '#/utils/query-client'
import {useParams} from 'react-router-dom'
import {AddDishForm, AddDishFormSchema} from '#/components/forms/add-dish'
import {ImagesList} from '#/components/image-uploader'
import {Label} from '#/components/ui/label'

const EditDishFormSchema = AddDishFormSchema.extend({
  images:
    z.array(z.any())
      .default([]), // making images non required field
  uploadedImages: z.array(z.object({url: z.string(), folder: z.string(), name: z.string()}).optional()).default([])
})

type FoodFormValues = z.infer<typeof EditDishFormSchema>

export default function EditDish() {
  const params = useParams()
  const id = params.id as string

  const form = useForm<FoodFormValues>({
    // @ts-ignore
    resolver: zodResolver(EditDishFormSchema),
    defaultValues: {
      name: '',
      description: "",
      price: undefined,
      categories: [],
      veg: false,
      preparationTime: '',
      images: [],
      bestSeller: false,
      rating: 0,
      uploadedImages: [],
      variants: [],
    },
    mode: 'onChange',
  })

  const {data: dishData, isLoading} = useQuery({
    queryKey: ['dish', id],
    queryFn: async () => {
      return fetcher(`/admin/dashboard/dish/get/${id}`)
    },
    enabled: !!id,
  })


  useEffect(() => {
    if (dishData) {
      const mapped = {
        name: dishData.name,
        description: dishData.description,
        price: dishData.price,
        categories: (dishData.categories || []).map((c: string) => {
          const found = Dish_Categories.find((d) => d.value === c)
          return found || {value: c, label: c}
        }),
        veg: dishData.veg,
        preparationTime: dishData.preparationTime || '',
        images: [], // user can upload new images
        bestSeller: dishData.bestSeller || false,
        rating: dishData.rating || 0,
        uploadedImages: dishData.images || [], // user can delete already uploaded
        variants: dishData.variants || [] // Load existing variants
      }
      form.reset(mapped)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dishData])

  const mutation = useMutation({
    mutationFn: (formData: any) => {
      return fetcher(`/admin/dashboard/dish/update/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': "unset",
        }
      })
    },
    onSuccess: (_data) => {
      toast.success('Dish updated successfully')
      queryClient.invalidateQueries({queryKey: ["dishes"]})
      queryClient.invalidateQueries({queryKey: ['dish', id]})
      // navigate('/r/admin/dishes-list')
    },
    onError: (err: any) => {
      console.log(err, 'this is error update dish')
      toast.error('Error occurred while updating dish')
    },
  })

  const onSubmit: SubmitHandler<any> = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    // Only append price if it's provided and variants are not present
    if (values.price !== undefined && values.price !== null && values.price !== '') {
      formData.append('price', String(values.price));
    } else {
      formData.append('price', '0');
    }
    formData.append('veg', String(values.veg));
    formData.append('preparationTime', values.preparationTime);
    formData.append('bestSeller', String(values.bestSeller));
    formData.append('rating', String(values.rating));

    if (values.categories?.length) {
      values.categories.forEach((item: any) => {
        formData.append('categories', item.value);
      })
    }

    // Append images: if File instances, append as upload; otherwise append existing image urls under 'existingImages'
    values.images.forEach((image: any) => {
      formData.append('images', image);
    });
    values.uploadedImages.forEach((existingImg: any) => {
      formData.append('existingImages', JSON.stringify(existingImg));
    })

    // Append variants
    if (values.variants && values.variants.length > 0) {
      values.variants.forEach((variant: any) => {
        formData.append('variants', JSON.stringify({
          id: variant.id,
          name: variant.name,
          price: variant.price
        }));
      })
    }

    mutation.mutate(formData)
  }


  const {uploadedImages} = form.watch()

  const fieldsConfig = useMemo(() => {
    const maxImagesAllowed = 5 - uploadedImages?.length
    return ({
      images: {maxFiles: maxImagesAllowed}
    })
  }, [uploadedImages])


  return (
    <AddDishForm
      isLoading={mutation.isPending || isLoading}
      form={form}
      onSubmit={onSubmit}
      submitText='Save Changes'
      fieldsInjection={{
        preImages: (form) => {
          const uploadedImages = form.watch('uploadedImages')

          if (uploadedImages.length === 0) return null;

          return (
            <>
              <div />
              <div className="">
                <Label>Uploaded Images</Label>
                <div className='my-3' />
                <ImagesList
                  images={uploadedImages}
                  onRemove={(index) => {
                    form.setValue('uploadedImages', uploadedImages.filter((__: any, i: number) => i !== index))
                    form.trigger(["images"])
                  }}
                />
              </div>
            </>
          )
        }
      }}
      fieldsConfig={fieldsConfig}
    />
  )
}
