import React from 'react'
import Link from 'next/link'
import { BasePageData } from '@app/web/server/bases/getBase'
import Breadcrumbs from '../Breadcrumbs'
import styles from './Header.module.css'
import ViewsAndMetadata from './ViewsAndMetadata'

const Header = ({
  base,
  isMember,
}: {
  base: BasePageData
  isMember: boolean
}) => (
  <div className={styles.container}>
    <div className="fr-container">
      <Breadcrumbs currentPage={base.title} />
      <div className={styles.banner} />
      <div className={styles.logo} />
      <div className={styles.baseInfo}>
        <h2>{base.title}</h2>
        <ViewsAndMetadata base={base} />
        {isMember && (
          <Link
            className="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-edit-line fr-mt-2w"
            href={`/bases/${base.slug}/editer`}
          >
            Modifier la base
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Header
