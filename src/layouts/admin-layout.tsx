import {AppSidebar} from './admin-dashboard/admin-sidebar'
import {SiteHeader} from './admin-dashboard/admin-header'
import {SidebarInset, SidebarProvider} from '#/components/ui/sidebar'
import useStore from '#/store'

import {Navigate, Outlet} from 'react-router-dom'

export function AdminLayout() {
  const loggedIn = useStore(state => state.loggedIn)

  if (!loggedIn) {
    return <Navigate to="/" replace />
  }

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
