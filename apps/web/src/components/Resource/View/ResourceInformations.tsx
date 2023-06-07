import React from 'react'
import { Tag } from '@codegouvfr/react-dsfr/Tag'
import classNames from 'classnames'
import styles from './ResourceInformations.module.css'

// TODO pass resource in props and construct this object from it
const resourceInfo = [
  {
    title: 'Thématiques',
    tags: [
      'Insertion professionnelle',
      'Communication en ligne / réseaux sociaux',
      'Insertion professionnelle 2',
    ],
  },
  {
    title: 'Type de support',
    tags: ['Support pédagogique', 'Logiciel / Application'],
  },
  {
    title: 'Publics cibles',
    tags: ['Public cible 1', 'Public cible 2'],
  },
]

const ResourceInformations = () => (
  <>
    <h6 id="informations" className={styles.title}>
      Informations sur la resource
    </h6>
    {resourceInfo.map(({ title, tags }, index) => (
      <>
        <p
          key={title}
          className={classNames(
            'fr-text--sm fr-text--medium fr-mb-1w',
            index === 0 ? 'fr-mt-4v' : 'fr-mt-6v',
          )}
        >
          {title}
        </p>
        <div key={`${title}_tags`} className={styles.tags}>
          {tags.map((tag) => (
            <Tag
              key={tag}
              linkProps={{ href: '/rechercher' }}
              small
              className={classNames(styles.tag)}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </>
    ))}
  </>
)

export default ResourceInformations
