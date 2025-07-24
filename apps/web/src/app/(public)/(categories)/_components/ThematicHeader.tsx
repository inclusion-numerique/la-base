import { categoryStyles } from '@app/web/app/(public)/(categories)/_helpers/categoryStyles'
import { HomeCategoryCounts } from '@app/web/features/home/components/getHomeCategoriesCount'
import classNames from 'classnames'

export const ThematicHeader = ({
  categoryCounts: { category, resources, themes },
}: {
  categoryCounts: HomeCategoryCounts
}) => {
  const { description, background, icon, color } = categoryStyles[category]
  return (
    <div
      className={classNames(
        'fr-text--center fr-p-6w fr-border-radius--16',
        background,
      )}
    >
      <span
        className={classNames('ri-3x fr-display-block fr-mb-4w', icon, color)}
        aria-hidden
      />
      <h1 className="fr-h3 fr-m-2w">{category}</h1>
      <p className="fr-mb-2w">{description}</p>
      <span className="fr-flex fr-flex-gap-2v fr-direction-md-row fr-justify-content-center">
        <span className="fr-flex fr-flex-gap-2v fr-align-items-baseline">
          <span className="ri-file-text-line fr-text--lg fr-mb-0" aria-hidden />
          <span className="fr-text--bold">{resources}</span> Ressources
        </span>
        <span className="fr-flex fr-flex-gap-2v fr-align-items-baseline">
          <span className="fr-unhidden-md fr-hidden">·</span>
          <span
            className="ri-price-tag-3-line fr-text--lg fr-mb-0"
            aria-hidden
          />
          <span className="fr-text--bold">{themes.length}</span> Thématiques
        </span>
      </span>
    </div>
  )
}
