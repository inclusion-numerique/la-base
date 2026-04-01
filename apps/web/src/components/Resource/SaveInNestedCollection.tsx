import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { SessionUser, SessionUserBase } from '@app/web/auth/sessionUser'
import BaseImage from '@app/web/components/BaseImage'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { useIsMobile } from '@app/web/hooks/useIsMobile'
import Tag from '@codegouvfr/react-dsfr/Tag'
import classNames from 'classnames'
import styles from './SaveResourceInCollectionModal.module.css'

const SaveInNestedCollection = ({
  base,
  user,
  onClick,
  alreadyInCollections,
  isExpanded = false,
}: {
  base?: SessionUserBase
  user: SessionUser
  onClick: () => void
  alreadyInCollections: number
  isExpanded?: boolean
}) => {
  const isMobile = useIsMobile()
  const avatarSize = isMobile ? 32 : 48
  const withoutFavoriteCollections = user.collections.filter(
    (collection) => !collection.isFavorites,
  )

  return (
    <button
      className={classNames(styles.clickableContainer, 'fr-border--bottom')}
      onClick={onClick}
      type="button"
      data-testid="add-in-collection-bases"
      aria-expanded={isExpanded}
    >
      <div className={styles.content}>
        <div className="fr-flex fr-justify fr-align-items-center fr-flex-gap-6v">
          {!base && (
            <RoundProfileImage user={user} size={avatarSize} borderWidth={1} />
          )}
          {!!base && <BaseImage base={base} size={avatarSize} />}
          <div className="fr-flex fr-direction-column fr-flex-gap-1v">
            <h2
              className={classNames(
                'fr-text--md fr-text--bold fr-mb-0 fr-text-title--grey fr-text--start',
                styles.title,
              )}
            >
              {base ? base.title : `${user.name} - Mes collections`}
            </h2>
            <div className="fr-flex fr-direction-md-row fr-direction-column fr-flex-gap-2v">
              <p className={classNames('fr-mb-0', styles.collections)}>
                <span className="fr-icon-folder-2-line fr-icon--sm" />
                &nbsp;
                {base
                  ? base.collections.length
                  : withoutFavoriteCollections.length}
                &nbsp;Collection
                {sPluriel(
                  base?.collections.length ?? withoutFavoriteCollections.length,
                )}
              </p>
              {alreadyInCollections > 0 ? (
                <Tag small>
                  Déjà ajoutée dans {alreadyInCollections} collection
                  {sPluriel(alreadyInCollections)}
                </Tag>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <span
        className={classNames(
          'fr-icon-arrow-right-s-line',
          'fr-mx-1w',
          'fr-icon--sm',
          styles.arrow,
        )}
      />
    </button>
  )
}

export default SaveInNestedCollection
