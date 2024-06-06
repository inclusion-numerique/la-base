import React, { ReactNode } from 'react'
import classNames from 'classnames'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'

const ResourcesViewsAndMetadata = ({
  className,
  resource,
  children,
}: {
  className?: string
  resource: Pick<ResourceListItem, '_count'>
  children?: ReactNode
}) => (
  <span
    data-testid="resources-views-and-metadata"
    className={classNames(
      'fr-text--sm fr-mb-0 fr-text--medium fr-text-mention--grey fr-flex fr-flex-gap-2v',
      className,
    )}
  >
    <span className="fr-flex fr-flex-gap-1v">
      <span className="fr-icon-eye-line fr-icon--sm" aria-hidden />
      <span data-testid="resource-views-count">
        {resource._count.views}
      </span>{' '}
      <span className="fr-display-inline fr-unhidden-md fr-hidden">
        Vue{sPluriel(resource._count.views)}
      </span>
    </span>
    <span>·</span>
    <span className="fr-flex fr-flex-gap-1v">
      <span className="fr-icon-bookmark-line fr-icon--sm" aria-hidden />
      <span data-testid="resource-collections-count">
        {resource._count.collections}
      </span>{' '}
      <span className="fr-display-inline fr-unhidden-md fr-hidden">
        Enregistrement{sPluriel(resource._count.collections)}
      </span>
    </span>
    {children && (
      <>
        <span>·</span>
        {children}
      </>
    )}
  </span>
)
export default ResourcesViewsAndMetadata
