import {AppSidebar} from './common/admin-sidebar'
import {SiteHeader} from './common/admin-header'
import {SidebarInset, SidebarProvider} from '#/components/ui/sidebar'

import {Navigate, Outlet} from 'react-router-dom'
import {PAGE_ROUTES} from '../constants/page-routes'
import useStore from '#/store'

const menus = {
  navMain: [],
  navSecondary: [],
  documents: [],
}

export function SuperAdminLayout() {
  const {token, restaurant, loggedIn} = useStore(state => state)

  if (!loggedIn || token === null) {
    return <Navigate to={PAGE_ROUTES.LOGIN} replace />
  }

  if (!token && !restaurant?.id) {
    return <Navigate to={PAGE_ROUTES.SCAN_QR} replace />
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" data={menus} />
      <SidebarInset>
        <SiteHeader />

        <div className="@container/main w-full flex-1 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider >
  )
}
