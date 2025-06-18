import Newsletter from '@app/web/app/(public)/Newsletter'
import { SessionUser } from '@app/web/auth/sessionUser'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import WhoAreWe from '@app/web/features/home/components/WhoAreWe'
import { contentId } from '@app/web/utils/skipLinks'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import Banner from './components/Banner'
import { FeaturedBase } from './components/FeaturedBase'
import { FeaturedProfil } from './components/FeaturedProfil'
import { FeaturedResource } from './components/FeaturedResource'
import HomeCategories from './components/HomeCategories'
import HomeInfo from './components/HomeInfo'
import { Featured } from './db/getFeatured'

const HomePage = async ({
  featured,
  user,
}: {
  featured: Featured
  user: SessionUser | null
}) => {
  const { featuredBases, featuredProfiles, featuredResources } = featured

  return (
    <>
      <SkipLinksPortal />
      <main id={contentId}>
        <Banner />
        <div className="fr-container fr-pt-8w fr-pb-0 fr-py-md-10w">
          <div className="fr-text--center">
            <h2 className="fr-h2 fr-text-title--blue-france fr-mb-1w">
              Découvrez les ressources
            </h2>
            <p className="fr-text--xl fr-mb-6w">
              <span className="fr-display-block">
                Inspirez-vous des outils, supports pédagogiques, articles, cas
                d’usages, documentations diverses...
              </span>
              <span className="fr-display-block">
                partagés par des acteurs du numérique d’intérêt général.&nbsp;
                <Link
                  className="fr-link fr-text--xl"
                  href="/centre-d-aide/les-ressources"
                >
                  En savoir plus
                </Link>
              </span>
            </p>
            <div className="fr-mb-6w fr-mb-md-10w">
              <h2 className="fr-h6 fr-text--center fr-mb-md-4w fr-mb-3w">
                Explorez les ressources grâce aux 4 grandes catégories
              </h2>
              <HomeCategories />
            </div>
            <p className="fr-badge fr-badge--new fr-badge--yellow-tournesol fr-badge--lg fr-text--uppercase fr-mb-1w">
              ressources à la une
            </p>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters fr-mb-12v">
            {featuredResources.map((resource) => (
              <div
                key={resource.slug}
                className="fr-col-lg-4 fr-col-md-6 fr-col-12 fr-mt-3w fr-pb-0"
              >
                <FeaturedResource resource={resource} user={user} />
              </div>
            ))}
          </div>
          <div className="fr-text--center fr-mt-12v fr-mb-6w fr-mb-md-10w fr-unhidden-md fr-hidden">
            <Link
              href="/rechercher/tout/ressources"
              className="fr-btn fr-btn--lg"
            >
              Découvrir les ressources
            </Link>
          </div>
          <div className="fr-unhidden fr-hidden-md fr-text--center fr-mt-3w fr-mb-8w">
            <Link
              href="/rechercher/tout/ressources"
              className="fr-my-auto fr-ml-auto fr-width-full fr-text--center fr-mx-auto fr-btn fr-btn--lg fr-unhidden fr-hidden-md"
            >
              Découvrir les ressources
            </Link>
          </div>
          <div className="fr-text--center fr-border-radius--16 fr-background-alt--blue-france fr-pt-3w fr-pb-4w fr-px-3w fr-p-md-6w fr-mb-6w fr-mb-md-0">
            <div className="fr-flex fr-direction-column fr-justify-content-center fr-flex-gap-3w">
              <h2 className="fr-h6 fr-mb-4w fr-mb-md-1w">
                Les principes à suivre pour publier une ressource et contribuer
                à la plateforme
              </h2>
              <span className="fr-mb-4w fr-mb-md-3w">
                Consultez notre charte indiquant les principes qui guident la
                construction d’un numérique d’intérêt général, ainsi que
                certaines conditions que les créateurs de ressources s’engagent
                à respecter.
              </span>
              <div>
                <Button
                  linkProps={{ href: '/charte' }}
                  size="large"
                  priority="secondary"
                >
                  Découvrir la charte des Bases
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="fr-text--center fr-background-alt--blue-france fr-py-8w fr-py-md-10w fr-px-2w">
          <h2 className="fr-h2 fr-text-title--blue-france fr-mb-2w">
            Une communauté engagée
            <br />
            au service du numérique d’intérêt général
          </h2>
          <p className="fr-text--xl">
            <span className="fr-display-block">
              Découvrez les acteurs du numérique d’intérêt général qui partagent
              et publient leurs ressources pour
            </span>
            <span className="fr-display-block">
              participer à l’évolution du secteur. Rejoignez la
              communauté&nbsp;!
            </span>
          </p>
        </div>
        <div className="fr-container fr-py-8w fr-py-md-10w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col">
              <h2 className="fr-mb-1w">Découvrez les bases</h2>
              <p className="fr-mb-0">
                Une base représente une structure, un collectif qui souhaite
                publier, partager et sélectionner des ressources relatives à son
                activité, ses pratiques...{' '}
                <Link className="fr-link" href="/centre-d-aide/une-base">
                  En savoir plus
                </Link>
                .
              </p>
            </div>
            <div className="fr-col-auto fr-flex fr-unhidden-md fr-hidden">
              <Button
                linkProps={{ href: '/rechercher/tout/bases' }}
                className="fr-my-auto fr-ml-auto"
                size="large"
              >
                Découvrir les bases
              </Button>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {featuredBases.map((base) => (
              <div
                key={base.slug}
                className="fr-col-lg-4 fr-col-md-6 fr-col-12 fr-mt-4w fr-pb-0"
              >
                <FeaturedBase base={base} user={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="fr-container">
          <hr />
          <div className="fr-unhidden fr-hidden-md fr-text--center fr-mt-3w fr-mb-2w">
            <Button
              linkProps={{ href: '/rechercher/tout/bases' }}
              className="fr-my-auto fr-ml-auto fr-width-full fr-text--center fr-mx-auto fr-btn fr-btn--lg fr-unhidden fr-hidden-md"
              size="large"
            >
              Découvrir les bases
            </Button>
          </div>
        </div>
        <div className="fr-container fr-pt-8w fr-pt-md-10w fr-pb-md-15w fr-pb-8w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col">
              <h2 className="fr-mb-1w fr-h3">
                Découvrez les profils de créateurs
              </h2>
              <p className="fr-mb-0">
                Acteurs, professionnels ou particuliers, partageant des
                ressources et contribuant à la communauté des Bases.
              </p>
            </div>
            <div className="fr-col-auto fr-flex fr-unhidden-md fr-hidden">
              <Button
                linkProps={{ href: '/rechercher/tout/profils' }}
                className="fr-my-auto fr-ml-auto"
                size="large"
              >
                Découvrir les profils
              </Button>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {featuredProfiles.map((profile) => (
              <div
                key={profile.slug}
                className="fr-col-lg-4 fr-col-md-6 fr-col-12 fr-mt-4w"
              >
                <FeaturedProfil profile={profile} user={user} />
              </div>
            ))}
          </div>
          <div className="fr-unhidden fr-hidden-md fr-text--center fr-mt-4w fr-mb-8w">
            <Link
              href="/rechercher/tout/profils"
              className="fr-my-auto fr-ml-auto fr-width-full fr-text--center fr-mx-auto fr-btn fr-btn--lg fr-unhidden fr-hidden-md"
            >
              Découvrir les profils
            </Link>
          </div>
          <div className="fr-mt-6w fr-mt-md-10w fr-background-alt--yellow-tournesol fr-p-3w fr-p-md-6w fr-grid-row fr-border-radius--16">
            <div className="fr-flex fr-direction-column fr-justify-content-space-between">
              <h2>
                Vous aussi rejoignez
                <br />
                la communauté&nbsp;!
              </h2>
              <Button
                linkProps={{ href: '/creer-un-compte' }}
                className="fr-unhidden-md fr-hidden"
                size="large"
              >
                <span className="ri-user-line ri-lg fr-mr-1w" aria-hidden />
                Créez votre profil
              </Button>
            </div>
            <div className="fr-col-auto fr-border-right fr-border--blue-france fr-mx-md-5w fr-unhidden-md fr-hidden" />
            <div className="fr-col-md fr-flex fr-direction-column">
              <p className="fr-flex fr-align-items-center">
                <span
                  className="ri-earth-fill ri-lg fr-text-label--blue-france fr-mr-3v fr-unhidden-lg fr-hidden"
                  aria-hidden
                />
                <span>
                  <span className="fr-text--bold">Publiez</span> vos ressources
                  pour les partager avec la communauté
                </span>
              </p>
              <p className="fr-flex fr-align-items-center">
                <span
                  className="ri-team-fill ri-lg fr-text-label--blue-france fr-mr-3v fr-unhidden-lg fr-hidden"
                  aria-hidden
                />
                <span>
                  <span className="fr-text--bold">Collaborez</span> avec
                  d’autres créateurs grâce aux bases
                </span>
              </p>
              <p className="fr-flex fr-align-items-center">
                <span
                  className="ri-bookmark-fill ri-lg fr-text-label--blue-france fr-mr-3v fr-unhidden-lg fr-hidden"
                  aria-hidden
                />
                <span>
                  <span className="fr-text--bold">Enregistrez</span> les
                  ressources qui vous intéressent grâce aux collections
                </span>
              </p>
              <p className="fr-flex fr-align-items-center fr-mb-0">
                <span
                  className="ri-user-add-fill ri-lg fr-text-label--blue-france fr-mr-3v fr-unhidden-lg fr-hidden"
                  aria-hidden
                />
                <span>
                  <span className="fr-text--bold">Suivez</span> les bases & les
                  profils qui vous intéressent
                </span>
              </p>
            </div>
            <div className="fr-width-full">
              <Link
                href="/creer-un-compte"
                className="fr-width-full fr-text--center fr-btn fr-btn--lg fr-unhidden fr-hidden-md fr-mx-auto fr-mt-4w"
              >
                <span className="ri-user-line ri-lg fr-mr-1w" aria-hidden />
                Créez votre profil
              </Link>
            </div>
          </div>
        </div>
        <HomeInfo />
        <WhoAreWe />
        <Newsletter />
      </main>
    </>
  )
}

export default HomePage
