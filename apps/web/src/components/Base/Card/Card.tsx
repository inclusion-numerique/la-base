import React from 'react'
import Link from 'next/link'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import ViewsAndMetadata from '../ViewsAndMetadata'
import styles from './Card.module.css'

const BaseCard = ({ base }: { base: BaseListItem }) => (
  <Link
    href={`/bases/${base.slug}`}
    className={styles.container}
    data-testid="base-card"
  >
    <div className={styles.logo} />
    <div>
      <h6 className="fr-mb-0"> {base.title}</h6>
      <ViewsAndMetadata base={base} />
    </div>
  </Link>
)

export default BaseCard
