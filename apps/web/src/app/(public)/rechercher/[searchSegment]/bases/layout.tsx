import SearchFilters, {
  FiltersInitialValue,
} from '@app/ui/components/Form/Filters/SearchFilters'
import SearchMenu from '@app/web/components/Search/SearchMenu'
import { searchParamsFromSegment } from '@app/web/server/search/searchQueryParams'
import {
  departmentsOptions,
  getDepartmentName,
} from '@app/web/utils/departments'
import React, { type PropsWithChildren } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BasesSearchLayout = async ({
  params,
  children,
}: PropsWithChildren<{
  params: Promise<{
    searchSegment: string
  }>
}>) => {
  const { searchSegment } = await params
  const searchParams = searchParamsFromSegment(searchSegment)

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
