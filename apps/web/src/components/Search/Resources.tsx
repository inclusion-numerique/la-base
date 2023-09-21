import React from 'react'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResourceCard from '../Resource/Card'
import Filters from '../Filters'
import EmptyBox from '../EmptyBox'
import styles from './Content.module.css'

const Resources = ({
  resources,
  user,
}: {
  resources: ResourceListItem[]
  user: SessionUser | null
}) => (
  <div className={styles.container}>
    {resources.length > 0 && (
      <Filters
        className="fr-mb-6w"
        label="Affiner la recherche"
        categories={[
          {
            id: 'thematics',
            label: 'Thématique',
            options: [
              {
                value: '1',
                name: 'Thématique 1',
              },
              {
                value: '2',
                name: 'Thématique 2',
              },
              {
                value: '3',
                name: 'Thématique 3',
              },
            ],
          },
          {
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
        <b>{resources.length} Ressources</b>
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
