import React from 'react'
import { Theme } from '@prisma/client'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import { categoryThemesOptions, themeLabels } from '@app/web/themes/themes'
import ResourceCard from '../Resource/Card'
import EmptyBox from '../EmptyBox'
import Filters from './Filters/Filters'
import styles from './Content.module.css'

const Resources = ({
  totalCount,
  resources,
  user,
  basePath,
  query,
  themes,
}: {
  totalCount: number
  resources: ResourceListItem[]
  user: SessionUser | null
  basePath: string
  query?: string
  themes?: Theme[]
}) => (
  //  Todo Plural

  <div className={styles.container}>
    {resources.length > 0 && (
      <Filters
        className="fr-mb-6w"
        label="Affiner la recherche"
        basePath={basePath}
        query={query}
        initialValues={themes?.map((theme) => ({
          category: 'themes',
          option: {
            value: theme,
            name: themeLabels[theme],
          },
        }))}
        categories={[
          {
            multiple: true,
            id: 'themes',
            label: 'Thématique',
            options: categoryThemesOptions,
          },
          {
            multiple: false,
            id: 'supports',
            label: 'Type de support',
            options: [
              {
                value: '1',
                name: 'Support 1',
              },
              {
                value: '2',
                name: 'Support 2',
              },
              {
                value: '3',
                name: 'Support 3',
              },
            ],
          },
          {
            multiple: false,
            id: 'publics',
            label: 'Public cible',
            options: [
              {
                value: '1',
                name: 'Public 1',
              },
              {
                value: '2',
                name: 'Public 2',
              },
              {
                value: '3',
                name: 'Public 3',
              },
            ],
          },
        ]}
      />
    )}
    <div className={styles.header}>
      <p className="fr-text--lg fr-mb-0">
        <b>{totalCount} Ressources</b>
      </p>
      <div className={styles.select}>
        Trier par :
        <select>
          <option>Les plus récentes</option>
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

export default Resources
