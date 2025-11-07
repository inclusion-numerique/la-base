import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import IconInSquare from '@app/web/components/IconInSquare'
import { getNewsFeedPageContext } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import NewsFeedResumeForm from '@app/web/features/fil-d-actualite/onboarding/resume/NewsFeedResumeForm'
import { NewsFeedFollowListPreferences } from '@app/web/features/fil-d-actualite/preferences/NewsFeedFollowListPreferences'
import { NewsFeedProfessionalsSectorsPreferenceForm } from '@app/web/features/fil-d-actualite/preferences/NewsFeedProfessionalsSectorsPreferenceForm'
import { NewsFeedThemesPreferenceForm } from '@app/web/features/fil-d-actualite/preferences/NewsFeedThemesPreferenceForm'
import Button from '@codegouvfr/react-dsfr/Button'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
  title: metadataTitle("Fil d'actualité - Gérer mes préférences"),
}

export default async function NewsFeedPreferencesPage() {
  const newsFeedPageContext = await getNewsFeedPageContext()
  const {
    userNewsFeed,
    user,
    followedBases,
    followedProfiles,
    resourceCounts,
  } = newsFeedPageContext

  if (!userNewsFeed || !userNewsFeed.hasCompleteOnboarding) {
    redirect('/fil-d-actualite/onboarding')
  }

  return (
    <div className="fr-container fr-pb-50v">
      <Breadcrumbs
        currentPage="Gérer mes préférences"
        parents={[
          {
            label: "Mon fil d'actualité",
            linkProps: { href: '/fil-d-actualite/tout' },
          },
        ]}
        className="fr-m-0 fr-py-4v"
      />
      <div className="fr-container-md fr-container--medium fr-pt-md-4w">
        <Button
          linkProps={{ href: '/fil-d-actualite/tout' }}
          priority="tertiary no outline"
        >
          <span className="ri-arrow-left-line fr-mr-1w fr-text-label--blue-france fr-text--md" />
          Retour à mon fil d'actualité
        </Button>
        <div className="fr-flex fr-align-items-center fr-flex-gap-6v fr-mt-2w fr-mb-4w">
          <IconInSquare
            className="fr-hidden fr-unhidden-sm"
            size="large"
            iconId="ri-settings-3-line"
          />
          <div className="fr-flex fr-direction-column fr-justify-content-center">
            <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france">
              Gérer mes préférences
            </h1>
            <span className="fr-text--md fr-mb-0">
              Choisissez les ressources visibles dans votre fil d’actualité
              grâce à vos préférences.
            </span>
          </div>
        </div>
        <NewsFeedResumeForm
          user={user}
          userNewsFeed={userNewsFeed}
          context="preferences"
        />
        <NewsFeedProfessionalsSectorsPreferenceForm
          userNewsFeed={userNewsFeed}
          resourcesCount={resourceCounts.professionalsSectors}
        />
        <hr className="fr-pt-4w fr-pb-0 fr-mt-4w" />
        <NewsFeedThemesPreferenceForm
          userNewsFeed={userNewsFeed}
          resourcesCount={resourceCounts.themes}
        />
        <NewsFeedFollowListPreferences
          followedBases={followedBases}
          followedProfiles={followedProfiles}
          user={user}
        />
      </div>
    </div>
  )
}
