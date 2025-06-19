import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import styles from './CategoryCard.module.css'

type CategoryStyle = {
  icon: string
  color: string
  background: string
  hover: string
  href: string
}

type Category =
  | 'Inclusion numérique'
  | 'Culture numérique'
  | 'Communs & souveraineté'
  | 'Numérique & environnement'

const CATEGORY_VARIANTS: Record<Category, CategoryStyle> = {
  'Inclusion numérique': {
    icon: 'ri-service-fill',
    color: 'fr-text-label--green-archipel',
    background: 'fr-background-alt--green-archipel',
    hover: styles.inclusionCard,
    href: '/inclusion-numerique',
  },
  'Culture numérique': {
    icon: 'ri-stack-fill',
    color: 'fr-text-label--pink-tuile',
    background: 'fr-background-alt--pink-tuile',
    hover: styles.cultureNumCard,
    href: '/culture-numerique',
  },
  'Communs & souveraineté': {
    icon: 'ri-government-fill',
    color: 'fr-text-label--yellow-tournesol',
    background: 'fr-background-alt--yellow-tournesol',
    hover: styles.communsCard,
    href: '/communs-et-souverainete',
  },
  'Numérique & environnement': {
    icon: 'ri-leaf-fill',
    color: 'fr-text-label--green-bourgeon',
    background: 'fr-background-alt--green-bourgeon',
    hover: styles.numeriqueCard,
    href: '/numerique-et-environnement',
  },
}

export type CategoryCardProps = {
  category: Category
  resourcesCount: number
}

export const CategoryCard = ({
  category,
  resourcesCount,
}: CategoryCardProps) => (
  <div
    className={classNames(
      CATEGORY_VARIANTS[category].background,
      CATEGORY_VARIANTS[category].hover,
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
          >
            <span className="ri-arrow-right-line ri-lg" aria-hidden />
          </Link>
        </span>
      </div>
    </div>
  </div>
)
