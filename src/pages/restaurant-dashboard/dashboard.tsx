import {ChartAreaInteractive} from '#/components/chart-area-interactive'
import {SectionCards} from '#/components/section-cards'

export default function Dashboard() {

  return (
    <div>
      <SectionCards />
      <div className=" mt-4">
        <ChartAreaInteractive />
      </div>
    </div>
  )
}
