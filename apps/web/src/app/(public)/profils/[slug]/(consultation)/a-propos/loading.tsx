import IconInSquare from '@app/web/components/IconInSquare'
import React from 'react'

const LoadingAProposPage = () => (
  <>
    <div className="fr-flex fr-align-items-center fr-flex-gap-5v fr-mb-6w">
      <IconInSquare iconId="ri-information-line" />
      <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">À propos</h2>
    </div>
    <hr />
    <div className="fr-grid-row">
      <div className="fr-col-8">
        <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--120" />
        <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--480" />
        <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--480" />
        <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--120" />
      </div>
      <div className="fr-col">
        <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--120" />
        <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--240" />
        <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--120" />
        <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--240" />
        <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--120" />
        <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--240" />
        <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--120" />
        <div className="fr-mb-2w skeleton-rectangle skeleton-rectangle--240" />
      </div>
    </div>
  </>
)

export default LoadingAProposPage
