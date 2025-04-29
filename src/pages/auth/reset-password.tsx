import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { Alert, AlertDescription } from '#/components/ui/alert'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { auth } from '#/context/auth/AuthProvider'

interface ResetPasswordTypes {
  password: string
}

export default function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams('')
  const token = searchParams.get('recovery_token') as string
  const [success, setSuccess] = useState('')
  const [failed, setFailed] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordTypes>()

  const handleResetPassword = (data: ResetPasswordTypes) => {
    if (!token) {
      setFailed('You need a recovery token to continue!')
    }
    auth
      .verify('recovery', token)
      .then((response) => {
        response
          .update({ password: data.password })
          .then((result) => {
            setSuccess(
              `Password has been reset. Now, you can login with your email address: ${result.email}`
            )
          })
          .catch((error) => setFailed(`Failed to reset your password: ${error.message}`))
      })
      .catch((error) => setFailed(`Failed to reset your password: ${error.message}`))
  }

  useEffect(() => {
    if (!token) {
      navigate('/recovery')
    }
  }, [token, navigate])

  return (
    <main className="mx-auto w-full max-w-md p-6">
      {failed && (
        <Alert variant="destructive">
          <AlertDescription>{failed}</AlertDescription>
        </Alert>
      )}

      <Card>
        {success && (
          <CardContent>
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
            <div className="mt-6 grid w-full text-center">
              <Link to="/login">
                <Button>Continue to your account &rarr;</Button>
              </Link>
            </div>
          </CardContent>
        )}

        <div className={success ? 'hidden' : ''}>
          <CardHeader>
            <CardTitle>Reset your password</CardTitle>
          </CardHeader>
          <CardContent>
            <form autoComplete="off" onSubmit={handleSubmit(handleResetPassword)}>
              <div className="grid gap-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password', {
                      required: 'You must specify a password',
                      minLength: {
                        value: 8,
                        message: 'Password must have at least 8 characters',
                      },
                    })}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                </div>
              </div>
              <div className="mt-6 grid w-full">
                <Button type="submit" disabled={isSubmitting}>
                  Reset Password
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
        </div>
      </Card>
    </main>
  )
}
