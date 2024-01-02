import React from 'react'
import Link from 'next/link'
import { FilteredBase } from '@app/web/server/bases/authorization'
import { BasePageData } from '@app/web/server/bases/getBase'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { SessionUser } from '@app/web/auth/sessionUser'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import Breadcrumbs from '../Breadcrumbs'
import CopyLinkButton from '../CopyLinkButton'
import BaseMetadata from './BaseMetadata'
import styles from './BaseHeader.module.css'
import BaseImages from './BaseImages'

const BaseHeader = ({
  base,
  isMember,
  user,
}: {
  base: FilteredBase | BasePageData
  isMember?: boolean
  user: SessionUser | null
}) => (
  <div className={styles.container}>
    <div className="fr-container">
      <Breadcrumbs currentPage={base.title} />
      <BaseImages base={base} />
      <div className={styles.baseInfo}>
        <h2>{base.title}</h2>
        <BaseMetadata base={base} withBadge />
        {isMember ? (
          <Link
            data-testid="base-edition-button"
            className="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-edit-line fr-mt-2w"
            href={`/bases/${base.slug}/editer`}
          >
            Modifier la base
          </Link>
        ) : (
          <div className={styles.buttons}>
            <FollowButton user={user} base={base} />
            {base.email && (
              <Link
                className="fr-btn--sm fr-btn fr-btn--secondary fr-icon-mail-line fr-btn--icon-left"
                href={`mailto:${base.email}`}
              >
                Contacter
              </Link>
            )}
            <CopyLinkButton
              url={getServerUrl(`/bases/${base.slug}`, true)}
              priority="secondary"
            >
              Partager
            </CopyLinkButton>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default BaseHeader
