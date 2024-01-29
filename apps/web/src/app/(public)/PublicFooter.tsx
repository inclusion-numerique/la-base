import Footer from '@codegouvfr/react-dsfr/Footer'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import SwitchTheme from '@app/web/app/(public)/SwitchTheme'
import { feedbackModalId } from '@app/web/components/Feedback/feedbackModalProps'

const PublicFooter = () => (
  <Footer
    accessibility="partially compliant"
    accessibilityLinkProps={{ href: '/accessibilite' }}
    brandTop={
      <>
        République
        <br />
        Française
      </>
    }
    operatorLogo={{
      imgUrl: '/images/logo-anct.svg',
      alt: "Logo de l'Agence Nationale de la Cohésion des Territoires",
      orientation: 'horizontal',
    }}
    homeLinkProps={{
      href: '/',
      title: 'Accueil',
    }}
    bottomItems={[
      {
        text: 'Politique de confidentialité',
        linkProps: { href: '/confidentialite' },
      },
      {
        text: 'Code source',
        linkProps: {
          href: 'https://github.com/inclusion-numerique/la-base',
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      <SwitchTheme key="switch-theme" />,
      <Button
        key="feedback"
        type="button"
        priority="tertiary no outline"
        aria-controls={feedbackModalId}
        data-fr-opened={false}
        id="footer-feedback-control-button"
      >
        <span
          className={classNames('fr-icon--sm fr-mr-1-5v fr-icon-feedback-line')}
        />
        Je donne mon avis
      </Button>,
    ]}
  />
)
export default PublicFooter
