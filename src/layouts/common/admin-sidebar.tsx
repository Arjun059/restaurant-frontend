import type * as React from 'react'

import {NavMain} from './nav-main'
import {NavUser} from './nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  // SidebarHeader,
  // SidebarMenu,
  // SidebarMenuButton,
  // SidebarMenuItem,
} from '#/components/ui/sidebar'

import type {LucideIcon} from 'lucide-react'
// import {NavDocuments} from './nav-documents'
// import {NavSecondary} from './nav-secondary'

type MenuItem = {
  title: string,
  url: string,
  icon?: LucideIcon,

}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  data: {
    navMain: MenuItem[]
    navSecondary: MenuItem[]
    documents: MenuItem[]
  }
}

export function AppSidebar({data, ...props}: AppSidebarProps) {

  return (
    <Sidebar collapsible="offcanvas" {...props} >
      {/* <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to="/dashboard">
                <ArrowUpCircleIcon className="h-5 w-5" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader> */}

      <div className='h-[10px] md:h-[50px]' />
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
