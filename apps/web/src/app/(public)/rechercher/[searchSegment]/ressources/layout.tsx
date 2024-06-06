import React, { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { searchParamsFromSegment } from '@app/web/server/search/searchQueryParams'
import SearchMenu from '@app/web/components/Search/SearchMenu'
import { categoryThemesOptions, themeLabels } from '@app/web/themes/themes'
import {
  supportTypeLabels,
  supportTypeOptions,
} from '@app/web/themes/supportTypes'
import {
  categoryTargetAudiencesOptions,
  targetAudienceLabels,
} from '@app/web/themes/targetAudiences'
import SearchFilters, {
  FiltersInitialValue,
} from '@app/web/components/Search/Filters/SearchFilters'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Rechercher des ressources'),
}
const ResourcesSearchLayout = ({
  children,
  params,
}: PropsWithChildren<{
  params: {
    searchSegment: string
  }
}>) => {
  const searchParams = searchParamsFromSegment(params.searchSegment)

  const initialFilterValues = [
    ...searchParams.themes.map(
      (theme) =>
        ({
          category: 'themes',
          option: {
            value: theme,
            name: themeLabels[theme],
          },
        }) satisfies FiltersInitialValue,
    ),
    ...searchParams.supportTypes.map(
      (supportType) =>
        ({
          category: 'supportTypes',
          option: {
            value: supportType,
            name: supportTypeLabels[supportType],
          },
        }) satisfies FiltersInitialValue,
    ),
    ...searchParams.targetAudiences.map(
      (targetAudience) =>
        ({
          category: 'targetAudiences',
          option: {
            value: targetAudience,
            name: targetAudienceLabels[targetAudience],
          },
        }) satisfies FiltersInitialValue,
    ),
  ]

  return (
    <>
      <SearchMenu activeTab="ressources" searchParams={searchParams} />
      <div className="fr-container fr-container--medium fr-mb-30v">
        <SearchFilters
          label="Affiner la recherche"
          tab="ressources"
          searchParams={searchParams}
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
              id: 'supportTypes',
              label: 'Type de support',
              options: supportTypeOptions,
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
