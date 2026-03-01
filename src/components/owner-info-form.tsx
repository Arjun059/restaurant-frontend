import {Button} from '#/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '#/components/ui/card'
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
import {cn} from '#/lib/utils'
import {zodResolver} from '@hookform/resolvers/zod'
import {EyeIcon, EyeOffIcon, Loader2} from 'lucide-react'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from "zod"
import {Badge} from './ui/badge'

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).superRefine(({password, confirmPassword}, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password and Confirm Password do not match",
      path: ["confirmPassword"],
    })
  }
});

export type UserFormValues = z.infer<typeof userSchema>;

export default function OwnerInfoForm({onSubmit: onSubmitProp, initData, onBack, isPending}: {onSubmit: (values: any) => void, initData: any, onBack: () => void, isPending: boolean}) {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initData?.name || "",
      email: initData?.email || "",
      password: initData?.password || "",
      confirmPassword: initData?.confirmPassword || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: any) {
    onSubmitProp(values)
  }

  return (
    <div className={cn('flex flex-col gap-6 w-full max-w-[600px] px-4 mb-4')}>
      <Card className={cn("w-full shadow-sm rounded-md")}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl">Owner Information</CardTitle>
            <Badge variant="outline">Step 2/2</Badge>
          </div>
          <CardDescription>Enter owner information below to register your restaurant</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="name" {...field} />
                        </FormControl>
                        <FormDescription>Enter your name</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control as any}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email" {...field} />
                        </FormControl>
                        <FormDescription>Enter your email</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2 relative">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                      <FormItem >
                        <FormLabel>Password</FormLabel>
                        <FormControl >
                          <div className="relative">
                            <Input placeholder="password" type={showPassword ? 'text' : 'password'} {...field} />
                            <Button variant="ghost" type="button" size="icon" className="absolute right-0 top-4 -translate-y-4" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>Enter your password</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2 relative">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                      <FormItem >
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl >
                          <div className="relative">
                            <Input placeholder="password" type={showPassword ? 'text' : 'password'} {...field} />
                            <Button variant="ghost" type="button" size="icon" className="absolute right-0 top-4 -translate-y-4" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>Enter your password again</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between gap-4">
                  <Button type="button" variant="outline" disabled={isPending} className="w-full" onClick={onBack}>Back</Button>
                  <Button type="submit" className="w-full" disabled={isPending}>{isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Register"}</Button>
                </div>
              </div>
            </form>
          </Form>

        </CardContent>
      </Card>
    </div>
  )
}
