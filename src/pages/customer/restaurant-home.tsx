import {useQuery} from '@tanstack/react-query';
import {fetcher} from '../../utils/fetcher';


import {
  Loader2,
} from "lucide-react";
import {Navigate, useParams} from 'react-router-dom';
import useStore from '../../store';

export default function RestaurantHome() {
  const {restaurantUrl} = useParams()
  const {restaurant, setRestaurant} = useStore(state => state)
  const queryResp = useQuery({
    queryKey: ['restaurant-home'],
    queryFn: () => fetcher<any>(`/restaurant/get/url/${restaurantUrl}`),
    enabled: !!restaurantUrl && (!restaurant?.id ? true : restaurant?.urlPath !== restaurantUrl),
  });

  if (queryResp.isError) {
    throw new Error()
  }

  if (queryResp.isLoading) {
    return (
      <div className="container mx-auto px-4 py-4">
        <Loader2 className="w-4 h-4 animate-spin mx-auto" />
      </div>
    )
  }


  if (queryResp.isSuccess || restaurant?.id) {
    setRestaurant(queryResp.data?.data || null)
    return (
      <Navigate to={`/restaurant/${restaurantUrl}/dishes`} replace />
    )
  }

}

