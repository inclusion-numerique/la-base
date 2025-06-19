import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import React from 'react'

export const ExploreResourceButton = ({
  className,
}: {
  className?: string
}) => (
  <Button
    data-testid="explore-resource-button"
    linkProps={{
      href: '/rechercher/tout/ressources',
    }}
    className={classNames(className)}
  >
    <span className="ri-search-line fr-mr-1w" />
    Explorer les ressources
  </Button>
)
