import BackButton from '@app/web/components/BackButton'
import Images, { HeartIconSvg } from '@app/web/components/Collection/Images'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import type { CollectionPageData } from '@app/web/server/collections/getCollection'
import type { WithMinimalImageData } from '@app/web/server/image/imageTypes'
import classNames from 'classnames'
import styles from './CollectionViewHeader.module.css'

const CollectionViewHeader = ({
  collection,
}: {
  collection: Omit<CollectionPageData, 'image'> & WithMinimalImageData
}) => (
  <div
    className={
      collection.isFavorites
        ? 'fr-background-alt--pink-tuile'
        : 'fr-background-alt--blue-france'
    }
  >
    <div className="fr-container fr-container--medium fr-py-4v fr-pb-md-12v fr-pt-md-10v">
      <BackButton />
      <div className="fr-width-full">
        <div className="fr-flex fr-direction-column fr-flex-gap-6v">
          {!collection.isFavorites && (
            <OwnershipInformation
              user={collection.createdBy}
              base={collection.base}
              attributionWording="collection"
            />
          )}
          <div
            className={classNames(
              'fr-flex fr-justify-content-space-between fr-flex-gap-4v fr-direction-column',
              !!collection.image && 'fr-direction-md-row-reverse',
            )}
          >
            {!!collection.image && (
              <div className={styles.imageContainer}>
                <Images
                  resources={collection.resources.map(
                    ({ resource }) => resource,
                  )}
                  image={collection.image}
                />
              </div>
            )}
            <div className="fr-flex fr-flex-gap-2v fr-col-md-8">
              {collection.isFavorites && (
                <div className="fr-hidden fr-unhidden-md fr-background-contrast--pink-tuile fr-p-8v fr-border-radius--8 fr-flex fr-justify-content-center fr-align-items-center fr-mr-4v">
                  <HeartIconSvg />
                </div>
              )}
              <div className="fr-flex fr-direction-column fr-justify-content-center">
                <h1 className={classNames('fr-mb-4v fr-h3', styles.title)}>
                  {collection.title}
                </h1>
                {collection.description && (
                  <div
                    className="fr-text--lg fr-mb-0"
                    dangerouslySetInnerHTML={{
                      __html: collection.description,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default CollectionViewHeader
