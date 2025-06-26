import type { Resource } from '@app/web/server/resources/getResource'
import {
  type SearchParams,
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import { beneficiariesLabels } from '@app/web/themes/beneficiairies'
import { professionalSectorsLabels } from '@app/web/themes/professionalSectors'
import { resourceTypesLabels } from '@app/web/themes/resourceTypes'
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

const getBeneficiaries = (resource: Resource) => ({
  title: 'Bénéficiaires',
  description: 'Quel sont les bénéficiares visés par la ressource ?',
  tags: resource.beneficiaries.map((beneficiary) => ({
    slug: beneficiary,
    label: beneficiariesLabels[beneficiary],
  })),
  slug: 'beneficiaries' as const,
})

const getProfessionalSectors = (resource: Resource) => ({
  title: 'Secteurs professionnels',
  description: 'Quel sont les secteurs professionnels visés par la ressource ?',
  tags: resource.professionalSectors.map((professionalSector) => ({
    slug: professionalSector,
    label: professionalSectorsLabels[professionalSector],
  })),
  slug: 'professionalSectors' as const,
})

const ResourceIndexationView = ({
  resource,
  withDescription,
  withLink,
  themes,
  beneficiaries,
  professionalSectors,
  resourceTypes,
  titleClassName,
  tagsClassName,
}: {
  resource: Resource
  withDescription?: boolean
  withLink?: boolean
  themes?: boolean
  resourceTypes?: boolean
  beneficiaries?: boolean
  professionalSectors?: boolean
  titleClassName?: string
  tagsClassName?: string
}) => {
  const resourceInfo = useMemo(
    () => [
      ...(themes ? [getThemes(resource)] : []),
      ...(resourceTypes ? [getResourceTypes(resource)] : []),
      ...(beneficiaries ? [getBeneficiaries(resource)] : []),
      ...(professionalSectors ? [getProfessionalSectors(resource)] : []),
    ],
    [resource, resourceTypes, beneficiaries, professionalSectors, themes],
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
