import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  auth: {
    token: string | null
    loggedIn: boolean
  }
  restaurant: {
    name: string
    createdAt: string
    updatedAt: string
  }
  activeAdminDashboardMenu: string
  setAuthValue: (value: any) => void
  resetAuthValue: () => void
  setRestaurant: (value: any) => void
  setActiveAdminDashboardMenu: (value: string) => void
}

const initAuthValue = {
  token: null,
  loggedIn: false,
}
const initRestaurant = {
  name: '',
  createdAt: '',
  updatedAt: '',
}

const initActiveAdminDashboardMenu = 'Dashboard'

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      auth: initAuthValue,
      restaurant: initRestaurant,
      activeAdminDashboardMenu: initActiveAdminDashboardMenu,

      setAuthValue: (value: any) => set(() => ({ auth: value })),
      resetAuthValue: () => set({ auth: initAuthValue }),

      setRestaurant: (value: any) => set({ restaurant: value }),

      setActiveAdminDashboardMenu: (value: string) =>
        set(() => ({ activeAdminDashboardMenu: value })),
    }),
    {
      name: 'restaurant-store',
    }
  )
)

export default useStore
