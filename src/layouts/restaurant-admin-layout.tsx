import {AppSidebar} from './common/admin-sidebar'
import {SiteHeader} from './common/admin-header'
import {SidebarInset, SidebarProvider} from '#/components/ui/sidebar'

import {Navigate, Outlet} from 'react-router-dom'
import {PAGE_ROUTES} from '../constants/page-routes'
import useStore from '#/store'

import {
  ClipboardListIcon,
  DatabaseIcon,
  FileIcon,
  HelpCircleIcon,
  // LayoutDashboardIcon,
  List,
  Plus,
  SearchIcon,
  SettingsIcon,
  Store,
  UsersIcon,
} from 'lucide-react'

const data = {
  navMain: [
    {
      title: 'Restaurant Profile',
      url: PAGE_ROUTES.RESTAURANT_ADMIN_RESTAURANT_INFO,
      icon: Store,
    },
    // {
    //   title: 'Dashboard',
    //   url: PAGE_ROUTES.RESTAURANT_ADMIN_DASHBOARD,
    //   icon: LayoutDashboardIcon,
    // },
    {
      title: 'Add Dish',
      url: PAGE_ROUTES.RESTAURANT_ADMIN_ADD_DISH,
      icon: Plus,
    },
    {
      title: 'Dishes',
      url: PAGE_ROUTES.RESTAURANT_ADMIN_DISHED_LIST,
      icon: List,
    },
    {
      title: 'Team',
      url: PAGE_ROUTES.RESTAURANT_ADMIN_TEAM,
      icon: UsersIcon,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: SettingsIcon,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: HelpCircleIcon,
    },
    {
      title: 'Search',
      url: '#',
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      title: 'Data Library',
      url: '#',
      icon: DatabaseIcon,
    },
    {
      title: 'Reports',
      url: '#',
      icon: ClipboardListIcon,
    },
    {
      title: 'Word Assistant',
      url: '#',
      icon: FileIcon,
    },
  ],
}

export function AdminLayout() {
  const {token, restaurant} = useStore(state => state)

  if (!token && !restaurant?.id) {
    return <Navigate to={PAGE_ROUTES.SCAN_QR} replace />
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" data={data} />
      <SidebarInset>
        <SiteHeader />

        <div className="@container/main w-full flex-1 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider >
  )
}
