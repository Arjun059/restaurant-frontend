import {useQuery} from '@tanstack/react-query';
import {fetcher} from '../../utils/fetcher';
import {DishesDataTable} from '../../components/dishes-table';


export default function RestaurantDishesList() {
  const queryResp = useQuery<any>({
    queryKey: ['dishes'],
    queryFn: () => fetcher<any[]>('/dishes'),
  });
  console.log(queryResp.data, "queryResp [[")

  return (
    <>
      <DishesDataTable data={queryResp.data || []}></DishesDataTable>
    </>
  )
}
