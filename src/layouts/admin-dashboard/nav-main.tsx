import {MailIcon, PlusCircleIcon, type LucideIcon} from 'lucide-react'

import {Button} from '#/components/ui/button'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '#/components/ui/sidebar'
import {useNavigate} from 'react-router-dom'
import {PAGE_ROUTES} from '#/constants/page-routes'
import useStore from '#/store'
import {isMobile} from 'react-device-detect';
import {useEffect} from 'react'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const navigate = useNavigate()
  const {setActiveAdminDashboardMenu, activeAdminDashboardMenu} = useStore()
  const {toggleSidebar} = useSidebar()

  const handleMenuClick = (url: string, title: string) => {
    setActiveAdminDashboardMenu(title)
    navigate(url)
    if (isMobile) {
      toggleSidebar()
    }
  }

  useEffect(() => {
    setActiveAdminDashboardMenu("Dashboard")
  }, [])

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              onClick={() => {handleMenuClick(PAGE_ROUTES.RESTAURANT_ADMIN_ADD_DISH, 'Add Dish')}}
              tooltip="Add Dish"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <PlusCircleIcon />
              <span>Add Dish</span>
            </SidebarMenuButton>

            <Button
              size="icon"
              className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <MailIcon />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} isActive={item.title === activeAdminDashboardMenu} onClick={() => handleMenuClick(item.url, item.title)}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
