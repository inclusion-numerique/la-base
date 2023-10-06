import React, { useMemo } from 'react'
import classNames from 'classnames'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { Resource } from '@app/web/server/resources/getResource'
import { themeLabels } from '@app/web/themes/themes'
import styles from './ResourceIndexation.module.css'

const ResourceIndexation = ({
  resource,
  withDescription,
  withLink,
}: {
  resource: Resource
  withDescription?: boolean
  withLink?: boolean
}) => {
  const resourceInfo = useMemo(
    () => [
      {
        title: 'Thématiques',
        description:
          'Quelles sont les principales thématiques abordées par la ressource ?',
        tags: resource.themes.map((theme) => themeLabels[theme]),
      },
      {
        title: 'Type de support',
        description: 'Type de support (article, fiche, guide...).',
        tags: resource.supportTypes,
      },
      {
        title: 'Publics cibles',
        description: 'Quel est le public visé par la ressource ?',
        tags: resource.targetAudiences,
      },
    ],
    [resource],
  )

  return resourceInfo.map(({ title, description, tags }, index) => (
    <div key={title}>
      <div className={index === 0 ? '' : 'fr-mt-3w'}>
        {title}
        {withDescription && (
          <div className="fr-text--xs fr-hint-text fr-mt-1v fr-mb-0">
            {description}
          </div>
        )}
      </div>
      {tags.length > 0 ? (
        <div className={styles.tags}>
          {withLink
            ? tags.map((tag) => (
                <Tag
                  key={tag}
                  data-testid={`resource-indexation-${title}-${tag}`}
                  linkProps={{ href: '/rechercher' }}
                  small
                  className={styles.tag}
                >
                  {tag}
                </Tag>
              ))
            : tags.map((tag) => (
                <span
                  key={tag}
                  className={classNames('fr-tag', 'fr-tag--sm', styles.tag)}
                >
                  {tag}
                </span>
              ))}
        </div>
      ) : (
        <div className={styles.empty}>Non renseigné</div>
      )}
    </div>
  ))
}

export default ResourceIndexation
