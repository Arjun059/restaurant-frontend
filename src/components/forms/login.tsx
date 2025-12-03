import {cn} from '#/lib/utils'
import {Button} from '#/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '#/components/ui/card'
import {Input} from '#/components/ui/input'
import {Label} from '#/components/ui/label'
import {Link} from 'react-router-dom'

import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
  FormLabel,
} from '#/components/ui/form'
import {EyeOffIcon, EyeIcon} from 'lucide-react'
import {useState} from 'react'

type LoginFormProps = {
  classNames?: {},
  form: any;
  onSubmit: (value: any) => void;
  isLoading?: boolean;
}

export type LoginFormSchema = {
  email: string;
  password: string;
}

export function LoginForm({form, onSubmit, isLoading}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-vh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn('flex flex-col gap-6')} >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your credentials below to login to your account</CardDescription>
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
                          <FormItem className="relative">
                            <FormControl>
                              <>
                                <Input placeholder="password" type={showPassword ? 'text' : 'password'} {...field} />
                                <Button variant="ghost" type='button' size="icon" className="absolute right-0 top-2 -translate-y-4" onClick={() => setShowPassword(!showPassword)}>
                                  {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                                </Button>
                              </>
                            </FormControl>
                            <FormDescription>Enter your email address</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="w-full" loading={isLoading}>
                      Login
                    </Button>
                    {/* <Button variant="outline" className="w-full">
                      Login with Google
                    </Button> */}
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link to="/auth/restaurant-register" className="underline underline-offset-4">
                      register your restaurant.
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div >
    </div >
  )
}
