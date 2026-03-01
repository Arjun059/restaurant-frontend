import {Button} from '#/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '#/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form'
import {Input} from '#/components/ui/input'
import {cn} from '#/lib/utils'
import {useForm} from 'react-hook-form'

import {zodResolver} from '@hookform/resolvers/zod'
import {z} from "zod"
import {Textarea} from './ui/textarea'

import {Badge} from "#/components/ui/badge"
import {Link} from 'react-router-dom'

export const restaurantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
});

export type RestaurantFormValues = z.infer<typeof restaurantSchema>;

export default function RestaurantRegisterForm({onSubmit: onSubmitProp, initData}: {onSubmit: (values: any) => void, initData: any}) {
  // 2. Define a submit handler.
  function onSubmit(values: any) {
    onSubmitProp(values)
  }

  const form = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: initData?.name || "",
      address: initData?.address || "",
    },
  });

  return (
    <div className={cn("w-full max-w-[600px] px-4 pt-4 pb-4")}>
      <Card className={cn("w-full rounded-lg")}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl">Restaurant Registration</CardTitle>
            <Badge variant="outline">Step 1/2</Badge>
          </div>
          <CardDescription>Enter your restaurant details below to register</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
              <FormField
                control={form.control as any}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Restaurant Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Spice Villa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="address"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Restaurant Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="123 Street, City, State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex gap-4'>
                <Button type="submit">Submit</Button>
                <p
                  className=' text-sm text-center'
                >Do you have an account?.{" "}
                  <Link to={"/auth/login"} className=' text-black text-sm border-b-2 border-black px-1'>
                    Login Here
                  </Link>
                </p>
              </div>

            </form>

          </Form>
        </CardContent>
      </Card>
    </div>


  );

}
