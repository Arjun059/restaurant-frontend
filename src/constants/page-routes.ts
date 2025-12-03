export const PAGE_ROUTES = {
  // Auth routes
  LOGIN: '/auth/login',
  RESTAURANT_REGISTER: '/auth/restaurant-register',

  // Public routes
  HOME: '/c/',
  SCAN_QR: '/c/scan-qr',

  // Customer routes [after he scan the code and restaurant has fetched]
  RESTAURANT_VIEW: (restaurantUrl: string) => `/c/${restaurantUrl}/home`, // key = ':restaurantUrl
  RESTAURANT_DISHES_LIST: (restaurantUrl: string) => `/c/${restaurantUrl}/dishes`, // key = ':restaurantUrl

  // "c/036f72b0-7ed6-4c53-8ceb-31360cc19a90/home"

  // Restaurant routes
  RESTAURANT_ADMIN_DASHBOARD: '/r/admin/',
  RESTAURANT_ADMIN_ADD_DISH: '/r/admin/add-dish',
  RESTAURANT_ADMIN_EDIT_DISH: (id: string) => `/r/admin/edit-dish/${id}`,
  RESTAURANT_ADMIN_DISHED_LIST: '/r/admin/dishes-list',
  RESTAURANT_ADMIN_RESTAURANT_INFO: '/r/admin/restaurant-info',
  RESTAURANT_ADMIN_TEAM: '/r/admin/team',

  // super admin
  SUPER_ADMIN_LOGIN: '/super-admin/login',
  SUPER_ADMIN_RESTAURANTS_LIST: '/super-admin/restaurants-list',

  // Error routes
  NOT_FOUND: '*',
} as const

// Type for route values
export type RoutePath = (typeof PAGE_ROUTES)[keyof typeof PAGE_ROUTES]
