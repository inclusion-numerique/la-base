import React from 'react'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import { getServerUrl } from '@app/web/utils/baseUrl'
import RoundProfileImage from '../RoundProfileImage'
import { PrivacyTag } from '../PrivacyTags'
import CopyLinkButton from '../CopyLinkButton'
import styles from './CollectionCard.module.css'

const CollectionCard = ({ collection }: { collection: CollectionListItem }) => (
  <div className={styles.card}>
    <div className={styles.owner}>
      <RoundProfileImage user={collection.owner} />
      <Link
        className="fr-text--xs fr-link"
        href={`/profiles/${collection.owner.id}`}
      >
        {collection.owner.name}
      </Link>
    </div>
    <h6 className={styles.title}>{collection.title}</h6>
    {collection.description && (
      <span className="fr-text--sm fr-mb-0">{collection.description}</span>
    )}
    <div className={styles.footer}>
      <div className={styles.metadata}>
        <span className="fr-icon-file-text-line fr-icon--sm" />
        <span>
          {/* eslint-disable-next-line no-underscore-dangle */}
          <b>{collection._count.resources}</b> Ressources
        </span>
        <span>•</span>
        <PrivacyTag
          isPublic={collection.isPublic}
          small
          label={collection.isPublic ? 'Publique' : 'Privée'}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          title="Marquer comme favoris"
          iconId="fr-icon-bookmark-line"
          size="small"
          priority="tertiary no outline"
        />
        <CopyLinkButton
          url={getServerUrl(`/collections/${collection.id}`, true)}
        />
      </div>
    </div>
  </div>
)

export default CollectionCard
