import React, { useMemo } from 'react'
import classNames from 'classnames'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { Resource } from '@app/web/server/resources/getResource'
import { themeLabels } from '@app/web/themes/themes'
import { supportTypeLabels } from '@app/web/themes/supportTypes'
import { targetAudienceLabels } from '@app/web/themes/targetAudiences'
import {
  defaultSearchParams,
  SearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
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

const getSupportTypes = (resource: Resource) => ({
  title: 'Type de support',
  description: 'Type de support (article, fiche, guide...).',
  tags: resource.supportTypes.map((supportType) => ({
    slug: supportType,
    label: supportTypeLabels[supportType],
  })),
  slug: 'supportTypes' as const,
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
  supportTypes,
  titleClassName,
  tagsClassName,
}: {
  resource: Resource
  withDescription?: boolean
  withLink?: boolean
  themes?: boolean
  supportTypes?: boolean
  targetAudiences?: boolean
  titleClassName?: string
  tagsClassName?: string
}) => {
  const resourceInfo = useMemo(
    () => [
      ...(themes ? [getThemes(resource)] : []),
      ...(supportTypes ? [getSupportTypes(resource)] : []),
      ...(targetAudiences ? [getTargetAudiences(resource)] : []),
    ],
    [resource, supportTypes, targetAudiences, themes],
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
          // eslint-disable-next-line react/jsx-no-useless-fragment
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
