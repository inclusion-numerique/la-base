import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { ChartCard } from '@app/web/features/charte/components/ChartCard'
import { ChartParticipationCard } from '@app/web/features/charte/components/ChartParticipationCard'
import LogoEuro from '@app/web/features/charte/components/LogoEuro'
import LogoSpeakerPhone from '@app/web/features/charte/components/LogoSpeakerPhone'
import {
  CHART_CARDS_CONTENT,
  CHART_CARDS_CONTENT_PARTICIPATION,
} from '@app/web/features/charte/data/chart-cards-content'
import { contentId } from '@app/web/utils/skipLinks'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './ChartPage.module.css'

const ChartPage = () => {
  return (
    <>
      <SkipLinksPortal />
      <main id={contentId}>
        <div className="fr-background-alt--blue-france">
          <div className="fr-container">
            <Breadcrumbs
              currentPage="Charte des Bases du numérique d'intérêt général"
              className="fr-m-0 fr-pt-4v"
            />
            <div className={styles.container}>
              <h1 className="fr-mb-4v">
                Charte des Bases du numérique d&apos;intérêt général
              </h1>
              <p className="fr-text--lg fr-mb-16v">
                Sur Les Bases, tout le monde peut contribuer à l’évolution du
                secteur du numérique d’intérêt général en publiant des
                ressources. Le contenu des ressources produites est libre et
                peut prendre des formes très diverses. Cependant, il est
                important de&nbsp;
                <span className="fr-text--bold">
                  respecter certaines conditions et principes communs,&nbsp;
                </span>
                partagés par la communauté des utilisateurs.
              </p>
              <div className="fr-flex fr-direction-column fr-flex-gap-6v">
                <span className="fr-text--bold fr-text--uppercase">
                  Les conditions à respecter pour publier une ressource
                </span>
                <div className="fr-flex fr-flex-gap-6v fr-direction-column fr-direction-md-row fr-justify-content-center">
                  <div
                    className={classNames(
                      styles.tileContainer,
                      'fr-p-md-6w fr-px-3w fr-py-4w',
                    )}
                  >
                    <LogoEuro />
                    <span className="fr-text--bold fr-text--xl fr-mb-0">
                      Des ressources libres et gratuites
                    </span>
                    <p className="fr-text--lg fr-text-mention--grey">
                      Toutes les ressources publiées sur la plateforme sont
                      mises à disposition gratuitement et, par défaut, sous
                      licence&nbsp;
                      <Link
                        href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/"
                        className="fr-link"
                        target="_blank"
                      >
                        Etalab 2.0
                      </Link>
                      &nbsp;(d'autres choix de licences sont possibles,&nbsp;
                      <Link
                        href="/centre-d-aide/les-ressources#licences"
                        className="fr-link"
                      >
                        en savoir plus ici
                      </Link>
                      ). Les utilisateurs ne doivent en aucun cas demander des
                      compensations financières pour l’utilisation ou la
                      diffusion des contenus partagés.
                    </p>
                  </div>
                  <div
                    className={classNames(
                      styles.tileContainer,
                      'fr-p-md-6w fr-px-3w fr-py-4w',
                    )}
                  >
                    <LogoSpeakerPhone />
                    <span className="fr-text--bold fr-text--xl fr-mb-0">
                      Non-démarchage commercial
                    </span>
                    <p className="fr-text--lg fr-text-mention--grey">
                      La plateforme est dédiée au partage de ressources et de
                      savoirs au service de l’intérêt général. Il est
                      formellement interdit d'utiliser la plateforme afin de
                      promouvoir des produits ou services à des fins
                      commerciales.
                    </p>
                  </div>
                </div>
                <span>
                  Pour en savoir plus sur les licences des ressources, vous
                  pouvez également consulter le&nbsp;
                  <Link href="/centre-d-aide" className="fr-link">
                    centre d&apos;aide
                  </Link>
                  .
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-container fr-my-10w">
          <div className="fr-flex fr-direction-column fr-flex-gap-12v">
            <div className="fr-text--center">
              <h2 className="fr-mb-2w fr-text-label--blue-france">
                Contribuer au numérique d'intérêt général : <br />
                les 7 principes à suivre
              </h2>
              <p className="fr-mb-0 fr-text--lg">
                Les 7 principes de la démarche&nbsp;
                <Link
                  className="fr-link"
                  href="https://numerique-en-communs.fr/la-demarche/#quoi"
                  target="_blank"
                >
                  Numérique en Commun[s]
                </Link>
                &nbsp;opèrent comme le fil directeur de notre définition du
                numérique d’intérêt général. Les ressources publiés sur les
                bases ont pour but de contribuer à ces principes.
              </p>
            </div>
            <div className={styles.chartCardsContainer}>
              {CHART_CARDS_CONTENT.map((card) => (
                <ChartCard key={card.title} {...card} />
              ))}
            </div>
            <div className="fr-background-alt--blue-france fr-border-radius--16 fr-p-md-6w fr-px-3w fr-py-4w">
              <div className="fr-flex fr-direction-column fr-direction-md-row fr-align-items-center fr-flex-gap-12v">
                <div>
                  <img src="/images/charte/logo-nec.svg" alt="Logo de la NEC" />
                </div>
                <div className="fr-flex fr-direction-column">
                  <span className={classNames('fr-h5', styles.necTitle)}>
                    Numérique en Commun[s]
                  </span>
                  <p className={styles.necDescription}>
                    Impulsée par l’ANCT, la démarche NEC fédère une communauté
                    d’acteurs et actrices du numérique d’intérêt général autour
                    d’un événement national, de ses déclinaisons locales et de
                    temps en ligne. Toutes les ressources et contenus produits
                    dans le cadre de NEC sont partagés sur Les Bases.
                  </p>
                  <div className="fr-flex fr-direction-column fr-direction-md-row fr-text--center fr-flex-gap-6v">
                    <Link
                      href="/bases/numerique-en-communs"
                      className="fr-link fr-link--no-underline fr-text--underline"
                    >
                      Voir la base Numérique en Commun[s]
                    </Link>
                    <Link
                      href="https://numerique-en-communs.fr"
                      className="fr-link fr-link--no-underline fr-text--underline"
                      target="_blank"
                    >
                      Visitez le site
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-background-alt--blue-france">
          <div className="fr-container fr-pt-md-10w fr-pb-16w fr-pt-8w">
            <div className="fr-text--center">
              <h2 className="fr-mb-4v">
                Participez à l’évolution de la qualité des ressources publiées
              </h2>
              <p className="fr-mb-12v fr-text--xl">
                Ces conditions et principes communs vont permettre à la
                communauté d’être active dans la modération et l’évaluation des
                ressources publiées sur la plateforme.
              </p>
            </div>
            <div className="fr-flex fr-direction-column fr-direction-md-row fr-flex-gap-6v">
              {CHART_CARDS_CONTENT_PARTICIPATION.map((card) => (
                <ChartParticipationCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ChartPage
