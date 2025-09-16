import IconInSquare from '@app/web/components/IconInSquare'
import NewsFeedOnboardingSkipButton from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingSkipButton'
import { RiIconClassName } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import styles from './NewsFeedOnboardingPage.module.css'

const features: Array<{
  iconId: RiIconClassName
  title: string
  description: string
}> = [
  {
    iconId: 'ri-heart-line',
    title: 'Inspirez-vous de ressources liés à vos préférences',
    description:
      "Soyez notifié des nouvelles ressources publiés liés à vos préférences et retrouvez-les via votre fil d'actualité.",
  },
  {
    iconId: 'ri-list-settings-line',
    title: 'Gérez vos préférences à tout moment',
    description:
      "Faites évoluer quand vous le souhaitez vos centres d'intérêts, les bases et les profils que vous suivez.",
  },
  {
    iconId: 'ri-eye-line',
    title: 'Des recommandations transparentes',
    description:
      "Nous ne proposons pas d'algorithmes de recommandations sur votre fil d'actualité.",
  },
]

export default function NewsFeedOnboardingPage() {
  return (
    <div className="fr-flex fr-pt-6w fr-justify-content-center fr-align-items-center">
      <div className="fr-container--slim fr-flex fr-direction-column fr-align-items-center fr-flex-gap-10v fr-p-6w fr-background-default--grey fr-border fr-border-radius--8">
        <IconInSquare
          iconClassName={styles.flashLightIconColor}
          background={styles.flashLightIconBackground}
          size="semi-large"
          iconId="ri-flashlight-fill"
        />
        <h1 className="fr-h3 fr-text-title--blue-france fr-text--center">
          Découvrez un fil d'actualité adapté à vos préférences
        </h1>
        {features.map((feature, index) => (
          <div
            key={index}
            className="fr-flex fr-align-items-center fr-flex-gap-6v"
          >
            <IconInSquare iconId={feature.iconId} />
            <div className="fr-flex fr-direction-column">
              <span className="fr-text--bold">{feature.title}</span>
              <span className={styles.itemDescription}>
                {feature.description}
              </span>
            </div>
          </div>
        ))}
        <div className="fr-width-full">
          <Button
            size="large"
            linkProps={{
              href: '/fil-d-actualite/onboarding/secteurs-professionnels',
            }}
            className="fr-width-full fr-flex fr-justify-content-center"
          >
            Choisir mes préférences
          </Button>
          <div className="fr-flex fr-justify-content-center fr-mt-6v">
            <NewsFeedOnboardingSkipButton />
          </div>
        </div>
      </div>
    </div>
  )
}
