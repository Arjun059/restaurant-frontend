import type * as React from 'react'
import {Link} from 'react-router-dom'
import {
  ArrowUpCircleIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  List,
  Plus,
  SearchIcon,
  SettingsIcon,
  Store,
  UsersIcon,
} from 'lucide-react'

import {NavMain} from './nav-main'
import {NavUser} from './nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '#/components/ui/sidebar'
import {PAGE_ROUTES} from '#/constants/page-routes'
// import {NavDocuments} from './nav-documents'
// import {NavSecondary} from './nav-secondary'


const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: PAGE_ROUTES.RESTAURANT_ADMIN_DASHBOARD,
      icon: LayoutDashboardIcon,
    },
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
      title: 'Restaurant',
      url: PAGE_ROUTES.RESTAURANT_ADMIN_RESTAURANT_INFO,
      icon: Store,
    },
    {
      title: 'Team',
      url: PAGE_ROUTES.RESTAURANT_ADMIN_TEAM,
      icon: UsersIcon,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: CameraIcon,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: FileTextIcon,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: FileCodeIcon,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
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
      name: 'Data Library',
      url: '#',
      icon: DatabaseIcon,
    },
    {
      name: 'Reports',
      url: '#',
      icon: ClipboardListIcon,
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: FileIcon,
    },
  ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="offcanvas" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to="/dashboard">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="font-semibold text-base">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='flex-1 flex-grow-1'>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter className=''>
        <NavUser />
        {/* {isMobile && <div style={{height: 180}} />} */}
      </SidebarFooter>
    </Sidebar>
  )
}
