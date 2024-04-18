import React from 'react'
import type { Resource } from '@prisma/client'
import Badge from '@codegouvfr/react-dsfr/Badge'
import classNames from 'classnames'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import styles from '@app/web/components/Resource/ResourceCard.module.css'

const ResourceDates = ({
  resource,
  canEdit,
}: {
  canEdit: boolean
  resource: Pick<
    Resource,
    'published' | 'lastPublished' | 'created' | 'updated'
  >
}) => {
  const lastPublishedDay = resource.lastPublished
    ? dateAsDay(resource.lastPublished)
    : null
  const publishedDay = resource.published ? dateAsDay(resource.published) : null

  if (lastPublishedDay) {
    const unpublishedModifications =
      canEdit &&
      resource.updated.getTime() !== resource.lastPublished?.getTime() ? (
        <>
          <Badge small severity="info">
            Modifications&nbsp;non&nbsp;publiées
          </Badge>
          <div
            className={classNames('fr-hidden fr-unhidden-md', styles.separator)}
          />
        </>
      ) : null

    const dateContent = (
      <>
        Publiée&nbsp;le&nbsp;{publishedDay}
        {lastPublishedDay !== publishedDay && (
          <>
            <span className="fr-mx-1v fr-text--bold">︱</span>
            Mise&nbsp;à&nbsp;jour&nbsp;le&nbsp;{lastPublishedDay}
          </>
        )}
      </>
    )

    if (unpublishedModifications) {
      return (
        <div className="fr-flex fr-direction-column fr-direction-md-row fr-flex-gap-2v fr-flex-gap-md-0">
          {unpublishedModifications}
          {dateContent}
        </div>
      )
    }
    return dateContent
  }

  const updatedDay = dateAsDay(resource.updated)
  const createdDay = dateAsDay(resource.created)

  if (updatedDay !== createdDay) {
    return (
      <>
        <div>Créée&nbsp;le&nbsp;{dateAsDay(resource.created)}</div>
        <div className={styles.separator} />
        <div>Modifiée&nbsp;le&nbsp;{dateAsDay(resource.updated)}</div>
      </>
    )
  }

  return <div>Créée&nbsp;le&nbsp;{dateAsDay(resource.created)}</div>
}
export default ResourceDates
