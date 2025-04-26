import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {GitHubButton, GoogleButton} from '#/components/social-button'
import {auth, useAuthentication} from '#/context/auth/AuthProvider'
import {Alert, AlertTitle} from '#/components/ui/alert'
import {Button} from '#/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '#/components/ui/card'
import {Input} from '#/components/ui/input'
import {Label} from '#/components/ui/label'

interface LoginTypes {
  email: string
  password: string
}

export default function Login() {
  const {login, loggedOut} = useAuthentication()
  const [failed, setFailed] = useState<string | null>()

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginTypes>()

  const handleLogin = (data: LoginTypes) => {
    setFailed(null)
    const {email, password} = data
    auth
      .login(email, password, true)
      .then((_response) => login())
      .catch((error) => setFailed(error.message))
  }

  return (
    <main className="mx-auto w-full max-w-md p-6">
      {failed && (
        <Alert variant="destructive">
          <AlertTitle>{failed}</AlertTitle>
        </Alert>
      )}
      {loggedOut && (
        <Alert>
          <AlertTitle>Goodbye!</AlertTitle>
          Your session has been terminated.
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <GoogleButton />
            <GitHubButton />
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <form autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
            <div className="grid gap-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', {required: true})}
                  className={errors.email ? "border-destructive" : ""}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  disabled={isSubmitting}
                  {...register('password', {required: true})}
                  className={errors.password ? "border-destructive" : ""}
                />
              </div>
            </div>
            <div className="mt-6 grid w-full">
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              <Link to="/" className="text-primary hover:underline">
                &larr; Go back to homepage
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
