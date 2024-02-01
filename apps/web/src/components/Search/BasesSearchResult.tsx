import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import {
  PaginationParams,
  SearchParams,
} from '@app/web/server/search/searchQueryParams'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResultSortingSelect from '@app/web/components/Search/ResultSortingSelect'
import BaseCard from '../Base/Card/BaseCard'
import EmptyBox from '../EmptyBox'
import styles from './SearchContents.module.css'

const BasesSearchResult = ({
  bases,
  totalCount,
  searchParams,
  paginationParams,
  user,
}: {
  bases: BaseListItem[]
  totalCount: number
  searchParams: SearchParams
  paginationParams: PaginationParams
  user: SessionUser | null
}) => (
  <>
    <div className={styles.header}>
      <p className="fr-text--lg fr-mb-0">
        <b>
          {totalCount} Base{sPluriel(totalCount)}
        </b>
      </p>
      <ResultSortingSelect
        paginationParams={paginationParams}
        searchParams={searchParams}
        tab="bases"
      />
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
