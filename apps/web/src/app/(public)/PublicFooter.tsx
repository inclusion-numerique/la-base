import SwitchTheme from '@app/web/app/(public)/SwitchTheme'
import { getServerDsfrTheme } from '@app/web/app/getServerDsfrTheme'
import Footer, { type FooterProps } from '@codegouvfr/react-dsfr/Footer'

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
      linkProps: {
        href: 'https://docs.numerique.gouv.fr/docs/2445dd98-d303-4c7b-b4ba-7690b59ea3d4/',
        target: '_blank',
      },
    },
  ],
} satisfies Pick<
  FooterProps,
  'accessibility' | 'accessibilityLinkProps' | 'bottomItems'
>

const PublicFooter = async () => {
  const initialTheme = await getServerDsfrTheme()
  return (
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
        <SwitchTheme key="switch-theme" initialTheme={initialTheme} />,
      ]}
    />
  )
}
export default PublicFooter
