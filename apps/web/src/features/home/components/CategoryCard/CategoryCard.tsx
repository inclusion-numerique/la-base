import {
  CATEGORY_VARIANTS,
  Category,
  CategoryStyle,
} from '@app/web/themes/themes'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './CategoryCard.module.css'

export type CategoryCardProps = {
  category: Category
  resourcesCount: number
}

const CATEGORY_VARIANTS_STYLES: Record<
  Category,
  CategoryStyle & { hover: string }
> = {
  'Inclusion numérique': {
    ...CATEGORY_VARIANTS['Inclusion numérique'],
    hover: styles.inclusionCard,
  },
  'Culture numérique': {
    ...CATEGORY_VARIANTS['Culture numérique'],
    hover: styles.cultureNumCard,
  },
  'Communs & souveraineté': {
    ...CATEGORY_VARIANTS['Communs & souveraineté'],
    hover: styles.communsCard,
  },
  'Numérique & environnement': {
    ...CATEGORY_VARIANTS['Numérique & environnement'],
    hover: styles.numeriqueCard,
  },
}

export const CategoryCard = ({
  category,
  resourcesCount,
}: CategoryCardProps) => (
  <div
    className={classNames(
      CATEGORY_VARIANTS_STYLES[category].background,
      CATEGORY_VARIANTS_STYLES[category].hover,
      'fr-width-full fr-px-4w fr-pb-4w fr-pt-3w fr-border-radius--16 fr-height-full fr-flex fr-direction-column fr-enlarge-link',
    )}
  >
    <div className="fr-flex fr-direction-column fr-flex-gap-8v">
      <div className="fr-flex fr-direction-column fr-flex-gap-2v fr-align-items-start">
        <span
          className={classNames(
            CATEGORY_VARIANTS[category].color,
            CATEGORY_VARIANTS[category].icon,
            'ri-xl',
          )}
          aria-hidden
        />
        <span
          className={classNames(
            CATEGORY_VARIANTS[category].color,
            'fr-text--lg fr-text--bold fr-text--start fr-mb-0',
            styles.title,
          )}
        >
          {category}
        </span>
      </div>
      <div className="fr-flex fr-flex-gap-2v fr-justify-content-space-between">
        <div>
          <span className="fr-text--bold">{resourcesCount}</span> Ressources
        </div>
        <span>
          <Link
            href={CATEGORY_VARIANTS[category].href}
            className="fr-link fr-text--lg"
            aria-label={`Découvrir ${category}`}
          >
            <span className="ri-arrow-right-line ri-lg" aria-hidden />
          </Link>
        </span>
      </div>
    </div>
  </div>
)
