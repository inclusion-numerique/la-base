'use client'

import React from 'react'
import classNames from 'classnames'
import { Route } from 'next'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { SessionUser } from '@app/web/auth/sessionUser'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import IconLink from '../Icon/IconLink'
import styles from './Card.module.css'
import PublishedInInformation from './PublishedInInformation'
import { deleteResourceModalProps } from './Edition/DeleteResourceModalContent'

const { Component: DeleteResourceModal, open: openDeleteResourceModal } =
  createModal({
    id: 'deleteResource',
    isOpenedByDefault: false,
  })

const ResourceCard = ({
  resource,
  user,
}: {
  resource: ResourceListItem
  user: SessionUser | null
}) => {
  const router = useRouter()
  const mutate = trpc.resource.mutate.useMutation()

  const onDelete = async () => {
    try {
      await mutate.mutateAsync({
        name: 'Delete',
        payload: {
          resourceId: resource.id,
        },
      })

      router.refresh()
    } catch (error) {
      console.error('Could not delete resource', error)
      // TODO Have a nice error and handle edge cases server side
      // TODO for example a linked base or file or resource has been deleted since last publication
      throw error
    }
  }

  const isContributor = user && user.id === resource.createdBy.id

  const dates = resource.published ? (
    isContributor && resource.updated !== resource.published ? (
      <>
        <Notice
          className={styles.smallNotice}
          title="Modifications non publiées"
        />
        <div className={styles.separator} />
        <div>Mis à jour le {dateAsDay(resource.updated)}</div>
      </>
    ) : (
      <div>Mis à jour le {dateAsDay(resource.updated)}</div>
    )
  ) : (
    <>
      <div>Créé le {dateAsDay(resource.created)}</div>
      {dateAsDay(resource.created) !== dateAsDay(resource.updated) && (
        <>
          <div className={styles.separator} />
          <div>Modifié le {dateAsDay(resource.updated)}</div>
        </>
      )}
    </>
  )

  return (
    <>
      <DeleteResourceModal {...deleteResourceModalProps(onDelete)} />
      <div className={styles.container} data-testid="resource-card">
        <div className={styles.header}>
          <PublishedInInformation resource={resource} />
          <div className="fr-hidden fr-unhidden-md fr-text--xs fr-mb-0">
            {dates}
          </div>
        </div>
        <Link href={`/ressources/${resource.slug}`} className={styles.content}>
          <div className={styles.textAndDescription}>
            <div
              className={classNames(
                styles.dates,
                'fr-hidden-md fr-text--xs fr-mb-1w',
              )}
            >
              {dates}
            </div>
            <h6 className={styles.title}>{resource.title}</h6>
            <p
              className={classNames('fr-text--sm fr-mb-0', styles.description)}
            >
              {resource.description}
            </p>
          </div>
          {!!resource.image && (
            <div className={styles.imageContainer}>
              <ResponsiveUploadedImage
                id={resource.image.id}
                alt={resource.image.altText ?? ''}
                breakpoints={[
                  { media: '(max-width: 320px)', width: 320 - 32 },
                  { media: '(max-width: 576px)', width: 576 - 32 },
                  { media: '(max-width: 768px)', width: 768 - 32 },
                  { media: '(min-width: 768px)', width: 180 },
                ]}
              />
            </div>
          )}
        </Link>
        <Badge
          className="fr-hidden-md fr-mt-1w"
          small
          noIcon
          severity="success"
        >
          Très recommandée
        </Badge>
        <div className={styles.footer}>
          {resource.published && (
            <div className="fr-text--sm fr-mb-0">
              <ResourcesViewsAndMetadata />
            </div>
          )}
          <div
            className={classNames(styles.footerRight, 'fr-text--sm', 'fr-mb-0')}
          >
            {isContributor && (
              <IconLink
                data-testid="resource-card-edit-link"
                title="Editer"
                href={`/ressources/${resource.slug}/editer` as Route}
                icon="fr-icon-edit-line"
                small
              />
            )}
            {resource.published === null ? (
              <Button
                title="Supprimer la ressource"
                iconId="fr-icon-delete-line"
                size="small"
                priority="tertiary no outline"
                onClick={openDeleteResourceModal}
              />
            ) : (
              <>
                <IconLink
                  title="Mettre en favoris"
                  href="/"
                  icon="fr-icon-bookmark-line"
                  small
                />
                <CopyLinkButton
                  url={getServerUrl(`/ressources/${resource.slug}`, true)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default withTrpc(ResourceCard)
