import { Link } from 'react-router-dom'
import { Button } from './ui/button'

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
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/menu">Menu</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/reservations">Reservations</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/contact">Contact</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 