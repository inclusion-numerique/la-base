'use client'

import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import IconInSquare from '@app/web/components/IconInSquare'
import { UserNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import NewsFeedThemesForm from '@app/web/features/fil-d-actualite/onboarding/themes/NewsFeedThemesForm'
import NewsFeedUnfollowTheme from '@app/web/features/fil-d-actualite/preferences/NewsFeedUnfollowTheme'
import {
  CATEGORY_VARIANTS,
  themeCategories,
  themeLabels,
} from '@app/web/themes/themes'
import { numberToString } from '@app/web/utils/formatNumber'
import { RiIconClassName } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { Theme } from '@prisma/client'
import classNames from 'classnames'
import { useState } from 'react'

export const NewsFeedThemesPreferenceModal = createModal({
  id: `news-feed-themes-preference-modal`,
  isOpenedByDefault: false,
})

export const NewsFeedThemesPreferenceForm = ({
  userNewsFeed,
  resourcesCount,
}: {
  userNewsFeed: UserNewsFeed | null
  resourcesCount: Record<Theme, { count: number }>
}) => {
  const [showAll, setShowAll] = useState(false)

  const displayedThemes = showAll
    ? userNewsFeed?.themes
    : userNewsFeed?.themes.slice(0, 4)
  const count = userNewsFeed?.themes.length ?? 0
  return (
    <>
      <div className="fr-flex fr-direction-column fr-flex-gap-2v">
        <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
          <span className="fr-h6 fr-text-default--grey fr-mb-0">
            {count} thématique
            {sPluriel(count)} suivie
            {sPluriel(count)}
          </span>
          <Button
            data-testid="edit-professionnal-sectors-button"
            className="fr-text--sm fr-text--medium"
            size="small"
            priority="tertiary no outline"
            onClick={() => NewsFeedThemesPreferenceModal.open()}
          >
            <span className="fr-hidden fr-unhidden-sm">
              Ajouter des thématiques
            </span>
            <span className="ri-add-line fr-ml-1w" />
          </Button>
        </div>
        {(displayedThemes || []).map((theme) => (
          <div className="fr-flex fr-py-4v fr-direction-column fr-direction-md-row fr-flex-gap-md-4v fr-flex-gap-2v fr-align-items-md-center fr-justify-content-space-between">
            <div className="fr-flex fr-flex-gap-4v fr-direction-column fr-direction-md-row">
              <IconInSquare
                iconId={
                  CATEGORY_VARIANTS[themeCategories[theme]]
                    .icon as RiIconClassName
                }
                className={CATEGORY_VARIANTS[themeCategories[theme]].background}
                iconClassName={CATEGORY_VARIANTS[themeCategories[theme]].color}
              />
              <div className="fr-flex fr-direction-column">
                <span
                  className="fr-mb-0 fr-text--start fr-text--md fr-text--bold"
                  style={{
                    color: CATEGORY_VARIANTS[themeCategories[theme]].color,
                  }}
                >
                  {themeLabels[theme]}
                </span>
                <div className="fr-flex fr-direction-column">
                  <div className="fr-flex fr-align-items-center fr-flex-gap-2v fr-mb-0 fr-text--sm fr-text-mention--grey">
                    <span className="fr-icon-file-text-line fr-icon--sm" />
                    <div>
                      <b>{numberToString(resourcesCount[theme].count)}</b>
                      <span className="fr-mb-0">
                        {' '}
                        Ressource{sPluriel(resourcesCount[theme].count)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <NewsFeedUnfollowTheme theme={theme} userNewsFeed={userNewsFeed} />
          </div>
        ))}
        {displayedThemes?.length === 0 && (
          <div className="fr-border fr-border-radius--8 fr-py-4w fr-px-6w fr-text--center fr-mt-4v">
            <span className="fr-text--md fr-text--bold fr-text-mention--grey fr-mb-0">
              Vous ne suivez pas de thématiques.
            </span>
          </div>
        )}
        {count > 0 && (
          <Button
            priority="tertiary no outline"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? 'Voir moins' : 'Voir tous'}
            <span
              className={classNames(
                'fr-ml-1w',
                !showAll ? 'ri-arrow-down-s-line' : 'ri-arrow-up-s-line',
              )}
            />
          </Button>
        )}
      </div>
      <NewsFeedThemesPreferenceModal.Component
        size="large"
        title="Quelles thématiques vous intéressent ?"
        buttons={[
          {
            priority: 'secondary',
            type: 'button',
            onClick: () => NewsFeedThemesPreferenceModal.close(),
            children: 'Annuler',
            doClosesModal: true,
          },
          {
            priority: 'primary',
            type: 'submit',
            nativeButtonProps: {
              'data-testid': 'indexation-themes-select-apply',
              form: 'news-feed-themes-form',
            },
            children: 'Valider ma sélection',
          },
        ]}
      >
        <div className="fr-flex fr-direction-column fr-flex-gap-4v fr-mb-6w">
          <span className="fr-mb-0 fr-text-mention--grey fr-text--md">
            Découvrez et restez informé des ressources liées à vos centres
            d’intérêts.
          </span>
          <Notice title="Nous vous conseillons de sélectionner au minimum 3 thématiques." />
        </div>
        <NewsFeedThemesForm userNewsFeed={userNewsFeed} context="preferences" />
      </NewsFeedThemesPreferenceModal.Component>
    </>
  )
}
