import { dateAsDay } from '@app/web/utils/dateAsDay'
import type { Collection } from '@prisma/client'

const CollectionDates = ({
  collection,
}: {
  collection: Pick<Collection, 'created' | 'updated'>
}) => {
  const createdDay = dateAsDay(collection.created)
  const updatedDay = dateAsDay(collection.updated)

  return (
    <div className="fr-flex fr-direction-column fr-direction-md-row fr-flex-gap-2v fr-flex-gap-md-0">
      {createdDay === updatedDay ? (
        <span>Publiée&nbsp;le&nbsp;{createdDay}</span>
      ) : (
        <span>Mise&nbsp;à&nbsp;jour&nbsp;le&nbsp;{updatedDay}</span>
      )}
    </div>
  )
}

export default CollectionDates
