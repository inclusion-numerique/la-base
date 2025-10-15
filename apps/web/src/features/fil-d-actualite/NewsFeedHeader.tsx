import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import BaseImage from '@app/web/components/BaseImage'
import IconInSquare from '@app/web/components/IconInSquare'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { NewsFeedNotifications } from '@app/web/features/fil-d-actualite/db/getNewsFeedNotifications'
import { NewsFeedPageContext } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { NewsFeedSearchFilters } from '@app/web/features/fil-d-actualite/NewsFeedSearchFilters'
import { NewsFeedParams } from '@app/web/server/newsFeed/newsFeedUrls'
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
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import { ProfessionalSector, Theme } from '@prisma/client'
import classNames from 'classnames'
import Link from 'next/link'

export const NewsFeedHeader = ({
  params,
  notificationsCount,
  newsFeedPageContext,
}: {
  params: NewsFeedParams
  notificationsCount: NewsFeedNotifications
  newsFeedPageContext: NewsFeedPageContext
}) => {
  const { thematique, secteur, base, profil } = params
  const notificationsContainer = !!notificationsCount &&
    notificationsCount.count > 0 && (
      <Badge severity="new" small>
        {notificationsCount.count} nouvelle{sPluriel(notificationsCount.count)}{' '}
        ressource{sPluriel(notificationsCount.count)}
        <span className="fr-hidden fr-unhidden-md">
          &nbsp;depuis votre dernière visite
        </span>
      </Badge>
    )

  const renderLabel = () => {
    if (thematique) {
      const theme = thematique as Theme
      return (
        <div className="fr-flex fr-flex-gap-4v fr-align-items-center">
          {thematique !== 'tout' && (
            <IconInSquare
              iconId={
                CATEGORY_VARIANTS[themeCategories[theme]]
                  .icon as RiIconClassName
              }
              size="medium"
              className={CATEGORY_VARIANTS[themeCategories[theme]].background}
              iconClassName={CATEGORY_VARIANTS[themeCategories[theme]].color}
            />
          )}
          {thematique !== 'tout' ? (
            <div className="fr-flex fr-direction-column fr-text--lg fr-mb-0">
              <span
                className={classNames(
                  'fr-mb-0',
                  CATEGORY_VARIANTS[themeCategories[theme]].color,
                )}
              >
                Découvrez les dernières publications liés à la thématique
              </span>
              <span
                className={classNames(
                  'fr-text--bold',
                  CATEGORY_VARIANTS[themeCategories[theme]].color,
                )}
              >
                {themeLabels[theme]}
              </span>
            </div>
          ) : (
            <div className="fr-flex fr-text--lg fr-mb-0">
              <span className="fr-mb-0">
                Découvrez les dernières publications liés à&nbsp;
                <span className="fr-text--bold">vos thématiques suivies</span>
              </span>
            </div>
          )}
        </div>
      )
    }

    if (secteur) {
      const sector = secteur as ProfessionalSector
      return (
        <div className="fr-flex fr-flex-gap-4v fr-align-items-center">
          {secteur !== 'tout' && (
            <IconInSquare
              iconId={professionalSectorsIcon[sector]}
              size="medium"
            />
          )}
          {secteur !== 'tout' ? (
            <div className="fr-flex fr-direction-column fr-text--lg fr-mb-0">
              <span className="fr-mb-0">
                Découvrez les dernières publications liés au secteur
                professionnel
              </span>
              <span className="fr-text--bold">
                {professionalSectorsLabels[sector]}
              </span>
            </div>
          ) : (
            <div className="fr-flex fr-text--lg fr-mb-0">
              <span className="fr-mb-0">
                Découvrez les dernières publications liés à&nbsp;
                <span className="fr-text--bold">
                  vos secteurs professionnels suivis
                </span>
              </span>
            </div>
          )}
        </div>
      )
    }
    if (base === 'tout' && profil === 'tout') {
      return (
        <div className="fr-flex fr-text--lg fr-mb-0">
          <span className="fr-mb-0">
            Découvrez les dernières publications liés à&nbsp;
            <span className="fr-text--bold">vos bases et profils suivis</span>
          </span>
        </div>
      )
    }

    if (base) {
      const followedBase = newsFeedPageContext.followedBases.find(
        (fBase) => fBase.slug === base,
      )

      if (!followedBase) {
        return (
          <div className="fr-flex fr-text--lg fr-mb-0">
            <span className="fr-mb-0">
              Découvrez les dernières publications liés à la base
            </span>
          </div>
        )
      }

      return (
        <div className="fr-flex fr-flex-gap-4v fr-align-items-center">
          <BaseImage base={followedBase} />

          <div className="fr-flex fr-text--lg fr-mb-0">
            <span className="fr-mb-0">
              Découvrez les dernières publications liés de la base&nbsp;
              <Link
                href={`/bases/${followedBase.slug}`}
                className="fr-link fr-text--bold fr-text-decoration--none fr-link--underline-on-hover"
              >
                {followedBase.title}
              </Link>
            </span>
          </div>
        </div>
      )
    }

    if (profil) {
      const followedProfile = newsFeedPageContext.followedProfiles.find(
        (fProfile) => fProfile.slug === profil,
      )

      if (!followedProfile) {
        return (
          <div className="fr-flex fr-text--lg fr-mb-0">
            <span className="fr-mb-0">
              Découvrez les dernières publications liés à votre profil
            </span>
          </div>
        )
      }

      return (
        <div className="fr-flex fr-flex-gap-4v fr-align-items-center">
          <RoundProfileImage user={followedProfile} />

          <div className="fr-flex fr-text--lg fr-mb-0">
            <span className="fr-mb-0">
              Découvrez les dernières publications liés à votre profil&nbsp;
              <Link
                href={`/profils/${followedProfile.slug}`}
                className="fr-link fr-text--bold fr-text-decoration--none fr-link--underline-on-hover"
              >
                {followedProfile.name}
              </Link>
            </span>
          </div>
        </div>
      )
    }

    if (base) {
      const followedBase = newsFeedPageContext.followedBases.find(
        (fBase) => fBase.slug === base,
      )

      if (!followedBase) {
        return (
          <div className="fr-flex fr-text--lg fr-mb-0">
            <span className="fr-mb-0">
              Découvrez les dernières publications liés à la base
            </span>
          </div>
        )
      }

      return (
        <div className="fr-flex fr-flex-gap-4v fr-align-items-center">
          <BaseImage base={followedBase} />

          <div className="fr-flex fr-text--lg fr-mb-0">
            <span className="fr-mb-0">
              Découvrez les dernières publications liés de la base&nbsp;
              <Link
                href={`/bases/${followedBase.slug}`}
                className="fr-link fr-text--bold fr-text-decoration--none fr-link--underline-on-hover"
              >
                {followedBase.title}
              </Link>
            </span>
          </div>
        </div>
      )
    }

    return (
      <div className="fr-flex fr-direction-column fr-flex-gap-2v">
        <span className="fr-text--xl fr-hidden fr-unhidden-md fr-mb-0">
          Découvrez les dernières publications liés à vos préférences
        </span>

        <span className="fr-text--md fr-hidden-sm fr-mb-0">
          Découvrez les dernières publications liés à vos préférences
        </span>
      </div>
    )
  }

  return (
    <>
      <div className="fr-flex fr-direction-column fr-flex-gap-2v">
        {renderLabel()}
        {notificationsContainer}
        <div className="fr-hidden-sm fr-flex fr-my-3w">
          <Button
            priority="secondary"
            className="fr-width-full fr-justify-content-center"
            data-fr-opened="false"
            aria-controls="news-feed-menu-button"
            aria-haspopup="menu"
          >
            <span className="fr-mr-1w ri-filter-3-line" />
            Mes préférences
          </Button>
        </div>
      </div>
      <div className="fr-header">
        <div
          className="fr-header__menu fr-modal"
          id="news-feed-menu-button"
          aria-labelledby="news-feed-menu-button"
        >
          <div className="fr-container">
            <button
              type="button"
              className="fr-btn--close fr-btn"
              aria-controls="news-feed-menu-button"
              title="Fermer"
            >
              Fermer
            </button>
            <div className="fr-header__menu-links">
              <NewsFeedSearchFilters
                params={params}
                newsFeedPageContext={newsFeedPageContext}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
