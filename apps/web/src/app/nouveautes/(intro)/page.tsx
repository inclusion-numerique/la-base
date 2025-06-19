import CloseOnboardingButton from '@app/web/app/nouveautes/CloseOnboardingButton'
import LesBasesSvgLogo from '@app/web/components/LesBasesSvgLogo'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './OnboardingIntroPage.module.css'

const OnboardingIntroPage = () => (
  <div className="fr-flex-grow-1 fr-flex fr-align-items-center fr-justify-content-center">
    <CloseOnboardingButton mdBackground="blue-france-975-75" />
    <div
      className={classNames(
        'fr-border-radius--16 fr-background-default--grey fr-pt-20v fr-px-4v fr-pb-8v fr-p-md-12v fr-flex fr-direction-column fr-align-items-center',
        styles.card,
      )}
    >
      <LesBasesSvgLogo className={styles.logo} />
      <h2
        className={classNames(
          'fr-text--medium fr-my-6v fr-text--center',
          styles.title,
        )}
      >
        Les Bases du numérique d’intérêt général
      </h2>
      <Badge severity="new">Nouvelle version</Badge>
      <p
        className={classNames(
          'fr-text--xl fr-mb-0 fr-mt-6v fr-text--center',
          styles.description,
        )}
      >
        Découvrez une toute nouvelle interface pensée afin de vous offrir une
        expérience et une navigation simplifiée.
      </p>
      <Button
        className="fr-mt-12v"
        iconId="fr-icon-arrow-right-line"
        iconPosition="right"
        title="Fermer"
        size="large"
        linkProps={{
          href: '/nouveautes/profil',
        }}
      >
        Découvrir
      </Button>
      <Link className="fr-mt-6v fr-link" href="/">
        Voir plus tard
      </Link>
    </div>
  </div>
)

export default OnboardingIntroPage
