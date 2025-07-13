import {Outlet} from 'react-router-dom'
// import {SideNavbar} from './sidebar'

export function CustomerLayout() {


  return (
    <main className="h-full">
      {/* <SideNavbar collapsed={false} /> */}
      <Outlet />
    </main>
  )
}
