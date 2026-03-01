'use client'
import {useForm, type SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {toast} from 'sonner'

import {fetcher} from '#/utils/fetcher'
import {useMutation} from '@tanstack/react-query'
import {queryClient} from '../../utils/query-client'
import {AddDishForm, createAddDishFormSchema} from '../../components/forms/add-dish'

const AddDishFormSchema = createAddDishFormSchema().build()
type FoodFormValues = z.infer<typeof AddDishFormSchema>

export default function AddDish() {
  const form = useForm<FoodFormValues>({
    // @ts-ignore
    resolver: zodResolver(AddDishFormSchema),
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
      variants: [],
    },
    mode: 'onChange',
  })
  const mutation = useMutation({
    mutationFn: (formData: any) => {
      return fetcher('/admin/dashboard/dish/add', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': "unset",
          // "Authorization": `Bearer ${token}`
        }
      })
    },
    onSuccess: (data) => {
      toast.success('Dish added successfully')
      queryClient.invalidateQueries({queryKey: ["dishes"]})
      form.reset();
    },
    onError: (err: any) => {
      toast.error('Error occur on dish add')
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

    // Append multiple images
    values.images.forEach((image: File) => {
      formData.append('images', image); // same key 'images' for all
    });

    // remove tem id
    values.variants = values.variants?.map((item: any) => {
      delete item.id
      return item;
    })

    // Append variants
    if (values.variants && values.variants.length > 0) {
      formData.append('variants', JSON.stringify(values.variants));
    }

    mutation.mutate(formData)
  }

  return (
    <AddDishForm
      isLoading={mutation.isPending}
      isDisabled={mutation.isPending}
      form={form}
      onSubmit={onSubmit}
    />
  )

}
