import React, { ReactNode } from 'react'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import SaveCollectionModal from '@app/web/components/Collection/SaveCollectionModal'
import { SessionUser } from '@app/web/auth/sessionUser'
import { CreateCollectionButton } from '../CreateCollectionButton'
import CollectionCard from '../CollectionCard'
import styles from './Collections.module.css'

const Collections = ({
  collections,
  savedCollections,
  withCreation,
  collectionsLabel,
  emptyBox,
  emptySavedBox,
  baseId,
  user,
}: {
  user: SessionUser | null
  collections: CollectionListItem[]
  savedCollections: CollectionListItem[]
  withCreation: boolean
  collectionsLabel: string
  emptyBox?: ReactNode
  emptySavedBox: ReactNode
  baseId?: string
}) => (
  <div data-testid="collections-list">
    <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-reverse fr-mb-4w">
      <div className="fr-col-sm-auto fr-col-12">
        <h2 className="fr-mb-0 fr-h3">
          Collections · {collections.length + savedCollections.length}
        </h2>
      </div>
      {withCreation && (
        <div className="fr-col-sm-auto fr-col-12 fr-mb-5w fr-mb-md-2w">
          <CreateCollectionButton
            className="fr-btn--secondary fr-width-full fr-justify-content-center"
            baseId={baseId}
          />
        </div>
      )}
    </div>

    <Tabs
      tabs={[
        {
          label: `${collectionsLabel} · ${collections.length}`,
          content:
            collections.length > 0 ? (
              <div className={styles.tabCards}>
                {collections.map((collection) => (
                  <CollectionCard
                    user={user}
                    collection={collection}
                    key={collection.id}
                  />
                ))}
              </div>
            ) : (
              emptyBox
            ),
        },
        {
          label: (
            <>
              <span className="ri-bookmark-3-line fr-text--regular fr-mr-1w" />
              Collections enregistrées · {savedCollections.length}
            </>
          ),
          content:
            savedCollections.length > 0 ? (
              <div className={styles.tabCards}>
                {savedCollections.map((collection) => (
                  <CollectionCard
                    user={user}
                    collection={collection}
                    key={collection.id}
                  />
                ))}
              </div>
            ) : (
              emptySavedBox
            ),
        },
      ]}
    />
    {!!user && <SaveCollectionModal user={user} />}
  </div>
)

export default Collections
