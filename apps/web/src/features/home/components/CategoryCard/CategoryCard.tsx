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
  <li
    className={classNames(
      CATEGORY_VARIANTS_STYLES[category].background,
      CATEGORY_VARIANTS_STYLES[category].hover,
      'fr-width-full fr-px-4w fr-pb-4w fr-pt-3w fr-border-radius--16 fr-height-full fr-flex fr-direction-column fr-enlarge-link fr-link--no-underline',
    )}
  >
    <Link
      href={CATEGORY_VARIANTS[category].href}
      aria-label={`Découvrir ${category}`}
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
          <h4
            className={classNames(
              CATEGORY_VARIANTS[category].color,
              'fr-text--lg fr-text--bold fr-text--start fr-mb-0',
              styles.title,
            )}
          >
            {category}
          </h4>
        </div>
        <div className="fr-flex fr-flex-gap-2v fr-justify-content-space-between">
          <p className="fr-mb-0">
            <span className="fr-text--bold">{resourcesCount}</span> Ressources
          </p>
          <span>
            <span
              className="fr-text-title--blue-france ri-arrow-right-line ri-lg"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  </li>
)
