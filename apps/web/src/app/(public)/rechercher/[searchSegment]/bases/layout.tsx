import React, { PropsWithChildren } from 'react'
import { searchParamsFromSegment } from '@app/web/server/search/searchQueryParams'
import SearchMenu from '@app/web/components/Search/SearchMenu'
import SearchFilters, {
  type FiltersInitialValue,
} from '@app/web/components/Search/Filters/SearchFilters'
import {
  departmentsOptions,
  getDepartmentName,
} from '@app/web/utils/departments'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BasesSearchLayout = ({
  children,
  params,
}: PropsWithChildren<{
  params: {
    searchSegment: string
  }
}>) => {
  const searchParams = searchParamsFromSegment(params.searchSegment)

  const initialValues = searchParams.departements.map(
    (departementCode): FiltersInitialValue => ({
      category: 'departements',
      option: {
        value: departementCode,
        label: getDepartmentName(departementCode),
      },
    }),
  )

  return (
    <>
      <SearchMenu activeTab="bases" searchParams={searchParams} />
      <div className="fr-container fr-container--medium fr-mb-30v">
        <SearchFilters
          initialValues={initialValues}
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
        {children}
      </div>
    </>
  )
}

export default BasesSearchLayout
