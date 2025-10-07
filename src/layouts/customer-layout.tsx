import {Outlet, useNavigate, useParams} from 'react-router-dom'
import {PAGE_ROUTES} from '../constants/page-routes'
import {useEffect} from 'react'
import useStore from '../store'

export function CustomerLayout() {

  const {restaurant} = useStore(state => state)
  const navigate = useNavigate()
  const {restaurantUrl} = useParams()

  useEffect(() => {
    if (restaurantUrl && !restaurant?.id) {
      navigate(PAGE_ROUTES.RESTAURANT_VIEW(restaurantUrl), {replace: true})
      return
    }
    if (!restaurantUrl && !restaurant?.id) {
      navigate(PAGE_ROUTES.SCAN_QR, {replace: true})
      return
    }
  }, [restaurantUrl, restaurant?.id, navigate])


  return (
    <main className="h-full">
      <Outlet />
    </main>
  )
}
