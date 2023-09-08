import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
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
        <ViewsAndMetadata base={base} withBadge />
        {isMember && (
          <Button
            className="fr-mt-2w"
            priority="secondary"
            iconId="fr-icon-edit-line"
          >
            Modifier la base
          </Button>
        )}
      </div>
    </div>
  </div>
)

export default Header
