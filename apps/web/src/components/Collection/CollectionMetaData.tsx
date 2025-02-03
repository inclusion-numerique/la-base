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

const CollectionMetaData = ({
  user,
  collection,
  count,
  priority,
  canWrite,
  context,
  hideRessourceLabelOnSmallDevices = false,
}: {
  user: SessionUser | null
  collection: { isPublic: boolean; id: string; slug: string }
  priority?: ButtonProps.Common['priority']
  count: number
  canWrite?: boolean
  context: 'card' | 'view' | 'collectionModal'
  hideRessourceLabelOnSmallDevices?: boolean
}) => {
  const withButtons = context === 'card' || context === 'view'
  return (
    <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-my-2v">
      <div className="fr-flex fr-flex-gap-2v fr-text--sm fr-mb-0">
        <span className="fr-icon-file-text-line fr-icon--sm" />
        <b>{count}</b>
        <span
          className={
            hideRessourceLabelOnSmallDevices ? 'fr-hidden fr-unhidden-sm' : ''
          }
        >
          Ressource{sPluriel(count)}
        </span>
        <span>•</span>
        <PrivacyTag
          isPublic={collection.isPublic}
          small
          label={collection.isPublic ? 'Publique' : 'Privée'}
        />
      </div>
      {withButtons && (
        <div className="fr-flex fr-flex-gap-2v">
          {canWrite && (
            <Link
              href={`./${collection.slug}/modifier`}
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
            priority={context === 'view' ? 'tertiary' : 'tertiary no outline'}
            user={user}
            collection={collection}
            context={context}
          />
          <CopyLinkButton
            size="small"
            className="fr-hidden fr-unhidden-md"
            priority={context === 'view' ? 'tertiary' : 'tertiary no outline'}
            url={getServerUrl(`/collections/${collection.slug}`, {
              absolutePath: true,
            })}
          />
        </div>
      )}
    </div>
  )
}

export default CollectionMetaData
