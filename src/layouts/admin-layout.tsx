import {AppSidebar} from './admin-dashboard/admin-sidebar'
import {SiteHeader} from './admin-dashboard/admin-header'
import {SidebarInset, SidebarProvider} from '#/components/ui/sidebar'
import useStore from '#/store'

import {Navigate, Outlet} from 'react-router-dom'
import {PAGE_ROUTES} from '../constants/page-routes'

export function AdminLayout() {
  // const {token, restaurant} = useStore(state => state)

  // if (!token && !restaurant?.id) {
  //   return <Navigate to={PAGE_ROUTES.HOME} replace />
  // }

  console.log('admin layout')

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        <div className="@container/main w-full flex-1 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider >
  )
}
