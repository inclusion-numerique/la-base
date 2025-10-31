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
  savedCollection: {
    getText: (
      resource: NewsFeedResource,
      timeAgo: string,
      isUpdated: boolean,
    ) => {
      const collectionResource = resource.collections?.find(
        (c) => c.collection.id === resource.collectionId,
      )
      if (!collectionResource) {
        return null
      }

      const collection = collectionResource.collection
      const isBaseCollection = resource.source === 'savedCollectionFromBase'
      const collectionOwner = isBaseCollection
        ? collection.base
        : collection.createdBy

      if (!collectionOwner) {
        return null
      }

      return (
        <>
          <Link
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
            href={
              isBaseCollection
                ? `/bases/${collection.base?.slug}`
                : `/profils/${collection.createdBy?.slug}`
            }
          >
            {isBaseCollection
              ? collection.base?.title
              : formatName(collection.createdBy?.name || '')}
          </Link>
          &nbsp;a ajouté cette ressource dans la collection&nbsp;
          <Link
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
            href={`/collections/${collection.slug}`}
          >
            {collection.title}
          </Link>
          &nbsp;{timeAgo}
        </>
      )
    },
    getImage: (resource: NewsFeedResource) => {
      const collectionResource = resource.collections?.find(
        (c) => c.collection.id === resource.collectionId,
      )
      if (!collectionResource) {
        return null
      }

      const collection = collectionResource.collection
      const isBaseCollection = resource.source === 'savedCollectionFromBase'

      if (isBaseCollection && collection.base) {
        return <BaseImage base={collection.base} />
      }

      if (collection.createdBy) {
        return <RoundProfileImage user={collection.createdBy} />
      }

      return null
    },
  },
} as const

// Determine attribution type based on the source provided by the backend
// The backend now handles the complex logic of determining the source
const determineAttribution = (
  resource: NewsFeedResource,
  hasFilter: boolean,
  userNewsFeed: NewsFeed,
  followedBases: NewsFeedBases,
  followedProfiles: NewsFeedProfiles,
) => {
  // Saved collections case
  if (
    resource.source === 'savedCollectionFromBase' ||
    resource.source === 'savedCollectionFromProfile'
  ) {
    return 'savedCollection'
  }

  // Check if resource is from a followed base
  if (resource.base) {
    const resourceBase = resource.base
    if (followedBases.find(({ base }) => base.id === resourceBase.id)) {
      return 'base'
    }
  }

  // Check if resource is from a followed profile
  if (
    followedProfiles.find(({ profile }) => profile.id === resource.createdBy.id)
  ) {
    return 'profile'
  }

  // Check for theme match (only when no filter is active)
  const resourceThemes = resource.themes || []
  const userPreferredThemes = userNewsFeed.themes || []
  const hasMatchingTheme = resourceThemes.some((theme) =>
    userPreferredThemes.includes(theme),
  )
  if (hasMatchingTheme && !hasFilter) {
    return 'theme'
  }

  // Check for professional sector match (only when no filter is active)
  const resourceProfessionalSectors = resource.professionalSectors || []
  const userPreferredProfessionalSectors =
    userNewsFeed.professionalSectors || []
  const hasMatchingSector = resourceProfessionalSectors.some((sector) =>
    userPreferredProfessionalSectors.includes(sector),
  )
  if (hasMatchingSector && !hasFilter) {
    return 'professional_sector'
  }

  // Fallback: prefer base if available, otherwise profile
  return resource.base ? 'base' : 'profile'
}

export const NewsFeedOwnershipInformation = ({
  resource,
  newsFeedPageContext,
  hasFilter,
}: {
  resource: NewsFeedResource
  newsFeedPageContext: NewsFeedPageContext
  hasFilter: boolean
}) => {
  const { userNewsFeed, followedBases, followedProfiles } = newsFeedPageContext
  const attributionType = determineAttribution(
    resource,
    hasFilter,
    userNewsFeed,
    followedBases,
    followedProfiles,
  )
  const config = newsFeedAttributionConfig[attributionType]

  // Determine the most recent date and whether it's an update based on eventType
  const mostRecentDate = (() => {
    switch (resource.eventType) {
      case 'published':
        return resource.published as Date
      case 'updated':
        return resource.lastPublished as Date
      case 'saved_in_collection':
        return resource.addedToCollectionAt as Date
      default:
        return resource.published as Date
    }
  })()

  const isUpdated = resource.eventType === 'updated'
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
