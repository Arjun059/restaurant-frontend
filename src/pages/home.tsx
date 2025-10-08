import {ThemeSwitcher} from '#/components/theme'
import {Button} from '#/components/ui/button'
import {Link} from 'react-router-dom'
import useStore from '../store'

export default function Home() {
  const {user, loggedIn} = useStore()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Menu<span className="text-destructive">Hub</span>
        </h1>
        <ThemeSwitcher className="size-9" />
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 py-16 text-center sm:py-24">
        <div className="relative z-10 max-w-3xl space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Digital Menus for Modern Restaurants 🍽️
          </h2>
          <p className="text-lg text-muted-foreground">
            Empower your restaurant with an elegant, interactive, and customizable digital menu platform.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg">Try For Free</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                Scan QR

              </Button>
            </Link>
          </div>
          {/* Alert */}
          {loggedIn && (<div className='flex justify-center gap-4'>

            <div className="max-w-xl px-6 bg-white border pt-1.5 rounded-lg hover:bg-slate-100">

              {`Welcome back, ${user?.email} ! 👋`}

            </div>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                Scan QR
              </Button>
            </Link>
          </div>

          )}

        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h3 className="mb-12 text-center text-3xl font-semibold text-primary">Why Choose MenuHub?</h3>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Smart Menu Management',
              desc: 'Easily update dishes, prices, and categories with real-time synchronization.',
            },
            {
              title: 'QR Code Ready',
              desc: 'Generate unique QR codes for every table or section, instantly accessible by customers.',
            },
            {
              title: 'Multi-Restaurant Support',
              desc: 'Manage multiple branches and staff under one unified dashboard.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:shadow-md"
            >
              <h4 className="mb-2 text-xl font-semibold">{feature.title}</h4>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>



    </div>
  )
}
