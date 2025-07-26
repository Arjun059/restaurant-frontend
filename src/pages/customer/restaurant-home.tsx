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
      if (!restaurantUrl) return;
      if (restaurant?.id && restaurant?.urlPath === restaurantUrl) {
        setRedirect(PAGE_ROUTES.RESTAURANT_DISHES_LIST(restaurantUrl));
        return;
      }
      setLoading(true);
      setError(false);
      try {
        const data = await fetcher(`/restaurant/get/url/${restaurantUrl}`);
        if (!ignore) {
          setRestaurant(data);
          setRedirect(PAGE_ROUTES.RESTAURANT_DISHES_LIST(restaurantUrl));
        }
      } catch (e) {
        if (!ignore) setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchRestaurant();
    return () => {ignore = true;};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantUrl]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-4">
        <Loader2 className="w-4 h-4 animate-spin mx-auto" />
      </div>
    );
  }

  if (error) {
    // Optionally navigate to not found or show error UI
    // return <Navigate to={PAGE_ROUTES.NOT_FOUND} replace />
    return <div className="text-center text-red-500">Error loading restaurant.</div>;
  }

  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  return null;
}

