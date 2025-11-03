import {useQuery} from '@tanstack/react-query';
import {fetcher} from '../../utils/fetcher';
import {DishesDataTable} from '../../components/dishes-table';
import useStore from '../../store';


export default function RestaurantDishesList() {
  const {restaurant} = useStore()
  const queryResp = useQuery<any>({
    queryKey: ['dishes'],
    queryFn: () => fetcher<any[]>(`/dishes/${restaurant?.id}`),
  });

  return (
    <>
      <DishesDataTable data={queryResp?.data ?? []}></DishesDataTable>
    </>
  )
}
