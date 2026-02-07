import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  restaurantId: string
  avatar: string
}

interface StoreState {
  token: string | null
  user: User | null
  restaurant: any
  loggedIn: boolean
  activeAdminDashboardMenu: string
  setAuthValue: (value: any) => void
  resetAuthValue: () => void
  setActiveAdminDashboardMenu: (value: string) => void
  setRestaurant: (value: any) => void
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

      setRestaurant: (value: any) => set({ restaurant: value }),

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
