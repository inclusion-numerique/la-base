import Button from '@codegouvfr/react-dsfr/Button'
import Notice from '@codegouvfr/react-dsfr/Notice'
import classNames from 'classnames'
import styles from './NewsFeedOnboardingHeader.module.css'

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
    <div className="fr-mt-md-6w fr-mt-3w">
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
      <div className="fr-flex fr-direction-column fr-flex-gap-4v fr-mb-12v fr-mt-4v">
        <div>
          <span className="fr-text-mention--grey fr-text--sm fr-mb-1v">
            Étape {step} sur 4
          </span>
          <h1 className={classNames(styles.title, 'fr-mb-0 fr-text--bold')}>
            {title}
          </h1>
          {!!nextStepTitle && (
            <div className="fr-mt-3v">
              <span className="fr-text-mention--grey fr-text--xs">
                <span className="fr-text--bold">Étape suivante : </span>
                {nextStepTitle}
              </span>
            </div>
          )}
        </div>
        <span
          className={classNames(
            styles.description,
            'fr-mb-0 fr-text-mention--grey',
          )}
        >
          {description}
        </span>
        {!!noticeTitle && <Notice title={noticeTitle} />}
      </div>
    </div>
  )
}

export default NewsFeedOnboardingHeader
