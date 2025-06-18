import { metadataTitle } from '@app/web/app/metadataTitle'
import SearchFilters, {
  type FiltersInitialValue,
} from '@app/web/components/Search/Filters/SearchFilters'
import SearchMenu from '@app/web/components/Search/SearchMenu'
import { searchParamsFromSegment } from '@app/web/server/search/searchQueryParams'
import {
  resourceTypesLabels,
  resourceTypesOptions,
} from '@app/web/themes/resourceTypes'
import {
  categoryTargetAudiencesOptions,
  targetAudienceLabels,
} from '@app/web/themes/targetAudiences'
import { categoryThemesOptions, themeLabels } from '@app/web/themes/themes'
import type { Metadata } from 'next'
import React, { type PropsWithChildren } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Rechercher des ressources'),
}
const ResourcesSearchLayout = async ({
  params,
  children,
}: PropsWithChildren<{
  params: Promise<{
    searchSegment: string
  }>
}>) => {
  const { searchSegment } = await params

  const searchExecutionParams = searchParamsFromSegment(searchSegment)

  const initialFilterValues = [
    ...searchExecutionParams.themes.map(
      (theme) =>
        ({
          category: 'themes',
          option: {
            value: theme,
            label: themeLabels[theme],
          },
        }) satisfies FiltersInitialValue,
    ),
    ...searchExecutionParams.resourceTypes.map(
      (resourceType) =>
        ({
          category: 'resourceTypes',
          option: {
            value: resourceType,
            label: resourceTypesLabels[resourceType],
          },
        }) satisfies FiltersInitialValue,
    ),
    ...searchExecutionParams.targetAudiences.map(
      (targetAudience) =>
        ({
          category: 'targetAudiences',
          option: {
            value: targetAudience,
            label: targetAudienceLabels[targetAudience],
          },
        }) satisfies FiltersInitialValue,
    ),
  ]

  return (
    <>
      <SearchMenu activeTab="ressources" searchParams={searchExecutionParams} />
      <div className="fr-container fr-container--medium fr-mb-30v">
        <SearchFilters
          label="Affiner la recherche"
          tab="ressources"
          searchParams={searchExecutionParams}
          initialValues={initialFilterValues}
          categories={[
            {
              multiple: true,
              id: 'themes',
              label: 'Thématique',
              options: categoryThemesOptions,
            },
            {
              multiple: false,
              id: 'resourceTypes',
              label: 'Type de ressources',
              options: resourceTypesOptions,
            },
            {
              multiple: true,
              id: 'targetAudiences',
              label: 'Public cible',
              options: categoryTargetAudiencesOptions,
            },
          ]}
        />
        {children}
      </div>
    </>
  )
}

export default ResourcesSearchLayout
