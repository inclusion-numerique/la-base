import React from 'react'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import BaseCard from '../Card/Card'
import { CreateBaseButton } from '../CreateBaseButton'
import styles from './Bases.module.css'

const Bases = ({ bases }: { bases: BaseListItem[] }) => (
  <div className={styles.container} data-testid="base-resources">
    <div className={styles.header}>
      <h3 className="fr-mb-0">Bases · {bases.length}</h3>
      <CreateBaseButton className="fr-btn--secondary" />
    </div>
    {bases.map((base) => (
      <BaseCard base={base} key={base.slug} />
    ))}
  </div>
)

export default Bases
