import Footer, { type FooterProps } from '@codegouvfr/react-dsfr/Footer'
import SwitchTheme from '@app/web/app/(public)/SwitchTheme'
import { getServerDsfrTheme } from '@app/web/app/getServerDsfrTheme'

export const publicFooterProps = {
  accessibility: 'non compliant',
  accessibilityLinkProps: { href: '/accessibilite' },
  bottomItems: [
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
      text: `Statistiques`,
      linkProps: { href: '/statistiques' },
    },
    {
      text: 'Code source',
      linkProps: {
        href: 'https://github.com/inclusion-numerique/la-base',
        target: '_blank',
        rel: 'noreferrer',
      },
    },
    {
      text: `Budget`,
      linkProps: { href: '/budget' },
    },
  ],
} satisfies Pick<
  FooterProps,
  'accessibility' | 'accessibilityLinkProps' | 'bottomItems'
>

const PublicFooter = () => (
  <Footer
    accessibility={publicFooterProps.accessibility}
    accessibilityLinkProps={publicFooterProps.accessibilityLinkProps}
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
      ...publicFooterProps.bottomItems,
      <SwitchTheme key="switch-theme" initialTheme={getServerDsfrTheme()} />,
    ]}
  />
)
export default PublicFooter
