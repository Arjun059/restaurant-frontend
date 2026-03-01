import {Outlet} from 'react-router-dom'
import GlobalHeader from '#/layouts/common/global-header'

export function RootLayout() {

  return (
    <div className="relative flex min-h-screen flex-col">
      <GlobalHeader />
      <div className="flex-1 bg-gray-100 dark:bg-slate-900">
        <Outlet />
      </div>
    </div>
  )
}
