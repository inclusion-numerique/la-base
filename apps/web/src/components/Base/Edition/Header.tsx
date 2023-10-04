import React from 'react'
import { BasePageData } from '@app/web/server/bases/getBase'
import Breadcrumbs from '../../Breadcrumbs'
import styles from './Header.module.css'

const Header = ({ base }: { base: BasePageData }) => (
  <div className="fr-container">
    <div className="fr-mb-6w">
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
    </div>
    <div className={styles.banner} />
    <div className={styles.logo} />
    <div className={styles.baseInfo}>
      <h2 className="fr-mb-0">{base.title}</h2>
    </div>
  </div>
)

export default Header
