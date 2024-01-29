import classNames from 'classnames'
import React from 'react'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import styles from '@app/web/components/Resource/View/ResourceView.module.css'

const ResourceDates = ({
  className,
  updated,
  created,
  published,
}: {
  className?: string
  created: Date
  updated: Date
  published: Date | null
}) => {
  const publishedDay = dateAsDay(published ?? created)
  const updatedDay = dateAsDay(updated)

  return (
    <div className={classNames('fr-text--xs fr-mb-0', className)}>
      {published ? (
        <span className="fr-mr-1w">Publiée le {dateAsDay(published)}</span>
      ) : (
        <span className="fr-mr-1w">Créée le {dateAsDay(created)}</span>
      )}
      {publishedDay !== updatedDay && (
        <>
          <span className={styles.publishedAndUpdatedSeparator} />
          <span className="fr-ml-1w">
            {publishedDay !== updatedDay && ` Mise à jour le ${updatedDay}`}
          </span>
        </>
      )}
    </div>
  )
}

export default ResourceDates
