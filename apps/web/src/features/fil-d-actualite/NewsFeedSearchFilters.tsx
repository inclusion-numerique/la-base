import { NewsFeedBasesProfilesFilters } from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedBasesProfilesFilters'
import { NewsFeedProfessionnalSectorsFilters } from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedProfessionnalSectorsFilters'
import { NewsFeedThematicsFilters } from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedThematicsFilters'
import Button from '@codegouvfr/react-dsfr/Button'
import { NewsFeed } from '@prisma/client'

export const NewsFeedSearchFilters = ({
  userNewsFeed,
}: {
  userNewsFeed: NewsFeed
}) => {
  const { professionalSectors, themes } = userNewsFeed
  return (
    <div className="fr-col-3 fr-border-top">
      <div className="fr-flex fr-direction-column fr-flex-gap-4v">
        <Button
          priority="tertiary no outline"
          className="fr-width-full fr-text-mention--black fr-text--start"
        >
          <span className="ri-list-unordered fr-mr-1w" />
          <span className="fr-text--uppercase fr-text--xs">
            Voir tout mon fil
          </span>
        </Button>
        <div className="fr-flex fr-direction-column">
          <NewsFeedProfessionnalSectorsFilters sectors={professionalSectors} />
          <NewsFeedThematicsFilters themes={themes} />
          <NewsFeedBasesProfilesFilters />
        </div>
        <div className="fr-mt-2w">
          <Button
            linkProps={{ href: '/fil-d-actualite/preferences' }}
            priority="secondary"
            className="fr-flex fr-justify-content-center fr-width-full"
          >
            <span className="ri-settings-3-line fr-mr-1w fr-text-label--blue-france fr-text--md" />
            Gérer mes préférences
          </Button>
        </div>
      </div>
    </div>
  )
}
