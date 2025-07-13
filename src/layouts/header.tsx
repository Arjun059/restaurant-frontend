import {Button} from '#/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "#/components/ui/navigation-menu"
import {Link} from 'react-router-dom'
import {useIsMobile} from '../hooks/use-mobile'
import useStore from '#/store'

const menuItems = [
  {
    "label": "Scan QR",
    "to": "/scan-qr"
  },
  {
    "label": "Dishes List",
    "to": "/dishes-list"
  },
  {
    "label": "Admin",
    "to": "/admin/dashboard",
    "access": "admin"
  }
]


const Header = () => {
  const isMobile = useIsMobile()
  const loggedIn = useStore(state => state.loggedIn)
  const restaurant = useStore(state => state.restaurant)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            {restaurant?.name ?
              (<Link to="/" className="mr-6 flex items-center space-x-2">
                <span className="font-bold">{restaurant?.name}</span>
              </Link>
              ) : (
                <NavigationMenuItem asChild>
                  <Button variant="ghost" asChild>
                    <Link to={"/scan-qr"}>Scan QR</Link>
                  </Button>
                </NavigationMenuItem>
              )
            }

          </div>

          <NavigationMenu className='ms-auto'>
            <NavigationMenuList className='w-full flex-wrap'>

              {!isMobile && (
                menuItems.map((item) => {
                  if (item.access === "admin") {
                    if (loggedIn) {
                      return (
                        <NavigationMenuItem asChild>
                          <Button variant="ghost" asChild>
                            <Link to={item.to}>{item.label}</Link>
                          </Button>
                        </NavigationMenuItem>
                      )
                    } else {
                      return null
                    }
                  } else {
                    return <NavigationMenuItem asChild>
                      <Button variant="ghost" asChild>
                        <Link to={item.to}>{item.label}</Link>
                      </Button>
                    </NavigationMenuItem>
                  }
                })
              )}

              {isMobile && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {
                      menuItems.map((item) => {
                        if (item.access === "admin") {
                          if (loggedIn) {
                            return (
                              <NavigationMenuItem asChild key={item.label}>
                                <Button variant="ghost" className='w-full' asChild>
                                  <Link to={item.to}>{item.label}</Link>
                                </Button>
                              </NavigationMenuItem>
                            )
                          } else {
                            return null
                          }
                        } else {
                          return (
                            <NavigationMenuItem asChild key={item.label}>
                              <Button variant="ghost" className='w-full' asChild>
                                <Link to={item.to}>{item.label}</Link>
                              </Button>
                            </NavigationMenuItem>
                          )
                        }
                      })
                    }
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

export default Header
