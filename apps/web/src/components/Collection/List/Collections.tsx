import React from 'react'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import { CreateCollectionButton } from '../CreateCollectionButton'
import CollectionCard from '../CollectionCard'
import EmptyBox from '../../EmptyBox'
import styles from './Collections.module.css'

const Collections = ({
  collections,
  isConnectedUser,
}: {
  collections: CollectionListItem[]
  isConnectedUser: boolean
}) => (
  <div className={styles.container} data-testid="collections-list">
    <div className={styles.header}>
      <h3 className="fr-mb-0">Collections · {collections.length}</h3>
      {isConnectedUser && (
        <CreateCollectionButton className="fr-btn--secondary" />
      )}
    </div>
    {isConnectedUser ? (
      <Tabs
        tabs={[
          {
            label: `Mes collections · ${collections.length}`,
            content: (
              <div className={styles.tabCards}>
                {collections.map((collection) => (
                  <CollectionCard collection={collection} key={collection.id} />
                ))}
              </div>
            ),
          },
          {
            label: `Collections enregistrées · 0`,
            iconId: 'fr-icon-bookmark-line',
            content: (
              <EmptyBox title="Vous n’avez pas enregistré de collections.">
                Enregistrez la liste de quelqu&lsquo;un d&lsquo;autre et elle
                apparaîtra ici.
              </EmptyBox>
            ),
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
