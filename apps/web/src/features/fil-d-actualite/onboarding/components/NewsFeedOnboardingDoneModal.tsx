'use client'

import { useDsfrModalIsBound } from '@app/ui/hooks/useDsfrModalIsBound'
import IconInSquare from '@app/web/components/IconInSquare'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Notice from '@codegouvfr/react-dsfr/Notice'
import classNames from 'classnames'
import { useEffect } from 'react'
import styles from './NewsFeedOnboardingDoneModal.module.css'

const newsFeedOnboardingDoneModalId = 'news-feed-onboarding-done-modal'
const NewsFeedOnboardingDoneModal = createModal({
  id: newsFeedOnboardingDoneModalId,
  isOpenedByDefault: true,
})

export const NewsFeedOnboardingDone = ({
  fromOnboarding,
}: {
  fromOnboarding?: boolean
}) => {
  const modalIsBound = useDsfrModalIsBound(newsFeedOnboardingDoneModalId)

  useEffect(() => {
    if (modalIsBound) {
      NewsFeedOnboardingDoneModal.open()
    }
  }, [modalIsBound])

  if (!fromOnboarding) {
    return null
  }
  return (
    <NewsFeedOnboardingDoneModal.Component
      title=""
      className={styles.modalContainer}
    >
      <div className="fr-flex fr-direction-column fr-justify-content-center fr-align-items-center fr-flex-gap-12v">
        <div className="fr-flex fr-direction-column fr-align-items-center fr-justify-content-center fr-flex-gap-4v">
          <IconInSquare
            size="large"
            iconId="ri-check-line"
            iconClassName={styles.icon}
            background={styles.iconContainer}
          />
          <span className="fr-h3 fr-text-title--blue-france fr-text--center fr-mb-0">
            Votre fil d'actualité est prêt !
          </span>
          <span
            className={classNames(
              styles.description,
              'fr-text--center fr-text-mention--grey fr-mb-0',
            )}
          >
            Découvrez les ressources liées à vos préférences et restez informé
            des nouvelles publications.
          </span>
        </div>
        <div className="fr-flex fr-direction-column fr-align-items-center fr-justify-content-center fr-text-mention--grey fr-text--center">
          <span className="fr-text--bold">Bon à savoir :</span>
          <span>
            Utilisez le menu présentant vos préférences sur la gauche de l’écran
            pour filtrer les ressources de votre fil d’actualité.
          </span>
        </div>
        <Notice
          title={
            <span>
              Vous pourrez modifier vos préférences à tout moment via la
              page&nbsp;
              <span className="fr-text--bold">Gérer mes préférences</span>.
            </span>
          }
        />
        <div className="fr-width-full">
          <Button
            size="large"
            type="button"
            onClick={NewsFeedOnboardingDoneModal.close}
            className="fr-width-full fr-flex fr-justify-content-center"
          >
            Découvrir mon fil d'actualité
          </Button>
        </div>
      </div>
    </NewsFeedOnboardingDoneModal.Component>
  )
}
