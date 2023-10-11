import React from 'react'
import EmptyBox from '@app/web/components/EmptyBox'
import { Spinner } from '@app/web/ui/Spinner'

const LoadingResultsContainer = () => (
  <div className="fr-container fr-container--medium">
    <EmptyBox title="" className="fr-mt-11v">
      <Spinner />
    </EmptyBox>
  </div>
)

export default LoadingResultsContainer
