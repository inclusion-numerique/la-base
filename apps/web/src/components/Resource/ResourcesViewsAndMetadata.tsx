import React, { ReactNode } from 'react'
import classNames from 'classnames'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import CustomTag, { TagColor } from '../CustomTag'

const ResourcesViewsAndMetadata = ({
  className,
  resource,
  children,
  showLabels = false,
  showPrivate = true,
}: {
  className?: string
  resource: ResourceListItem
  children?: ReactNode
  showLabels?: boolean
  showPrivate?: boolean
}) => (
  <span
    data-testid="resources-views-and-metadata"
    className={classNames(
      'fr-text--sm fr-mb-0 fr-text-mention--grey fr-flex fr-direction-column-reverse fr-direction-sm-row fr-flex-gap-2v',
      className,
    )}
  >
    <span className="fr-flex fr-flex-gap-2v">
      <span className="fr-icon-eye-line fr-icon--sm" aria-hidden />
      <span className="fr-text--bold" data-testid="resource-views-count">
        <span className="fr-text--nowrap">
          {resource._count.views}
          {showLabels && (
            <span className="fr-hidden fr-unhidden-sm"> Vues</span>
          )}
          <span className="fr-hidden-sm fr-unhidden fr-sr-only">Vues</span>
        </span>
      </span>
      <span className="fr-text--semi-bold">·</span>
      <span className="fr-icon-bookmark-line fr-icon--sm" aria-hidden />
      <span className="fr-text--bold" data-testid="resource-collections-count">
        <span className="fr-text--nowrap">
          {resource._count.collections}
          {showLabels && (
            <span className="fr-hidden fr-unhidden-sm">
              {' '}
              Enregistrement{sPluriel(resource._count.collections)}
            </span>
          )}
          <span className="fr-hidden-sm fr-unhidden fr-sr-only">
            Enregistrement{sPluriel(resource._count.collections)}
          </span>
        </span>
      </span>
      {!resource.isPublic && showPrivate && (
        <span className="fr-unhidden fr-hidden-sm">
          <span className="fr-mr-1w fr-text--semi-bold">·</span>
          <span className="fr-tag fr-tag--sm">
            <span className="ri-lock-line" aria-hidden="true" />
            <span className="fr-sr-only">Privée</span>
          </span>
        </span>
      )}
    </span>
    {children && (
      <>
        <span className="fr-hidden fr-unhidden-sm fr-text--semi-bold">·</span>
        <span className="fr-flex fr-flex-gap-2v">{children}</span>
      </>
    )}
    {!resource.isPublic && showPrivate && (
      <span className="fr-hidden fr-unhidden-sm">
        <span className="fr-mr-1w fr-text--semi-bold">·</span>
        <CustomTag
          small
          color={TagColor.GREY}
          icon="fr-icon-lock-line"
          label="Privée"
        />
      </span>
    )}
  </span>
)
export default ResourcesViewsAndMetadata
