import Button from '@codegouvfr/react-dsfr/Button'
import Notice from '@codegouvfr/react-dsfr/Notice'

const NewsFeedOnboardingHeader = ({
  step,
  title,
  nextStepTitle,
  description,
  noticeTitle,
  previousHref,
}: {
  step: number
  title: string
  nextStepTitle?: string
  description: string
  noticeTitle?: string
  previousHref?: string
}) => {
  return (
    <>
      {!!previousHref && (
        <Button
          iconId="fr-icon-arrow-left-line"
          title="Précédent"
          priority="tertiary no outline"
          linkProps={{ href: previousHref }}
        >
          Précédent
        </Button>
      )}
      <div className="fr-flex fr-direction-column fr-flex-gap-4v">
        <div>
          <span className="fr-text-mention--grey fr-text--sm fr-mb-1v">
            Étape {step} sur 4
          </span>
          <h1 className="fr-h3 fr-mb-0">{title}</h1>
          {!!nextStepTitle && (
            <div className="fr-mt-3v">
              <span className="fr-text-mention--grey fr-text--xs">
                <span className="fr-text--bold">Étape suivante : </span>
                {nextStepTitle}
              </span>
            </div>
          )}
        </div>
        <span className="fr-mb-0 fr-text--xl fr-text-mention--grey">
          {description}
        </span>
        {!!noticeTitle && <Notice className="fr-mb-12v" title={noticeTitle} />}
      </div>
    </>
  )
}

export default NewsFeedOnboardingHeader
