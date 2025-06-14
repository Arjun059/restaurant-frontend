import {Link} from 'react-router-dom'
import {Button} from '#/components/ui/button'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Restaurant Name</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-4">
            {/* <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button> */}
            {/* <Button variant="ghost" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button> */}
            <Button variant="ghost" asChild>
              <Link to="/scan-qr">Scan QR</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/dishes-list">Dishes List</Link>
            </Button>
            {/* TODO: remove after test */}
            <Button variant="ghost" asChild>
              <Link to="/admin/dashboard">Admin</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
