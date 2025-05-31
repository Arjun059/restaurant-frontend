import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Alert, AlertDescription } from '#/components/ui/alert'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { auth } from '#/context/auth/AuthProvider'

interface PasswordRecoveryTypes {
  email: string
}

export default function Recovery() {
  const [success, setSuccess] = useState<string | null>()
  const [failed, setFailed] = useState<string | null>()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordRecoveryTypes>()

  const handleRecoveryPassword = (data: PasswordRecoveryTypes) => {
    setFailed(null)
    setSuccess(null)
    auth
      .requestPasswordRecovery(data.email)
      .then(() => setSuccess('Password recovery request sent, check your email.'))
      .catch((error) => setFailed(`Failed to request password recovery: ${error.message}`))
  }

  return (
    <main className="mx-auto w-full max-w-md p-6">
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      {failed && (
        <Alert variant="destructive">
          <AlertDescription>{failed}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recover your password</CardTitle>
        </CardHeader>
        <CardContent>
          <form autoComplete="off" onSubmit={handleSubmit(handleRecoveryPassword)}>
            <div className="grid gap-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', { required: true })}
                  className={errors.email ? 'border-destructive' : ''}
                />
              </div>
            </div>
            <div className="mt-6 grid w-full">
              <Button type="submit" disabled={isSubmitting}>
                Recover Password
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              {'Remember your password? '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
