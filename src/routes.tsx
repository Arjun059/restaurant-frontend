import {createBrowserRouter, Navigate} from 'react-router-dom'
import {lazy, Suspense} from 'react'

import {CustomerLayout, AdminLayout, RootLayout} from './layouts'
import {AuthLayout} from './layouts/auth-layout'
import {PAGE_ROUTES} from './constants/page-routes'

// Lazy load all page components
const Home = lazy(() => import('./pages/home'))
const Login = lazy(() => import('./pages/auth/login'))
const Dashboard = lazy(() => import('./pages/restaurant-dashboard/dashboard'))
const ScanQr = lazy(() => import('./pages/customer/qr-code-scanner'))
const AddDish = lazy(() => import('./pages/restaurant-dashboard/add-dish'))
const RestaurantDishesList = lazy(() => import('./pages/restaurant-dashboard/dishes-list'))
const Error404 = lazy(() => import('./pages/404'))
const ErrorBoundaryPage = lazy(() => import('./pages/error-boundary'))

const RestaurantRegister = lazy(() => import('./pages/auth/restaurant-register'))
const RestaurantHome = lazy(() => import('./pages/customer/restaurant-home'))

import SkeletonPage from '#/components/skeletons/page'
import DishesList from './pages/customer/dishes-list'

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
        ],
      },
      {
        element: <AdminLayout />,
        children: [
          {
            path: PAGE_ROUTES.RESTAURANT_DASHBOARD_ADD_DISH,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <AddDish />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.RESTAURANT_DASHBOARD_DISHED_LIST,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <RestaurantDishesList />
              </Suspense>
            ),
          },
          {
            path: PAGE_ROUTES.RESTAURANT_DASHBOARD,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <Dashboard />
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
            path: PAGE_ROUTES.DISHES_LIST,
            element: (
              <DishesList />
            ),
          },
          {
            path: PAGE_ROUTES.RESTAURANT_HOME(':restaurantUrl'),
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <RestaurantHome />
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
