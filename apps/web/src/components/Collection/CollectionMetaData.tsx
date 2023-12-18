import React from 'react'
import { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import Link from 'next/link'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { getServerUrl } from '@app/web/utils/baseUrl'
import SaveCollectionButton from '@app/web/components/Collection/SaveCollectionButton'
import { SessionUser } from '@app/web/auth/sessionUser'
import { PrivacyTag } from '../PrivacyTags'
import CopyLinkButton from '../CopyLinkButton'
import styles from './CollectionMetaData.module.css'

const CollectionMetaData = ({
  user,
  collection,
  count,
  priority,
  isOwner,
  context,
}: {
  user: SessionUser | null
  collection: { isPublic: boolean; id: string }
  priority?: ButtonProps.Common['priority']
  count: number
  isOwner?: boolean
  context: 'card' | 'view' | 'collectionModal'
}) => {
  const withButtons = context === 'card' || context === 'view'
  return (
    <div className={styles.container}>
      <div className={styles.informations}>
        <span className="fr-icon-file-text-line fr-icon--sm" />
        <span>
          <b>{count}</b> Ressource{sPluriel(count)}
        </span>
        <span>•</span>
        <PrivacyTag
          isPublic={collection.isPublic}
          small
          label={collection.isPublic ? 'Publique' : 'Privée'}
        />
      </div>
      {withButtons && (
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
          <SaveCollectionButton
            user={user}
            collection={collection}
            context={context}
          />
          <CopyLinkButton
            url={getServerUrl(`/collections/${collection.id}`, true)}
            priority={priority}
          />
        </div>
      )}
    </div>
  )
}

export default CollectionMetaData
