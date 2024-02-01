import React from 'react'
import type { Resource } from '@prisma/client'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import styles from '@app/web/components/Resource/ResourceCard.module.css'

const ResourceDates = ({
  resource,
}: {
  resource: Pick<
    Resource,
    'published' | 'lastPublished' | 'created' | 'updated'
  >
}) => {
  const lastPublishedDay = resource.lastPublished
    ? dateAsDay(resource.lastPublished)
    : null
  const publishedDay = resource.published ? dateAsDay(resource.published) : null

  // If published, we show the latest publication date
  if (lastPublishedDay) {
    // Published multiple times in different days, we show the latest publication date
    if (lastPublishedDay !== publishedDay) {
      return <div>Mise à jour le {lastPublishedDay}</div>
    }
    // Published once, we show the publication date
    return <div>Publiée le {publishedDay}</div>
  }

  const updatedDay = dateAsDay(resource.updated)
  const createdDay = dateAsDay(resource.created)

  if (updatedDay !== createdDay) {
    return (
      <>
        <div>Créée le {dateAsDay(resource.created)}</div>
        <div className={styles.separator} />
        <div>Modifiée le {dateAsDay(resource.updated)}</div>
      </>
    )
  }

  return <div>Créée le {dateAsDay(resource.created)}</div>
}
export default ResourceDates
