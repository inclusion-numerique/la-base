import React from 'react'
import { BasePageData } from '@app/web/server/bases/getBase'
import Breadcrumbs from '../../Breadcrumbs'
import styles from './Header.module.css'

const Header = ({ base }: { base: BasePageData }) => (
  <div className="fr-container">
    <Breadcrumbs
      parents={[
        {
          label: base.title,
          linkProps: {
            href: `/bases/${base.slug}`,
          },
        },
      ]}
      currentPage="Modifier la base"
    />
    <div className={styles.banner} />
    <div className={styles.logo} />
    <div className={styles.baseInfo}>
      <h2>{base.title}</h2>
    </div>
  </div>
)

export default Header
