import dynamic from 'next/dynamic'
import { Spinner } from '@app/web/ui/Spinner'

export default dynamic(() => import('@app/ui/chart/ChartJsContent'), {
  ssr: false,
  loading: () => (
    <div className="fr-width-full fr-flex fr-align-items-center">
      <Spinner />
    </div>
  ),
})
