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
    "to": "/admin/dashboard"
  }
]


const Header = () => {
  const isMobile = useIsMobile()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Restaurant Name</span>
            </Link>
          </div>

          <NavigationMenu className='ms-auto'>
            <NavigationMenuList className='w-full flex-wrap'>

              {!isMobile && (
                menuItems.map((item) => (
                  <NavigationMenuItem asChild>
                    <Button variant="ghost" asChild>
                      <Link to={item.to}>{item.label}</Link>
                    </Button>
                  </NavigationMenuItem>
                ))
              )}

              {isMobile && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {menuItems.map((item) => (

                      <NavigationMenuItem asChild className='w-full' key={item.label}>
                        <Button variant="ghost" asChild>
                          <Link to={item.to}>{item.label}</Link>
                        </Button>
                      </NavigationMenuItem>

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

export default Header
