import React from 'react'
import { Tag } from '@codegouvfr/react-dsfr/Tag'
import classNames from 'classnames'
import { Resource } from '@app/web/server/resources/getResource'
import styles from './ResourceInformations.module.css'

const ResourceInformations = ({
  resource: { thematics, publics, supportTypes },
}: {
  resource: Resource
}) => {
  const resourceInfo = [
    {
      title: 'Thématiques',
      tags: thematics,
    },
    {
      title: 'Type de support',
      tags: supportTypes,
    },
    {
      title: 'Publics cibles',
      tags: publics,
    },
  ]
  return (
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
}

export default ResourceInformations
