import {ChartAreaInteractive} from '#/components/chart-area-interactive'
import {SectionCards} from '#/components/section-cards'

import DishesList from '../customer/dishes-list'
import RestaurantDishesList from './dishes-list'


export default function Dashboard() {
  return (
    <div>
      <SectionCards />
      <div className="">
        <ChartAreaInteractive />
      </div>
      <DishesList />
      <RestaurantDishesList />
    </div>
  )
}
