import {ThemeSwitcher} from '#/components/theme'
import {Alert, AlertDescription} from '#/components/ui/alert'

import ViteLogo from '#/assets/images/vite.svg'
import useStore from '#/store'

export default function Home() {
  const {user, loggedIn, restaurant} = useStore()

  // console.log({user, loggedIn, restaurant}, "hit on home")

  return (
    <div className="mx-auto flex h-full min-h-screen w-full flex-col">
      <header className="mb-auto w-full p-4" aria-hidden>
        <ThemeSwitcher className="float-right size-9" />
      </header>
      <div className="mx-auto flex flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full border-collapse items-center justify-center">
          <img src={ViteLogo} alt="Vite logo" className="h-28" />
        </div>
        <div className="text-center text-lg text-muted-foreground sm:mt-8">
          <p className="leading-8">This is an example starter template React with Vite.</p>
          <p className="leading-8">
            Vite + React + Typescript + Tailwind CSS + React Hook Form + Vitest
          </p>
        </div>

        <div>
          <Alert variant={loggedIn ? 'default' : 'destructive'} className="w-full text-center">
            <AlertDescription>
              {loggedIn ? `Welcome back ${user?.email} 👋` : 'You are not logged in!'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
