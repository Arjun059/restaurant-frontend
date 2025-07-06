import {AppSidebar} from './admin-dashboard/admin-sidebar'
import {SiteHeader} from './admin-dashboard/admin-header'
import {SidebarInset, SidebarProvider} from '#/components/ui/sidebar'

import {Outlet} from 'react-router-dom'

export function AdminLayout() {
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
