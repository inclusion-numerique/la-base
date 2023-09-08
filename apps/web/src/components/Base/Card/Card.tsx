import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { getDepartmentName } from '@app/web/utils/departments'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { BasePrivacyTag } from '@app/web/components/PrivacyTags'
import ViewsAndMetadata from '@app/web/components/Base/ViewsAndMetadata'
import IconLink from '@app/web/components/Icon/IconLink'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import styles from './Card.module.css'

const BaseCard = ({ base }: { base: BaseListItem }) => (
  <div className={styles.container} data-testid="base-card">
    <div className={styles.logo} />
    <div className={styles.content}>
      <Link href={`/bases/${base.slug}`}>
        <div className={styles.header}>
          {base.department && (
            <p className="fr-text--sm fr-mb-0">
              <span
                className={classNames(styles.icon, 'fr-icon-map-pin-2-line')}
              />
              {getDepartmentName(base.department)}
            </p>
          )}
          <div className={styles.badge}>
            <BasePrivacyTag isPublic={base.isPublic} />
          </div>
        </div>
        <h6 className="fr-my-2w">{base.title}</h6>
      </Link>
      <div className={styles.footer}>
        <ViewsAndMetadata base={base} />
        <div className={styles.icons}>
          <IconLink
            title="Mettre en favoris"
            href="/"
            icon="fr-icon-heart-line"
            small
          />
          <CopyLinkButton url={getServerUrl(`/bases/${base.slug}`, true)} />
        </div>
      </div>
    </div>
  </div>
)

export default BaseCard
