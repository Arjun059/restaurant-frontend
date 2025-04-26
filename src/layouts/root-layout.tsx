import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export function RootLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
