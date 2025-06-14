import {cn} from '#/lib/utils'
import {Button} from '#/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '#/components/ui/card'
import {Input} from '#/components/ui/input'
import {Label} from '#/components/ui/label'
import {Link} from 'react-router-dom'
import useStore from '#/store'
import {useMutation} from '@tanstack/react-query'
import {toast} from "sonner"
import {useForm} from 'react-hook-form'
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
  FormLabel,
} from '#/components/ui/form'
import {fetcher} from '#/utils/fetcher'

export function LoginForm({className, ...props}: React.ComponentPropsWithoutRef<'div'>) {
  const {setAuthValue, setRestaurant}: any = useStore()
  const mutation = useMutation({
    mutationFn: (formData: any) => {
      return fetcher('/restaurant/sign-in', {
        method: 'POST',
        body: JSON.stringify(formData),
      })
    },
    onSuccess: (data) => {
      setAuthValue({token: data.token})
      setRestaurant(data.restaurant)
    },
    onError: ({message}: any) => {
      toast.error('User not found',)
    },
  })

  const form = useForm<any>({
    defaultValues: {
      email: 'arjun@gmail.com',
      password: 'arjun@123',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: any) {
    // console.log(values)
    mutation.mutate(values)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email" {...field} />
                        </FormControl>
                        <FormDescription>Enter your email address</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="password" {...field} />
                        </FormControl>
                        <FormDescription>Enter your email address</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
