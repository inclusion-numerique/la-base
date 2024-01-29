import TwoPartOnboardingLayout from '@app/web/app/nouveautes/TwoPartOnboardingLayout'

const OnboardingThemesPage = () => (
  <TwoPartOnboardingLayout
    illustrationSrc="/images/onboarding/onboarding_themes.svg"
    illustrationTop={183}
    illustrationLeft={0}
    illustrationBackground="blue-france-975-75"
    title="Explorer les ressources grâce aux thématiques"
    icon="fr-icon-pantone-line"
    stepIndex={4}
    previousHref="/nouveautes/recherche"
    nextHref="/nouveautes/mobile"
  >
    <p>
      Découvrez de nouvelles ressources sur les thématiques qui vous
      intéressent, organisées en 4 grandes catégories du numérique d’intérêt
      général.
    </p>
  </TwoPartOnboardingLayout>
)

export default OnboardingThemesPage
