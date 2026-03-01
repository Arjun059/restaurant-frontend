import {Button} from '#/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "#/components/ui/navigation-menu"
import {Link} from 'react-router-dom'
import {useIsMobile} from '#/hooks/use-mobile'
import useStore from '#/store'
import {PAGE_ROUTES} from '#/constants/page-routes'
import type {ReactNode} from 'react'

const menuItems = [
  {
    "label": "Scan QR",
    "to": PAGE_ROUTES.SCAN_QR,
    "access": 'customer' as const
  },
  {
    "label": "Dishes",
    "to": PAGE_ROUTES.RESTAURANT_DISHES_LIST(useStore.getState().restaurant?.urlPath),
    "access": "customer" as const
  },
  {
    "label": "Admin",
    "to": PAGE_ROUTES.RESTAURANT_ADMIN_RESTAURANT_INFO,
    "access": "admin" as const
  }
]


const GlobalHeader = () => {
  const isMobile = useIsMobile()
  const restaurant = useStore(state => state.restaurant)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            {restaurant?.name ?
              (<Link to={PAGE_ROUTES.RESTAURANT_VIEW(restaurant?.urlPath)} className="mr-6 flex items-center space-x-2">
                <span className="font-bold">{restaurant?.name}</span>
              </Link>
              ) : (
                <>
                  <Link to={PAGE_ROUTES.HOME}>
                    <h4 className="text-xl font-bold tracking-tight text-primary me-2">
                      <span className="text-destructive">Meal</span> Wala
                    </h4>
                  </Link>
                  {/* <NavigationMenuItem asChild>
                    <Button variant="ghost" asChild>
                      <Link to={PAGE_ROUTES.SCAN_QR}>Scan QR</Link>
                    </Button>
                  </NavigationMenuItem> */}
                </>

              )
            }

          </div>

          <NavigationMenu className='ms-auto'>
            <NavigationMenuList className='w-full flex-wrap'>

              {!isMobile && (
                menuItems.map((item) => (
                  <AccessGuard key={item.label} access={item.access}>
                    <NavigationMenuItem asChild>
                      <Button variant="ghost" asChild>
                        <Link to={item.to}>{item.label}</Link>
                      </Button>
                    </NavigationMenuItem>
                  </AccessGuard>
                ))
              )}

              {isMobile && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {menuItems.map((item) => (
                      <AccessGuard key={item.label} access={item.access}>
                        <NavigationMenuItem asChild>
                          <Button variant="ghost" className='w-full' asChild>
                            <Link to={item.to}>{item.label}</Link>
                          </Button>
                        </NavigationMenuItem>
                      </AccessGuard>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}

            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div >
    </header >
  )
}

export default GlobalHeader

interface AccessGuardProps {
  children: ReactNode
  access?: 'admin' | 'customer' | 'public'
}

export function AccessGuard({children, access = 'public'}: AccessGuardProps) {
  const {loggedIn, restaurant} = useStore(state => state)


  // If no access is provided, show to all (public)
  if (!access || access === 'public') {
    if (!loggedIn && !restaurant?.id) {
      return <>{children}</>
    }
    return null
  }

  // If access is admin, only show if user is logged in
  if (access === 'admin') {
    if (loggedIn) {
      return <>{children}</>
    }
    return null
  }

  // If access is customer, only show if user is NOT logged in
  if (access === 'customer') {
    if (!loggedIn && restaurant?.id) {
      return <>{children}</>
    }
    return null
  }

  return null
}

