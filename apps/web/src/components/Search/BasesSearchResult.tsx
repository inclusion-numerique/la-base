import React, { ReactNode } from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import { numberToString } from '@app/web/utils/formatNumber'
import BaseCard from '../Base/Card/BaseCard'
import EmptyBox from '../EmptyBox'
import styles from './SearchContents.module.css'

const BasesSearchResult = ({
  totalCount,
  bases,
  user,
  children,
}: {
  totalCount: number
  bases: BaseListItem[]
  user: SessionUser | null
  children: ReactNode
}) => (
  <>
    <div className={styles.header}>
      <h1 className="fr-text--lg fr-mb-0">
        {numberToString(totalCount)} Base{sPluriel(totalCount)}
      </h1>
      {children}
    </div>
    {bases.length > 0 ? (
      bases.map((base) => <BaseCard key={base.slug} user={user} base={base} />)
    ) : (
      <EmptyBox
        className="fr-mt-6v"
        title="Aucun résultat pour votre recherche"
      >
        Veuillez réessayer avec différents mots-clés.
      </EmptyBox>
    )}
  </>
)

export default BasesSearchResult
