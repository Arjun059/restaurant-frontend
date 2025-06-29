'use client'

import {
  useState
} from 'react'
import {
  useForm
} from 'react-hook-form'
import {
  Button
} from '#/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '#/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '#/components/ui/card'
import {
  toast
} from 'sonner'
import {
  cn
} from '#/lib/utils'
import {
  Input
} from '#/components/ui/input'
import {
  Checkbox
} from '#/components/ui/checkbox'


const RestaurantRegister = () => {
  const [step, setStep] = useState(0)
  const totalSteps = 2

  const form = useForm()

  const {
    handleSubmit,
    control,
    reset
  } = form

  const onSubmit = async (formData: unknown) => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      console.log(formData)
      setStep(0)
      reset()

      toast.success("Form successfully submitted")
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        {Array.from({length: totalSteps}).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
                index <= step ? "bg-primary" : "bg-primary/30",
                index < step && "bg-primary"
              )}
            />
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5",
                  index < step ? "bg-primary" : "bg-primary/30"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Multi form</CardTitle>
          <CardDescription>Current step {step + 1}</CardDescription>
        </CardHeader>
        <CardContent>

          {step === 0 && (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">

                <FormField
                  key="C1QSsfgL"
                  control={control}
                  name="C1QSsfgL"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Input 1</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=""
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  key="XuhP4qLa"
                  control={control}
                  name="XuhP4qLa"
                  render={({field}) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Input 2</FormLabel>
                        <FormDescription></FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="font-medium"
                    size="sm"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="sm" className="font-medium">
                    {step === 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </form>
            </Form>
          )}


          {step === 1 && (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">


                <FormField
                  key="lENooWeO"
                  control={control}
                  name="lENooWeO"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Input 1</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=""
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="font-medium"
                    size="sm"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="sm" className="font-medium">
                    {step === 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </form>
            </Form>
          )}

        </CardContent>
      </Card>
    </div>
  )
}

export default RestaurantRegister
