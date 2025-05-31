import {Link} from 'react-router-dom'
import {useAuthentication} from '#/context/auth/AuthProvider'
import {Button} from '#/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '#/components/ui/card'
import {Container} from '#/components/ui/container'

export default function UserDashboard() {
  const {user, logout} = useAuthentication()

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {user?.email}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This should be a dashboard page for general user.</p>
          <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <Link to="/">
              <Button>Back to homepage</Button>
            </Link>
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
