export const PAGE_ROUTES = {
  // Auth routes
  LOGIN: '/login',
  SIGNUP: '/signup',

  RESTAURANT_REGISTER: '/auth/restaurant/register',

  // Public routes
  HOME: '/',
  DISHES_LIST: '/dishes-list',
  SCAN_QR: '/scan-qr',

  // Dashboard routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_DASHBOARD_ADD_DISH: '/admin/dashboard/add-dish',
  ADMIN_DASHBOARD_DISHED_LIST: '/admin/dashboard/dishes-list',

  // User dashboard routes
  CUSTOMER_DASHBOARD: '/dashboard',
  CUSTOMER_DASHBOARD_OVERVIEW: '/dashboard/overview',

  // Error routes
  NOT_FOUND: '*',
} as const

// Type for route values
export type RoutePath = (typeof PAGE_ROUTES)[keyof typeof PAGE_ROUTES]
