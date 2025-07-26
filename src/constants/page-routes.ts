export const PAGE_ROUTES = {
  // Auth routes
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  RESTAURANT_REGISTER: '/auth/restaurant-register',

  // Customer routes
  HOME: '/c/',
  DISHES_LIST: '/c/dishes-list',
  SCAN_QR: '/c/scan-qr',

  // Restaurant routes
  RESTAURANT_DASHBOARD: '/r/dashboard',
  RESTAURANT_DASHBOARD_ADD_DISH: '/r/dashboard/add-dish',
  RESTAURANT_DASHBOARD_DISHED_LIST: '/r/dashboard/dishes-list',

  RESTAURANT_HOME: (restaurantUrl: string) => `/r/${restaurantUrl}/home`, // key = ':restaurantUrl
  RESTAURANT_DISHES_LIST: (restaurantUrl: string) => `/r/${restaurantUrl}/dishes`, // key = ':restaurantUrl

  // Error routes
  NOT_FOUND: '*',
} as const

// Type for route values
export type RoutePath = (typeof PAGE_ROUTES)[keyof typeof PAGE_ROUTES]
