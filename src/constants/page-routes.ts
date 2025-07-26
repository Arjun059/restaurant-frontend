export const PAGE_ROUTES = {
  // Auth routes
  LOGIN: '/auth/login',
  RESTAURANT_REGISTER: '/auth/restaurant-register',

  // Public routes
  HOME: '/c/',
  SCAN_QR: '/c/scan-qr',

  // Customer routes [after he scan the code and restaurant has fetched]
  RESTAURANT_HOME: (restaurantUrl: string) => `/c/${restaurantUrl}/home`, // key = ':restaurantUrl
  RESTAURANT_DISHES_LIST: (restaurantUrl: string) => `/c/${restaurantUrl}/dishes`, // key = ':restaurantUrl

  // "c/f36ab96e-0037-4f2f-b6d3-49cf6e7abf3c/home"

  // Restaurant routes
  RESTAURANT_DASHBOARD: '/r/dashboard',
  RESTAURANT_DASHBOARD_ADD_DISH: '/r/dashboard/add-dish',
  RESTAURANT_DASHBOARD_DISHED_LIST: '/r/dashboard/dishes-list',

  // Error routes
  NOT_FOUND: '*',
} as const

// Type for route values
export type RoutePath = (typeof PAGE_ROUTES)[keyof typeof PAGE_ROUTES]
