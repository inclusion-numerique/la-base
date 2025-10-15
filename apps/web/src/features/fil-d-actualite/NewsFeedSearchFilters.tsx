import { NewsFeedPageContext } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { NewsFeedBasesProfilesFilters } from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedBasesProfilesFilters'
import { NewsFeedProfessionnalSectorsFilters } from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedProfessionnalSectorsFilters'
import { NewsFeedThematicsFilters } from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedThematicsFilters'
import {
  createDefaultUrl,
  NewsFeedParams,
} from '@app/web/server/newsFeed/newsFeedUrls'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import styles from './NewsFeedSearchFilters.module.css'

export const NewsFeedSearchFilters = ({
  newsFeedPageContext,
  params,
}: {
  newsFeedPageContext: NewsFeedPageContext
  params: NewsFeedParams
}) => {
  const { professionalSectors, themes } = newsFeedPageContext.userNewsFeed
  const {
    professionalsSectors: professionalSectorsCounts,
    themes: themesCounts,
    followedBases: baseCounts,
    followedProfiles: profileCounts,
  } = newsFeedPageContext.resourceCounts

  const { followedBases, followedProfiles } = newsFeedPageContext
  const hasActiveFilters = Object.entries(params).some(([_, value]) => !!value)

  return (
    <div className="fr-flex fr-direction-column fr-flex-gap-4v fr-mb-md-8w">
      <Button
        priority="tertiary no outline"
        className={classNames(
          !hasActiveFilters && styles.activeButton,
          'fr-width-full fr-text-mention--black fr-text--start',
        )}
        linkProps={{ href: createDefaultUrl() }}
      >
        <div className="fr-width-full fr-flex fr-align-items-center fr-justify-content-space-between">
          <div
            className={classNames(
              'fr-flex fr-align-items-center fr-flex-gap-2v',
              styles.flexWidth,
            )}
          >
            <span className="ri-list-unordered fr-mr-1w" />
            <span className="fr-text--uppercase fr-text--xs">
              Voir tout mon fil
            </span>
          </div>
        </div>
      </Button>
      <div className="fr-flex fr-direction-column">
        <NewsFeedProfessionnalSectorsFilters
          sectors={professionalSectors}
          counts={professionalSectorsCounts}
          params={params.secteur}
        />
        <NewsFeedThematicsFilters
          themes={themes}
          counts={themesCounts}
          params={params.thematique}
        />
        <NewsFeedBasesProfilesFilters
          baseCounts={baseCounts}
          profileCounts={profileCounts}
          bases={followedBases}
          profiles={followedProfiles}
          params={params.base ?? params.profil}
        />
      </div>
      <div className="fr-mt-2w">
        <Button
          linkProps={{ href: '/fil-d-actualite/preferences' }}
          priority="secondary"
          size="medium"
          className={classNames(
            styles.preferencesButton,
            'fr-flex fr-justify-content-center fr-width-full',
          )}
        >
          <span className="ri-settings-3-line fr-mr-1w fr-text-label--blue-france fr-text--md" />
          Gérer mes préférences
        </Button>
      </div>
    </div>
  )
}
