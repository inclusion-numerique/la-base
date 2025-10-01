import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import ResourceCollectionsModal from '@app/web/app/(public)/ressources/[slug]/_components/ResourceCollectionsModal'
import ResourceInformationsModalButton from '@app/web/app/(public)/ressources/[slug]/_components/ResourceInformationsModalButton'
import { BaseResource } from '@app/web/server/bases/getBase'
import { Resource } from '@app/web/server/resources/getResource'
import { numberToString } from '@app/web/utils/formatNumber'
import classNames from 'classnames'
import React, { type ReactNode } from 'react'
import CustomTag, { TagColor } from '../CustomTag'
import styles from './ResourcesViewsAndMetadata.module.css'

const ResourcesViewsAndMetadata = ({
  className,
  resource,
  children,
  showLabels = false,
  showPrivate = true,
  context,
}: {
  className?: string
  resource: Resource | BaseResource
  children?: ReactNode
  showLabels?: boolean
  showPrivate?: boolean
  context: 'view' | 'card' | 'collection'
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
      <span className="fr-text--medium" data-testid="resource-views-count">
        <span className="fr-text--nowrap">
          {numberToString(resource.viewsCount)}
          {showLabels && (
            <span className="fr-hidden fr-unhidden-sm"> Vues</span>
          )}
          <span className="fr-hidden-sm fr-unhidden fr-sr-only">Vues</span>
        </span>
      </span>
      <span className="fr-text--medium">·</span>
      <span className="fr-icon-bookmark-line fr-icon--sm" aria-hidden />
      {['card', 'collection'].includes(context) && (
        <span
          className="fr-text--medium"
          data-testid="resource-collections-count"
        >
          <span className="fr-text--nowrap">
            {numberToString(resource._count.collections)}
            <span
              className={classNames(
                showLabels
                  ? 'fr-hidden fr-unhidden-sm'
                  : 'fr-hidden-sm fr-unhidden fr-sr-only',
              )}
            >
              {' '}
              Enregistrement{sPluriel(resource._count.collections)}
            </span>
          </span>
        </span>
      )}
      {context === 'view' && (
        <ResourceCollectionsModal resource={resource as Resource}>
          <ResourceInformationsModalButton
            title={`${numberToString(
              resource._count.collections,
            )} Enregistrement${sPluriel(resource._count.collections)}`}
            className={classNames('fr-text--medium', styles.feedbackLink)}
          />
        </ResourceCollectionsModal>
      )}
      {!resource.isPublic && showPrivate && (
        <span className="fr-unhidden fr-hidden-sm">
          <span className="fr-mr-1w fr-text--medium">·</span>
          <span className="fr-tag fr-tag--sm">
            <span className="ri-lock-line" aria-hidden="true" />
            <span className="fr-sr-only">Privée</span>
          </span>
        </span>
      )}
    </span>
    {children && (
      <>
        <span className="fr-flex fr-flex-gap-2v">{children}</span>
      </>
    )}
    {!resource.isPublic && showPrivate && (
      <span className="fr-hidden fr-unhidden-sm">
        <span className="fr-mr-1w fr-text--medium">·</span>
        <span>
          <CustomTag
            small
            color={TagColor.GREY}
            icon="fr-icon-lock-line"
            label="Privée"
          />
        </span>
      </span>
    )}
  </span>
)
export default ResourcesViewsAndMetadata
