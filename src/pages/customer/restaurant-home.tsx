import {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import useStore from '../../store';
import {PAGE_ROUTES} from '../../constants/page-routes';
import {fetcher} from '../../utils/fetcher';
import {Loader2} from 'lucide-react';

export default function RestaurantHome() {
  const {restaurantUrl} = useParams();
  const {restaurant, setRestaurant} = useStore(state => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchRestaurant() {

      // Clear restaurant state if we're navigating to a different restaurant
      // if (restaurant?.urlPath && restaurant.urlPath !== restaurantUrl) {
      //   setRestaurant(null);
      // }

      // If we already have the restaurant data for this URL, redirect immediately
      if (restaurant?.id && restaurant?.urlPath === restaurantUrl) {
        setRedirect(PAGE_ROUTES.RESTAURANT_DISHES_LIST(restaurantUrl as string));
        return;
      }

      setLoading(true);
      setError(false);
      setRedirect(null); // Reset redirect state

      try {
        const data = await fetcher(`/restaurant/get/url/${restaurantUrl}`);
        console.log(data, 'data =======')
        if (!ignore && data) {
          setRestaurant(data);
          setRedirect(PAGE_ROUTES.RESTAURANT_DISHES_LIST(restaurantUrl as string));
        } else if (!ignore && !data) {
          setError(true);
        }
      } catch (e) {
        console.error('Error fetching restaurant:', e);
        if (!ignore) setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    if (restaurantUrl) {
      fetchRestaurant();
    } else {
      console.log("restaurant url path is not valid")
    }

    return () => {
      ignore = true;
    };
  }, [restaurantUrl]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-4">
        <div className="text-center text-red-500">
          <h2 className="text-xl font-semibold mb-2">Restaurant Not Found</h2>
          <p>The restaurant you're looking for could not be found.</p>
        </div>
      </div>
    );
  }

  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  // Show loading state while redirect is being set
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    </div>
  );
}
