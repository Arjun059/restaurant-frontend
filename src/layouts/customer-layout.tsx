import {Outlet} from 'react-router-dom'
// import {useAuthentication} from '#/context/auth/AuthProvider'
// import {SideNavbar} from './sidebar'

export function CustomerLayout() {
  // const {loggedIn} = useAuthentication()

  // if (!loggedIn) {
  //   return <Navigate to="/login" replace />
  // }

  return (
    <main className="h-full">
      {/* <SideNavbar collapsed={false} /> */}
      <Outlet />
    </main>
  )
}
