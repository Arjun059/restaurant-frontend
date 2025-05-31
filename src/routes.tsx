import {createBrowserRouter, defer} from 'react-router-dom'
import {lazy, Suspense} from 'react'

import {CustomerLayout, AdminLayout, RootLayout} from './layouts'
import {AuthLayout} from './layouts/auth-layout'
import {ROUTES} from './constants/page-routes'

// Lazy load all page components
const Home = lazy(() => import('./pages/home'))
const Login = lazy(() => import('./pages/auth/login'))
const Signup = lazy(() => import('./pages/auth/signup'))
const UserDashboard = lazy(() => import('./pages/customer/dashboard'))
const Dashboard = lazy(() => import('./pages/restaurant-dashboard/dashboard'))
const ScanQr = lazy(() => import('./pages/qr-code-page'))
const AddDish = lazy(() => import('./pages/restaurant-dashboard/add-dish'))
const DishesList = lazy(() => import('./pages/customer/dishes-list'))
const Error404 = lazy(() => import('./pages/404'))
const ErrorBoundaryPage = lazy(() => import('./pages/error-boundary'))

import SkeletonPage from '#/components/skeletons/page'



// Ideally this would be an API call to server to get logged in user data
const getUserData = () => {
  return new Promise((resolve, _reject) =>
    setTimeout(() => {
      const user = window.localStorage.getItem('user')
      resolve(user)
      // reject('Error')
    }, 3000)
  )
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: () => defer({userPromise: getUserData()}),
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <Login />
              </Suspense>
            ),
          },
          {
            path: ROUTES.SIGNUP,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <Signup />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <AdminLayout />,
        children: [
          {
            path: ROUTES.ADMIN_DASHBOARD_ADD_DISH,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <AddDish />
              </Suspense>
            ),
          },
          {
            path: ROUTES.ADMIN_DASHBOARD,
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
            path: ROUTES.HOME,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: ROUTES.CUSTOMER_DASHBOARD,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <UserDashboard />
              </Suspense>
            ),
          },
          {
            path: ROUTES.SCAN_QR,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <ScanQr />
              </Suspense>
            ),
          },
          {
            path: ROUTES.DISHES_LIST,
            element: (
              <Suspense fallback={<SkeletonPage />}>
                <DishesList />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: ROUTES.NOT_FOUND,
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <Error404 />
          </Suspense>
        ),
      },
    ],
  },
])
