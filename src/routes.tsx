import {createBrowserRouter, Navigate} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import {PAGE_ROUTES} from './constants/page-routes'

// All Layout
import {CustomerLayout, AdminLayout, RootLayout, SuperAdminLayout} from './layouts'
import {AuthLayout} from './layouts/auth-layout'

// Customer Pages
const Home = lazy(() => import('./pages/customer/home'))
const ScanQr = lazy(() => import('./pages/customer/qr-code-scanner'))
import DishesList from './pages/customer/dishes-list'
const RestaurantView = lazy(() => import('./pages/customer/restaurant-view'))

// Restaurant Pages
const Dashboard = lazy(() => import('./pages/restaurant-dashboard/dashboard'))
const AddDish = lazy(() => import('./pages/restaurant-dashboard/add-dish'))
const EditDish = lazy(() => import('./pages/restaurant-dashboard/edit-dish'))
const RestaurantDishesList = lazy(() => import('./pages/restaurant-dashboard/dishes-list'))
const RestaurantRegister = lazy(() => import('./pages/auth/restaurant-register'))
import RestaurantInfo from './pages/restaurant-dashboard/restaurant-info'
const TeamPage = lazy(() => import('./pages/restaurant-dashboard/team'))

// Super Admin Pages
const SuperAdminLogin = lazy(() => import('./pages/super-admin/login'))

// Auth Pages
const Login = lazy(() => import('./pages/auth/login'))

// Error Pages
const Error404 = lazy(() => import('./pages/404'))
const ErrorBoundaryPage = lazy(() => import('./pages/error-boundary'))

// Skeletons
import SkeletonPage from '#/components/skeletons/page'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: PAGE_ROUTES.LOGIN,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <Login />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.RESTAURANT_REGISTER,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <RestaurantRegister />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.SUPER_ADMIN_LOGIN,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <SuperAdminLogin />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <AdminLayout />,
        children: [
          {
            path: PAGE_ROUTES.RESTAURANT_ADMIN_DASHBOARD,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.RESTAURANT_ADMIN_ADD_DISH,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <AddDish />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.RESTAURANT_ADMIN_EDIT_DISH(':id'),
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <EditDish />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.RESTAURANT_ADMIN_ADD_DISH,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <AddDish />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.RESTAURANT_ADMIN_DISHED_LIST,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <RestaurantDishesList />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.RESTAURANT_ADMIN_RESTAURANT_INFO,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <RestaurantInfo />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.RESTAURANT_ADMIN_TEAM,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <TeamPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <CustomerLayout />,
        children: [
          {
            path: PAGE_ROUTES.HOME,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.SCAN_QR,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <ScanQr />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.RESTAURANT_VIEW(':restaurantUrl'),
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <RestaurantView />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.RESTAURANT_DISHES_LIST(':restaurantUrl'),
            element: (
              <DishesList />
            ),
          },
        ],
      },
      {
        element: <SuperAdminLayout />,
        children: [
          {
            path: PAGE_ROUTES.SUPER_ADMIN_RESTAURANTS_LIST,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <RestaurantDishesList />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/",
        element: (
          <Navigate to={PAGE_ROUTES.HOME} replace />
        ),
      },
      {
        path: PAGE_ROUTES.NOT_FOUND,
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <Error404 />
          </Suspense>
        ),
      },
    ],
  },
],
  {
    future: {
      // v7_relativeSplatPath: true,
    },
  })
