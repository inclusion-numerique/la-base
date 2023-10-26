import React, { ReactNode } from 'react'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import { CreateCollectionButton } from '../CreateCollectionButton'
import CollectionCard from '../CollectionCard'
import styles from './Collections.module.css'

const Collections = ({
  collections,
  withCreation,
  withTabs,
  collectionsLabel,
  emptyBox,
  emptySavedBox,
}: {
  collections: CollectionListItem[]
  withCreation: boolean
  withTabs: boolean
  collectionsLabel: string
  emptyBox?: ReactNode
  emptySavedBox: ReactNode
}) => (
  <div className={styles.container} data-testid="collections-list">
    <div className={styles.header}>
      <h3 className="fr-mb-0">Collections · {collections.length}</h3>
      {withCreation && <CreateCollectionButton className="fr-btn--secondary" />}
    </div>
    {withTabs ? (
      <Tabs
        tabs={[
          {
            label: `${collectionsLabel} · ${collections.length}`,
            content:
              collections.length > 0 ? (
                <div className={styles.tabCards}>
                  {collections.map((collection) => (
                    <CollectionCard
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
            label: `Collections enregistrées · 0`,
            iconId: 'fr-icon-bookmark-line',
            content: emptySavedBox,
          },
        ]}
      />
    ) : (
      <div className={styles.cards}>
        {collections.map((collection) => (
          <CollectionCard collection={collection} key={collection.id} />
        ))}
      </div>
    )}
  </div>
)

export default Collections
