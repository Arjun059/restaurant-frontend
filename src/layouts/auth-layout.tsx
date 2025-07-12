import {Navigate, Outlet} from 'react-router-dom'
import {useAuthentication} from '#/context/auth/AuthProvider'

export function AuthLayout() {
  const {loggedIn} = useAuthentication()

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="flex-1 h-full items-center">
      <Outlet />
    </div>
  )
}
