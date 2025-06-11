import { metadataTitle } from '@app/web/app/metadataTitle'
import SearchFilters, {
  type FiltersInitialValue,
} from '@app/web/components/Search/Filters/SearchFilters'
import SearchMenu from '@app/web/components/Search/SearchMenu'
import { searchParamsFromSegment } from '@app/web/server/search/searchQueryParams'
import {
  supportTypeLabels,
  supportTypeOptions,
} from '@app/web/themes/supportTypes'
import {
  categoryTargetAudiencesOptions,
  targetAudienceLabels,
} from '@app/web/themes/targetAudiences'
import {
  categoryThemesOptions,
  themeCategories,
  themeLabels,
} from '@app/web/themes/themes'
import Button from '@codegouvfr/react-dsfr/Button'
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
            extra: {
              category: themeCategories[theme],
            },
          },
        } satisfies FiltersInitialValue),
    ),
    ...searchExecutionParams.supportTypes.map(
      (supportType) =>
        ({
          category: 'supportTypes',
          option: {
            value: supportType,
            label: supportTypeLabels[supportType],
          },
        } satisfies FiltersInitialValue),
    ),
    ...searchExecutionParams.targetAudiences.map(
      (targetAudience) =>
        ({
          category: 'targetAudiences',
          option: {
            value: targetAudience,
            label: targetAudienceLabels[targetAudience],
          },
        } satisfies FiltersInitialValue),
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
