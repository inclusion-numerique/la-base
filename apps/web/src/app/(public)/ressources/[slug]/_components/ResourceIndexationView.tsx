import ThematicOptionBadge from '@app/web/components/Search/Filters/ThematicOptionBadge'
import type { Resource } from '@app/web/server/resources/getResource'
import {
  defaultSearchParams,
  type SearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import { beneficiariesLabels } from '@app/web/themes/beneficiairies'
import { professionalSectorsLabels } from '@app/web/themes/professionalSectors'
import { resourceTypesLabels } from '@app/web/themes/resourceTypes'
import {
  CATEGORY_VARIANTS,
  CATEGORY_VARIANTS_TAG,
  type Category,
  themeCategories,
  themeLabels,
} from '@app/web/themes/themes'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { Theme } from '@prisma/client'
import classNames from 'classnames'
import { useMemo } from 'react'
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

  return resourceInfo.map(({ title, description, tags, slug }) => (
    <div key={title}>
      <p className={classNames(titleClassName, 'fr-mt-3w fr-mb-0')}>
        {title}
        {withDescription && (
          <span className="fr-text--xs fr-hint-text fr-mt-1v fr-mb-0">
            {description}
          </span>
        )}
      </p>
      <ul className={classNames('fr-raw-list', styles.tags, tagsClassName)}>
        {tags.length > 0 ? (
          <>
            {tags.map((tag) => {
              if (slug === 'themes') {
                const category = themeCategories[tag.slug as Theme] as Category
                const className = CATEGORY_VARIANTS_TAG[category].default
                const categoryIconClassName = classNames(
                  CATEGORY_VARIANTS[category].icon,
                  CATEGORY_VARIANTS[category].color,
                )

                if (withLink) {
                  const searchParams: SearchParams = {
                    ...defaultSearchParams,
                  }
                  searchParams.themes = [
                    tag.slug,
                  ] as (typeof searchParams)['themes']

                  return (
                    <li key={tag.slug}>
                      <a
                        href={searchUrl('ressources', searchParams)}
                        className="fr-link--no-underline"
                        data-testid={`resource-indexation-${slug}-${tag.slug}`}
                        aria-label={`Voir toutes les ressources ${tag.slug}`}
                      >
                        <ThematicOptionBadge
                          categoryIconClassName={categoryIconClassName}
                          textClassName="fr-text-label--grey"
                          className={className}
                          size="sm"
                          option={{ label: tag.label, disabled: false }}
                        />
                      </a>
                    </li>
                  )
                } else {
                  return (
                    <li key={tag.slug}>
                      <ThematicOptionBadge
                        categoryIconClassName={categoryIconClassName}
                        textClassName="fr-text-label--grey"
                        className={className}
                        size="sm"
                        option={{ label: tag.label, disabled: false }}
                        data-testid={`resource-indexation-${slug}-${tag.slug}`}
                      />
                    </li>
                  )
                }
              }

              if (withLink) {
                const searchParams: SearchParams = { ...defaultSearchParams }

                return (
                  <li key={tag.slug}>
                    <Tag
                      data-testid={`resource-indexation-${slug}-${tag.slug}`}
                      linkProps={{
                        href: searchUrl('ressources', searchParams),
                      }}
                      small
                      className={styles.tag}
                    >
                      {tag.label}
                    </Tag>
                  </li>
                )
              } else {
                return (
                  <li key={tag.slug}>
                    <span
                      className={classNames('fr-tag', 'fr-tag--sm', styles.tag)}
                    >
                      {tag.label}
                    </span>
                  </li>
                )
              }
            })}
          </>
        ) : (
          <li className={classNames('fr-tag', 'fr-tag--sm', styles.tag)}>
            Non renseigné
          </li>
        )}
      </ul>
    </div>
  ))
}

export default ResourceIndexationView
