import {useNavigate} from 'react-router-dom'
import useStore from '#/store'
import {useMutation} from '@tanstack/react-query'
import {toast} from "sonner"
import {useForm} from 'react-hook-form'

import {fetcher} from '#/utils/fetcher'
import {PAGE_ROUTES} from '#/constants/page-routes'
import {type LoginFormSchema, LoginForm} from '#/components/forms/login'

export default function LoginPage() {
  const {setAuthValue}: any = useStore()
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: (formData: any) => {
      return fetcher('/user/sign-in', {
        method: 'POST',
        body: JSON.stringify(formData),
      })
    },
    onSuccess: (data) => {
      console.log(data, "hit on success login")
      toast.success('Login successful', {
        description: "You are now logged in to your account",
      })
      console.log(data, "hit on success login")

      const {token, user} = data
      const {restaurant, ...userData} = user

      navigate(PAGE_ROUTES.RESTAURANT_ADMIN_DASHBOARD)
      setAuthValue({token, user: userData, restaurant})
    },
    onError: (error) => {
      console.log(error, "hit on error login")
      toast.error('Invalid credentials', {
        duration: 3000,
        description: "Please try again with different email and password",
      })
    },
  })

  const form = useForm<LoginFormSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: LoginFormSchema) {
    // console.log(values)
    mutation.mutate(values)
  }

  return (
    <LoginForm form={form} onSubmit={onSubmit} isLoading={mutation.isPending} />
  )
}
