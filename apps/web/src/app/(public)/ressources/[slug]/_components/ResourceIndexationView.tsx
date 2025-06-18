import type { Resource } from '@app/web/server/resources/getResource'
import {
  type SearchParams,
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import { resourceTypesLabels } from '@app/web/themes/resourceTypes'
import { targetAudienceLabels } from '@app/web/themes/targetAudiences'
import { themeLabels } from '@app/web/themes/themes'
import Tag from '@codegouvfr/react-dsfr/Tag'
import classNames from 'classnames'
import React, { useMemo } from 'react'
import styles from './ResourceIndexationView.module.css'

const getThemes = (resource: Resource) => ({
  title: 'Thématiques',
  description:
    'Quelles sont les principales thématiques abordées par la ressource ?',
  tags: resource.themes.map((theme) => ({
    slug: theme,
    label: themeLabels[theme],
  })),
  slug: 'themes' as const,
})

const getResourceTypes = (resource: Resource) => ({
  title: 'Type de ressource',
  description: 'Type de ressource (article, fiche, guide...).',
  tags: resource.resourceTypes.map((resourceType) => ({
    slug: resourceType,
    label: resourceTypesLabels[resourceType],
  })),
  slug: 'resourceTypes' as const,
})

const getTargetAudiences = (resource: Resource) => ({
  title: 'Publics cibles',
  description: 'Quel est le public visé par la ressource ?',
  tags: resource.targetAudiences.map((targetAudience) => ({
    slug: targetAudience,
    label: targetAudienceLabels[targetAudience],
  })),
  slug: 'targetAudiences' as const,
})

const ResourceIndexationView = ({
  resource,
  withDescription,
  withLink,
  themes,
  targetAudiences,
  resourceTypes,
  titleClassName,
  tagsClassName,
}: {
  resource: Resource
  withDescription?: boolean
  withLink?: boolean
  themes?: boolean
  resourceTypes?: boolean
  targetAudiences?: boolean
  titleClassName?: string
  tagsClassName?: string
}) => {
  const resourceInfo = useMemo(
    () => [
      ...(themes ? [getThemes(resource)] : []),
      ...(resourceTypes ? [getResourceTypes(resource)] : []),
      ...(targetAudiences ? [getTargetAudiences(resource)] : []),
    ],
    [resource, resourceTypes, targetAudiences, themes],
  )

  return resourceInfo.map(({ title, description, tags, slug }, index) => (
    <div key={title}>
      <div className={index === 0 ? '' : 'fr-mt-3w'}>
        <span className={titleClassName}>{title}</span>
        {withDescription && (
          <div className="fr-text--xs fr-hint-text fr-mt-1v fr-mb-0">
            {description}
          </div>
        )}
      </div>
      <div className={classNames(styles.tags, tagsClassName)}>
        {tags.length > 0 ? (
          <>
            {withLink
              ? tags.map((tag) => {
                  const searchParams: SearchParams = { ...defaultSearchParams }
                  searchParams[slug as 'themes'] = [
                    tag.slug,
                  ] as (typeof searchParams)['themes']

                  return (
                    <Tag
                      key={tag.slug}
                      data-testid={`resource-indexation-${slug}-${tag.slug}`}
                      linkProps={{
                        href: searchUrl('ressources', searchParams),
                      }}
                      small
                      className={styles.tag}
                    >
                      {tag.label}
                    </Tag>
                  )
                })
              : tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className={classNames('fr-tag', 'fr-tag--sm', styles.tag)}
                  >
                    {tag.label}
                  </span>
                ))}
          </>
        ) : (
          <div className={classNames('fr-tag', 'fr-tag--sm', styles.tag)}>
            Non renseigné
          </div>
        )}
      </div>
    </div>
  ))
}

export default ResourceIndexationView
