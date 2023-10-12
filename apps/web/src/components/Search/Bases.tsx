import React from 'react'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import {
  departmentsOptions,
  getDepartmentName,
} from '@app/web/utils/departments'
import { sPluriel } from '@app/web/utils/sPluriel'
import { SearchParams } from '@app/web/server/search/searchQueryParams'
import BaseCard from '../Base/Card/Card'
import EmptyBox from '../EmptyBox'
import Filters from './Filters/Filters'
import styles from './Content.module.css'

const Bases = ({
  bases,
  totalCount,
  searchParams,
}: {
  bases: BaseListItem[]
  totalCount: number

  searchParams: SearchParams
}) => (
  <div>
    {(bases.length > 0 || searchParams.departements.length > 0) && (
      <Filters
        initialValues={searchParams.departements.map((departementCode) => ({
          category: 'departements',
          option: {
            value: departementCode,
            name: getDepartmentName(departementCode),
          },
        }))}
        className="fr-mb-6w"
        label="Affiner la recherche"
        searchParams={searchParams}
        tab="bases"
        categories={[
          {
            multiple: false,
            id: 'departements',
            label: 'Département',
            options: departmentsOptions,
          },
        ]}
      />
    )}
    <div className={styles.header}>
      <p className="fr-text--lg fr-mb-0">
        <b>
          {totalCount} Base{sPluriel(totalCount)}
        </b>
      </p>
      <div className={styles.select}>
        Trier par :
        <select>
          <option>Les plus pertinentes</option>
        </select>
      </div>
    </div>
    {bases.length > 0 ? (
      bases.map((base) => <BaseCard key={base.slug} base={base} />)
    ) : (
      <EmptyBox title="Aucun résultat pour votre recherche">
        Veuillez réessayer avec différents mots-clés.
      </EmptyBox>
    )}
  </div>
)

export default Bases
