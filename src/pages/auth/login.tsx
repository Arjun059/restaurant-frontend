import {useNavigate} from 'react-router-dom'
import useStore from '#/store'
import {useMutation} from '@tanstack/react-query'
import {toast} from "sonner"
import {useForm} from 'react-hook-form'
import {fetcher} from '#/utils/fetcher'
import {PAGE_ROUTES} from '../../constants/page-routes'
import {LoginForm} from '../../components/forms/login'

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

      const {token, user} = data
      const {restaurant, ...userData} = user

      setAuthValue({token, user: userData, restaurant})
      let timer_id = setTimeout(() => {
        // wait for setting auth value;
        navigate(PAGE_ROUTES.RESTAURANT_ADMIN_RESTAURANT_INFO)
        clearTimeout(timer_id)
      }, 400)
    },
    onError: (error) => {
      toast.error(error.message || 'Invalid credentials', {
        duration: 3000,
        description: "Please try again with different email and password",
      })
    },
  })

  const form = useForm<{email: string; password: string}>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: any) {
    // console.log(values)
    mutation.mutate(values)
  }

  return (
    <LoginForm onSubmit={onSubmit} form={form} isLoading={mutation.isPending} />
  )
}
