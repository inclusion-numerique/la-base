'use client'

import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import IconInSquare from '@app/web/components/IconInSquare'
import { UserNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import NewsFeedProfessionnalsSectorsForm from '@app/web/features/fil-d-actualite/onboarding/professionals-sectors/NewsFeedProfessionnalsSectorsForm'
import NewsFeedUnfollowProfessionalSector from '@app/web/features/fil-d-actualite/preferences/NewsFeedUnfollowProfessionalSector'
import {
  professionalSectorsIcon,
  professionalSectorsLabels,
} from '@app/web/themes/professionalSectors'
import { numberToString } from '@app/web/utils/formatNumber'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { ProfessionalSector } from '@prisma/client'

export const NewsFeedProfessionalsSectorsPreferenceModal = createModal({
  id: `news-feed-professionals-sectors-preference-modal`,
  isOpenedByDefault: false,
})

export const NewsFeedProfessionalsSectorsPreferenceForm = ({
  userNewsFeed,
  resourcesCount,
}: {
  userNewsFeed: UserNewsFeed | null
  resourcesCount: Record<
    ProfessionalSector,
    {
      count: number
    }
  >
}) => {
  return (
    <div className="fr-mt-4w">
      <div className="fr-flex fr-direction-column">
        <div className="fr-mb-2v fr-flex fr-justify-content-space-between fr-align-items-center">
          <span className="fr-h6 fr-text-default--grey fr-mb-0">
            Mon secteur professionnel
          </span>
          <Button
            data-testid="edit-professionnal-sectors-button"
            className="fr-text--sm fr-text--medium"
            size="small"
            priority="tertiary no outline"
            onClick={() => NewsFeedProfessionalsSectorsPreferenceModal.open()}
          >
            <span className="fr-hidden fr-unhidden-sm">
              Ajouter des secteurs pro
            </span>
            <span className="ri-add-line fr-ml-1w" />
          </Button>
        </div>
        {userNewsFeed?.professionalSectors.map((ps) => (
          <div
            className="fr-flex fr-direction-column fr-direction-md-row fr-align-items-md-center fr-flex-gap-md-4v fr-flex-gap-2v fr-py-4v fr-justify-content-space-between"
            key={ps}
          >
            <div className="fr-flex fr-flex-gap-4v fr-direction-column fr-direction-md-row">
              <IconInSquare iconId={professionalSectorsIcon[ps]} />
              <div className="fr-flex fr-direction-column fr-flex-gap-1v">
                <span className="fr-mb-0 fr-text--md fr-text--bold">
                  {professionalSectorsLabels[ps]}
                </span>
                <div className="fr-flex fr-align-items-center fr-flex-gap-2v fr-mb-0 fr-text--sm fr-text-mention--grey">
                  <span className="fr-icon-file-text-line fr-icon--sm" />
                  <div>
                    <b>{numberToString(resourcesCount[ps].count)}</b>
                    <span className="fr-mb-0">
                      {' '}
                      Ressource{sPluriel(resourcesCount[ps].count)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <NewsFeedUnfollowProfessionalSector
              professionalSector={ps}
              userNewsFeed={userNewsFeed}
            />
          </div>
        ))}
        {userNewsFeed?.professionalSectors.length === 0 && (
          <div className="fr-border fr-border-radius--8 fr-py-4w fr-px-6w fr-text--center fr-mt-4v">
            <span className="fr-text--md fr-text--bold fr-text-mention--grey fr-mb-0">
              Vous ne suivez pas de secteur professionnel.
            </span>
          </div>
        )}
      </div>
      <NewsFeedProfessionalsSectorsPreferenceModal.Component
        size="large"
        title="Quel secteur professionnel vous intéresse ?"
        buttons={[
          {
            priority: 'secondary',
            type: 'button',
            onClick: () => NewsFeedProfessionalsSectorsPreferenceModal.close(),
            children: 'Annuler',
            doClosesModal: true,
          },
          {
            priority: 'primary',
            type: 'submit',
            nativeButtonProps: {
              'data-testid': 'indexation-themes-select-apply',
              form: 'news-feed-professionals-sectors-form',
            },
            children: 'Valider ma sélection',
          },
        ]}
      >
        <div className="fr-flex fr-direction-column fr-flex-gap-4v fr-mb-6w">
          <span className="fr-mb-0 fr-text-mention--grey fr-text--md">
            Découvrez et restez informé des ressources liées à votre secteur
            professionnel
          </span>
          <Notice title="Sélectionnez un ou plusieurs secteurs professionnels." />
        </div>
        <NewsFeedProfessionnalsSectorsForm
          userNewsFeed={userNewsFeed}
          context="preferences"
        />
      </NewsFeedProfessionalsSectorsPreferenceModal.Component>
    </div>
  )
}
