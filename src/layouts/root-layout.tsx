import {Outlet} from 'react-router-dom'
import Header from '#/layouts/header'

export function RootLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 bg-gray-100 dark:bg-slate-900">
        <Outlet />
      </div>
    </div>
  )
}
