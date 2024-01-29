'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { Statistics } from '@app/web/app/(public)/statistiques/getStatistics'

const SearchStatistics = ({ data }: { data: Statistics['search'] }) => (
  <div className="fr-border--slim-grey fr-p-2v fr-p-md-8v">
    <h6 className="fr-mb-2v fr-mb-md-8v">Nombre de recherches effectuées</h6>
    <div className="fr-width-full" style={{ height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.searchExecutions} margin={{}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} fontSize={10} />
          <YAxis width={30} fontSize={10} />
          {/* <Tooltip wrapperStyle={{ border: 'none' }} /> */}
          <Bar
            barSize={20}
            dataKey="Recherches"
            fill="var(--blue-france-sun-113-625)"
            activeBar={
              <Rectangle fill="var(--blue-france-sun-113-625-hover)" />
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)

export default SearchStatistics
