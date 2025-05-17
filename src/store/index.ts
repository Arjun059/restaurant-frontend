import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initAuthValue = {
  token: null,
  loggedIn: false,
}
const initRestaurant = {
  name: '',
  createdAt: '',
  updatedAt: '',
}

const useStore = create(
  persist(
    (set) => ({
      auth: initAuthValue,
      restaurant: initRestaurant,
      setAuthValue: (value: any) => set(() => ({ auth: value })),
      resetAuthValue: () => set({ auth: initAuthValue }),

      setRestaurant: (value: any) => set({ restaurant: value }),
    }),
    {
      name: 'App',
    }
  )
)

export default useStore
