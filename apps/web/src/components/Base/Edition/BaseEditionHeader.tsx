import type { BasePageData } from '@app/web/server/bases/getBase'
import React from 'react'
import Breadcrumbs from '../../Breadcrumbs'
import BaseImages from '../BaseImages'
import styles from './BaseEditionHeader.module.css'

const headerId = 'header'
export const headerSkipLink = { label: 'Entête', anchor: `#${headerId}` }

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
    <div id={headerId}>
      <BaseImages base={base} editMode />
      <div className={styles.baseInfo}>
        <h1 className="fr-mb-0 fr-h2 fr-text-label--blue-france">
          {base.title}
        </h1>
      </div>
    </div>
  </div>
)

export default BaseEditionHeader
