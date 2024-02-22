import Footer from '@codegouvfr/react-dsfr/Footer'
import SwitchTheme from '@app/web/app/(public)/SwitchTheme'

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
        text: 'Mentions légales',
        linkProps: { href: '/mentions-legales' },
      },
      {
        text: 'Politique de confidentialité',
        linkProps: { href: '/confidentialite' },
      },
      {
        text: `Conditions générales d'utilisation`,
        linkProps: { href: '/cgu' },
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
    ]}
  />
)
export default PublicFooter
