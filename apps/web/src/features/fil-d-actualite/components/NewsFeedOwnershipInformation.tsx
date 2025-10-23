import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import BaseImage from '@app/web/components/BaseImage'
import IconInSquare from '@app/web/components/IconInSquare'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import {
  NewsFeedBases,
  NewsFeedPageContext,
  NewsFeedProfiles,
  NewsFeedResource,
} from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
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

const formatTimeAgo = (mostRecentDate: Date): string => {
  const now = new Date()
  const diffInMs = now.getTime() - mostRecentDate.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInMonths = Math.floor(diffInDays / 30)

  if (diffInMinutes < 60) {
    if (diffInMinutes > 0) {
      return `il y a ${diffInMinutes} minute${sPluriel(diffInMinutes)}`
    } else {
      return `à l'instant`
    }
  } else if (diffInHours < 24) {
    return `il y a ${diffInHours} heure${sPluriel(diffInHours)}`
  } else if (diffInDays <= 30) {
    return `il y a ${diffInDays} jour${sPluriel(diffInDays)}`
  } else {
    return `il y a ${diffInMonths} mois`
  }
}

const ACTION_TEXTS = {
  profile: {
    updated: 'mis à jour sa resource',
    published: 'publié sa ressource',
  },
  resource: { updated: 'mise à jour', published: 'publiée' },
  baseResource: {
    updated: 'mis à jour sa ressource',
    published: 'publié une ressource',
  },
} as const

const getActionText = (
  isUpdated: boolean,
  context: keyof typeof ACTION_TEXTS,
) => ACTION_TEXTS[context][isUpdated ? 'updated' : 'published']

const newsFeedAttributionConfig = {
  base: {
    getText: (
      resource: NewsFeedResource,
      timeAgo: string,
      isUpdated: boolean,
    ) =>
      resource.base && (
        <>
          <Link
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
            href={`/bases/${resource.base.slug}`}
          >
            {resource.base.title}
          </Link>
          &nbsp;a {getActionText(isUpdated, 'baseResource')} {timeAgo}
        </>
      ),
    getImage: (resource: NewsFeedResource) =>
      resource.base && <BaseImage base={resource.base} />,
  },
  theme: {
    getText: (
      resource: NewsFeedResource,
      timeAgo: string,
      isUpdated: boolean,
      userNewsFeed?: NewsFeed,
    ) => {
      const resourceThemes = resource.themes || []
      const userPreferredThemes = userNewsFeed?.themes || []
      const matchingTheme = resourceThemes.find((theme) =>
        userPreferredThemes.includes(theme),
      )

      return (
        <>
          Ressource {getActionText(isUpdated, 'resource')} dans la
          thématique&nbsp;
          <Link
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
            href={createThemeUrl(matchingTheme as Theme)}
          >
            {themeLabels[matchingTheme as Theme]}
          </Link>
          &nbsp;{timeAgo}
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
    getText: (
      resource: NewsFeedResource,
      timeAgo: string,
      isUpdated: boolean,
    ) =>
      resource.createdBy.name && (
        <>
          <Link
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
            href={`/profils/${resource.createdBy.slug}`}
          >
            {formatName(resource.createdBy.name)}
          </Link>
          &nbsp;a {getActionText(isUpdated, 'profile')} {timeAgo}
        </>
      ),
    getImage: (resource: NewsFeedResource) => (
      <RoundProfileImage user={resource.createdBy} />
    ),
  },
  professional_sector: {
    getText: (
      resource: NewsFeedResource,
      timeAgo: string,
      isUpdated: boolean,
      userNewsFeed?: NewsFeed,
    ) => {
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
          &nbsp;{getActionText(isUpdated, 'resource')} {timeAgo}
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

const determineAttribution = (
  resource: NewsFeedResource,
  userNewsFeed: NewsFeed,
  followedBases: NewsFeedBases,
  followedProfiles: NewsFeedProfiles,
) => {
  // 1. Base priority - check if user follows any base containing this resource
  if (resource.base) {
    const resourceBase = resource.base
    if (followedBases.find(({ base }) => base.id === resourceBase.id)) {
      return 'base'
    }
  }

  // 2. Profile priority - check if user follows the resource creator
  if (
    followedProfiles.find(({ profile }) => profile.id === resource.createdBy.id)
  ) {
    return 'profile'
  }

  // 3. Theme priority - check if user follows any theme of this resource
  const resourceThemes = resource.themes || []
  const userPreferredThemes = userNewsFeed.themes || []
  const hasMatchingTheme = resourceThemes.some((theme) =>
    userPreferredThemes.includes(theme),
  )
  if (hasMatchingTheme) {
    return 'theme'
  }

  // 4. Professional sector priority - check if user follows any sector of this resource
  const resourceProfessionalSectors = resource.professionalSectors || []
  const userPreferredProfessionalSectors =
    userNewsFeed.professionalSectors || []
  const hasMatchingSector = resourceProfessionalSectors.some((sector) =>
    userPreferredProfessionalSectors.includes(sector),
  )
  if (hasMatchingSector) {
    return 'professional_sector'
  }

  // 5. Fallback to base if available, otherwise profile
  return resource.base !== null ? 'base' : 'profile'
}

export const NewsFeedOwnershipInformation = ({
  resource,
  newsFeedPageContext,
}: {
  resource: NewsFeedResource
  newsFeedPageContext: NewsFeedPageContext
}) => {
  const { userNewsFeed, followedBases, followedProfiles } = newsFeedPageContext
  const attributionType = determineAttribution(
    resource,
    userNewsFeed,
    followedBases,
    followedProfiles,
  )
  const config = newsFeedAttributionConfig[attributionType]
  // We can cast, since we have a "published is not null" condition in the query
  const published = resource.published as Date
  const mostRecentDate =
    resource.lastPublished && resource.lastPublished > published
      ? resource.lastPublished
      : published
  const isUpdated =
    resource.lastPublished !== null && resource.lastPublished > published
  const timeAgo = formatTimeAgo(mostRecentDate)
  const attributionText = config.getText(
    resource,
    timeAgo,
    isUpdated,
    userNewsFeed,
  )
  const image = config.getImage(resource, userNewsFeed)
  const { seen } = resource

  return (
    <div className="fr-flex fr-align-items-center fr-flex-gap-2v fr-mr-2w">
      {image}
      <span className={classNames('fr-text--xs fr-mb-0', styles.title)}>
        {attributionText}
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
