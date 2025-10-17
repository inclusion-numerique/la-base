import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import BaseImage from '@app/web/components/BaseImage'
import IconInSquare from '@app/web/components/IconInSquare'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { NewsFeedResource } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import {
  createSectorUrl,
  createThemeUrl,
} from '@app/web/server/newsFeed/newsFeedUrls'
import { formatName } from '@app/web/server/rpc/user/formatName'
import {
  professionalSectorsIcon,
  professionalSectorsLabels,
} from '@app/web/themes/professionalSectors'
import {
  CATEGORY_VARIANTS,
  themeCategories,
  themeLabels,
} from '@app/web/themes/themes'
import { RiIconClassName } from '@codegouvfr/react-dsfr'
import type { NewsFeed, ProfessionalSector, Theme } from '@prisma/client'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './NewsFeedOwnershipInformation.module.css'

const formatTimeAgo = (createdAt: Date): string => {
  const now = new Date()
  const diffInMs = now.getTime() - createdAt.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInMonths = Math.floor(diffInDays / 30)

  if (diffInMinutes < 60) {
    return `il y a ${diffInMinutes} minute${sPluriel(diffInMinutes)}`
  } else if (diffInHours < 24) {
    return `il y a ${diffInHours} heure${sPluriel(diffInHours)}`
  } else if (diffInDays <= 30) {
    return `il y a ${diffInDays} jour${sPluriel(diffInDays)}`
  } else {
    return `il y a ${diffInMonths} mois`
  }
}

const newsFeedAttributionConfig = {
  base: {
    getText: (resource: NewsFeedResource) =>
      resource.base && (
        <>
          <Link
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
            href={`/bases/${resource.base.slug}`}
          >
            {resource.base.title}
          </Link>
          &nbsp;a publié une ressource
        </>
      ),
    getImage: (resource: NewsFeedResource) =>
      resource.base && <BaseImage base={resource.base} />,
  },
  theme: {
    getText: (resource: NewsFeedResource, userNewsFeed?: NewsFeed) => {
      const resourceThemes = resource.themes || []
      const userPreferredThemes = userNewsFeed?.themes || []
      const matchingTheme = resourceThemes.find((theme) =>
        userPreferredThemes.includes(theme),
      )

      return (
        <>
          Ressource publiée dans la thématique&nbsp;
          <Link
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
            href={createThemeUrl(matchingTheme as Theme)}
          >
            {themeLabels[matchingTheme as Theme]}
          </Link>
        </>
      )
    },
    getImage: (resource: NewsFeedResource, userNewsFeed?: NewsFeed) => {
      const resourceThemes = resource.themes || []
      const userPreferredThemes = userNewsFeed?.themes || []

      // Find intersection - themes that exist in both arrays
      const matchingTheme = resourceThemes.find((theme) =>
        userPreferredThemes.includes(theme),
      )

      if (matchingTheme && themeCategories[matchingTheme]) {
        const category = themeCategories[matchingTheme]
        const categoryVariant = CATEGORY_VARIANTS[category]
        return (
          <IconInSquare
            iconId={categoryVariant.icon as RiIconClassName}
            background={categoryVariant.background}
            iconClassName={categoryVariant.color}
            size="small"
          />
        )
      }
    },
  },
  profile: {
    getText: (resource: NewsFeedResource) =>
      resource.createdBy.name && (
        <>
          <Link
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
            href={`/profils/${resource.createdBy.slug}`}
          >
            {formatName(resource.createdBy.name)}
          </Link>
          &nbsp;a publié une ressource
        </>
      ),
    getImage: (resource: NewsFeedResource) => (
      <RoundProfileImage user={resource.createdBy} />
    ),
  },
  professional_sector: {
    getText: (resource: NewsFeedResource, userNewsFeed?: NewsFeed) => {
      const resourceProfessionalSectors = resource.professionalSectors || []
      const userPreferredProfessionalSectors =
        userNewsFeed?.professionalSectors || []
      const matchingProfessionalSector = resourceProfessionalSectors.find(
        (sector) => userPreferredProfessionalSectors.includes(sector),
      )

      return (
        <>
          Ressource à destination des&nbsp;
          <Link
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
            href={createSectorUrl(
              matchingProfessionalSector as ProfessionalSector,
            )}
          >
            {
              professionalSectorsLabels[
                matchingProfessionalSector as ProfessionalSector
              ]
            }
          </Link>
          &nbsp;publiée
        </>
      )
    },
    getImage: (resource: NewsFeedResource, userNewsFeed?: NewsFeed) => {
      const resourceProfessionalSectors = resource.professionalSectors || []
      const userPreferredProfessionalSectors =
        userNewsFeed?.professionalSectors || []

      // Find intersection - professional sectors that exist in both arrays
      const matchingProfessionalSector = resourceProfessionalSectors.find(
        (sector) => userPreferredProfessionalSectors.includes(sector),
      )

      if (
        matchingProfessionalSector &&
        professionalSectorsIcon[matchingProfessionalSector]
      ) {
        const icon = professionalSectorsIcon[matchingProfessionalSector]
        return <IconInSquare iconId={icon as RiIconClassName} size="small" />
      }
    },
  },
} as const

export const NewsFeedOwnershipInformation = ({
  resource,
  userNewsFeed,
}: {
  resource: NewsFeedResource
  userNewsFeed: NewsFeed
}) => {
  const config =
    newsFeedAttributionConfig[resource.source] || newsFeedAttributionConfig.base
  const attributionText = config.getText(resource, userNewsFeed)
  const image = config.getImage(resource, userNewsFeed)
  const timeAgo = formatTimeAgo(resource.created)
  const { seen } = resource

  return (
    <div className="fr-flex fr-align-items-center fr-flex-gap-2v fr-mr-2w">
      {image}
      <span className={classNames('fr-text--xs fr-mb-0', styles.title)}>
        {attributionText} {timeAgo}
      </span>
      {!seen && (
        <p
          className={classNames(
            styles.badge,
            'fr-badge fr-badge--new fr-badge--sm',
          )}
        />
      )}
    </div>
  )
}
