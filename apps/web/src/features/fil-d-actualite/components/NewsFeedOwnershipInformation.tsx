import BaseImage from '@app/web/components/BaseImage'
import IconInSquare from '@app/web/components/IconInSquare'
import styles from '@app/web/components/OwnershipInformation.module.css'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { NewsFeedResource } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { formatName } from '@app/web/server/rpc/user/formatName'
import {
  CATEGORY_VARIANTS,
  themeCategories,
  themeLabels,
} from '@app/web/themes/themes'
import { RiIconClassName } from '@codegouvfr/react-dsfr'
import type { NewsFeed, Theme } from '@prisma/client'
import classNames from 'classnames'
import Link from 'next/link'

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

      return `Ressource publiée dans la thématique ${
        themeLabels[matchingTheme as Theme]
      }`
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
    getText: () => <> …Ressource à destination des publiée</>,
    getImage: (resource: NewsFeedResource) => (
      <RoundProfileImage user={resource.createdBy} />
    ),
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

  return (
    <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
      {image}
      <span className={classNames('fr-text--xs fr-mb-0', styles.title)}>
        {attributionText}
      </span>
    </div>
  )
}
