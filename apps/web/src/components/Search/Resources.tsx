import React from 'react'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import { categoryThemesOptions, themeLabels } from '@app/web/themes/themes'
import { sPluriel } from '@app/web/utils/sPluriel'
import { SearchParams } from '@app/web/server/search/searchQueryParams'
import {
  supportTypeLabels,
  supportTypeOptions,
} from '@app/web/themes/supportTypes'
import {
  targetAudienceLabels,
  targetAudienceOptions,
} from '@app/web/themes/targetAudiences'
import ResourceCard from '../Resource/Card'
import EmptyBox from '../EmptyBox'
import Filters, { FiltersInitialValue } from './Filters/Filters'
import styles from './Content.module.css'

const Resources = ({
  totalCount,
  resources,
  user,
  searchParams,
}: {
  totalCount: number
  resources: ResourceListItem[]
  user: SessionUser | null
  searchParams: SearchParams
}) => {
  const initialValues = [
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

  const hasFilters =
    searchParams.themes.length > 0 ||
    searchParams.supportTypes.length > 0 ||
    searchParams.targetAudiences.length > 0

  return (
    <div>
      {(resources.length > 0 || hasFilters) && (
        <Filters
          className="fr-mb-6w"
          label="Affiner la recherche"
          tab="ressources"
          searchParams={searchParams}
          initialValues={initialValues}
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
              multiple: false,
              id: 'targetAudiences',
              label: 'Public cible',
              options: targetAudienceOptions,
            },
          ]}
        />
      )}
      <div className={styles.header}>
        <p className="fr-text--lg fr-mb-0">
          <b>
            {totalCount} Ressource{sPluriel(totalCount)}
          </b>
        </p>
        <div className={styles.select}>
          Trier par :
          <select>
            <option>Les plus pertinentes</option>
          </select>
        </div>
      </div>
      {resources.length > 0 ? (
        resources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} user={user} />
        ))
      ) : (
        <EmptyBox title="Aucun résultat pour votre recherche">
          Veuillez réessayer avec différents mots-clés.
        </EmptyBox>
      )}
    </div>
  )
}

export default Resources
