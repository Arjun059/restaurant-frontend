import { Route, createBrowserRouter, createRoutesFromElements, defer } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { AppLayout, PublicLayout, RootLayout } from './layouts'
import { AuthLayout } from './layouts/auth-layout'

// Lazy load all page components
const Home = lazy(() => import('./pages/home'))
const Login = lazy(() => import('./pages/auth').then((module) => ({ default: module.Login })))
const Signup = lazy(() => import('./pages/auth').then((module) => ({ default: module.Signup })))
const UserDashboard = lazy(() =>
  import('./pages/users').then((module) => ({ default: module.UserDashboard }))
)
const DashboardLayout = lazy(() => import('./layouts/dashboard-layout'))
const Dashboard = lazy(() => import('./pages/restaurant-dashboard/dashboard'))
const ScanQr = lazy(() => import('./pages/qr-code-page'))
const ProductList = lazy(() => import('./pages/dishes-list'))
const AddDish = lazy(() => import('./pages/restaurant-dashboard/add-dish'))
const Error404 = lazy(() => import('./pages/404'))
const ErrorBoundaryPage = lazy(() => import('./pages/error-boundary'))

import SkeletonDishesList from './components/skeletons/dishes-list'
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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<RootLayout />}
      loader={() => defer({ userPromise: getUserData() })}
      errorElement={<ErrorBoundaryPage />}
    >
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<SkeletonPage />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/dishes-list"
          element={
            <Suspense fallback={<SkeletonDishesList />}>
              <ProductList />
            </Suspense>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<SkeletonPage />}>
              <DashboardLayout />
            </Suspense>
          }
        >
          <Route
            path="add-dish"
            element={
              <Suspense fallback={<SkeletonPage />}>
                <AddDish />
              </Suspense>
            }
          />
          <Route
            path=""
            element={
              <Suspense fallback={<SkeletonPage />}>
                <Dashboard />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/scan-qr"
          element={
            <Suspense fallback={<SkeletonPage />}>
              <ScanQr />
            </Suspense>
          }
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <Suspense fallback={<SkeletonPage />}>
              <Login />
            </Suspense>
          }
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route
          path="/signup"
          element={
            <Suspense fallback={<SkeletonPage />}>
              <Signup />
            </Suspense>
          }
        />
      </Route>

      <Route path="/dashboard-user" element={<AppLayout />}>
        <Route
          path="overview"
          element={
            <Suspense fallback={<SkeletonPage />}>
              <UserDashboard />
            </Suspense>
          }
        />
      </Route>

      <Route
        path="*"
        element={
          <Suspense fallback={<SkeletonPage />}>
            <Error404 />
          </Suspense>
        }
      />
    </Route>
  )
)
