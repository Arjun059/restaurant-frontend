import {ChartAreaInteractive} from '#/components/chart-area-interactive'
import {DataTable} from '#/components/data-table_backup'
import {SectionCards} from '#/components/section-cards'

import data from '#/mock/data.json'


export default function Dashboard() {
  return (
    <>
      <SectionCards />
      <div className="">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  )
}
