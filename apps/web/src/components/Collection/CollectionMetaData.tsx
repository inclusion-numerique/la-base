import React from 'react'
import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import Link from 'next/link'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import { PrivacyTag } from '../PrivacyTags'
import CopyLinkButton from '../CopyLinkButton'
import styles from './CollectionMetaData.module.css'

const CollectionMetaData = ({
  collection,
  count,
  priority,
  isOwner,
}: {
  collection: CollectionListItem | CollectionPageData
  priority: ButtonProps.Common['priority']
  count: number
  isOwner?: boolean
}) => (
  <div className={styles.container}>
    <div className={styles.informations}>
      <span className="fr-icon-file-text-line fr-icon--sm" />
      <span>
        <b>{count}</b> Ressources
      </span>
      <span>•</span>
      <PrivacyTag
        isPublic={collection.isPublic}
        small
        label={collection.isPublic ? 'Publique' : 'Privée'}
      />
    </div>
    <div className={styles.buttons}>
      {isOwner && (
        <Link
          href="/"
          className={classNames(
            'fr-btn',
            'fr-btn--sm',
            `fr-btn--${
              priority ? priority.replace(' ', '-') : 'tertiary-no-outline'
            }`,
            'fr-icon-edit-line',
            'fr-btn--icon-right',
          )}
        >
          Modifier
        </Link>
      )}
      <Button
        title="Marquer comme favoris"
        iconId="fr-icon-bookmark-line"
        size="small"
        priority={priority}
      />
      <CopyLinkButton
        url={getServerUrl(`/collections/${collection.id}`, true)}
        priority={priority}
      />
    </div>
  </div>
)

export default CollectionMetaData
