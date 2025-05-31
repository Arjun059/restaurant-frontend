import {AppSidebar} from './admin-dashboard/app-sidebar'
import {SiteHeader} from './admin-dashboard/site-header'
import {SidebarInset, SidebarProvider} from '#/components/ui/sidebar'

import {Outlet} from 'react-router-dom'

export function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider >
  )
}
