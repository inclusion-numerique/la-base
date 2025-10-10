import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { NewsFeedSearchParams } from '@app/web/app/fil-d-actualite/(fil-actualite)/page'
import IconInSquare from '@app/web/components/IconInSquare'
import { NewsFeedNotifications } from '@app/web/features/fil-d-actualite/db/getNewsFeedNotifications'
import { NewsFeedPageContext } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { NewsFeedSearchFilters } from '@app/web/features/fil-d-actualite/NewsFeedSearchFilters'
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

export const NewsFeedHeader = ({
  searchParams,
  notificationsCount,
  newsFeedPageContext,
}: {
  searchParams: NewsFeedSearchParams
  notificationsCount: NewsFeedNotifications
  newsFeedPageContext: NewsFeedPageContext
}) => {
  const { thematique, secteur } = searchParams
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
          {thematique !== 'tous' && (
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
          {thematique !== 'tous' ? (
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
          {secteur !== 'tous' && (
            <IconInSquare
              iconId={professionalSectorsIcon[sector]}
              size="medium"
            />
          )}
          {secteur !== 'tous' ? (
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

    return (
      <div className="fr-flex fr-direction-column fr-flex-gap-2v">
        <span className="fr-text--xl fr-hidden fr-unhidden-md fr-mb-0">
          Découvrez les dernières publications liés à vos préférences
        </span>

        <span className="fr-text--md fr-mb-0">
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
                searchParams={searchParams}
                newsFeedPageContext={newsFeedPageContext}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
