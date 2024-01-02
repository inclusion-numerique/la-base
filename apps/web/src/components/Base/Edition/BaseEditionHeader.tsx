import React from 'react'
import { BasePageData } from '@app/web/server/bases/getBase'
import Breadcrumbs from '../../Breadcrumbs'
import BaseImages from '../BaseImages'
import styles from './BaseEditionHeader.module.css'

const BaseEditionHeader = ({ base }: { base: BasePageData }) => (
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
    <BaseImages base={base} editMode />
    <div className={styles.baseInfo}>
      <h2 className="fr-mb-0">{base.title}</h2>
    </div>
  </div>
)

export default BaseEditionHeader
