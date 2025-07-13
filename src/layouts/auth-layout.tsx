import {Navigate, Outlet} from 'react-router-dom'
import useStore from '#/store'

export function AuthLayout() {
  const loggedIn = useStore(state => state.loggedIn)

  if (loggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex-1 h-full items-center">
      <Outlet />
    </div>
  )
}
