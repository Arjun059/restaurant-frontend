import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  token: string | null
  user: any
  restaurant: any
  loggedIn: boolean
  activeAdminDashboardMenu: string
  setAuthValue: (value: any) => void
  resetAuthValue: () => void
  setActiveAdminDashboardMenu: (value: string) => void
}

const initActiveAdminDashboardMenu = 'Dashboard'

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      restaurant: null,
      loggedIn: false,
      activeAdminDashboardMenu: initActiveAdminDashboardMenu,

      setAuthValue: (value: any) =>
        set(() => ({
          token: value.token,
          user: value.user,
          restaurant: value.restaurant,
          loggedIn: true,
        })),
      resetAuthValue: () => set({ token: null, user: null, restaurant: null, loggedIn: false }),

      setActiveAdminDashboardMenu: (value: string) =>
        set(() => ({ activeAdminDashboardMenu: value })),
    }),
    {
      name: 'restaurant-store',
    }
  )
)

export default useStore
