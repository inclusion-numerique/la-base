import classNames from 'classnames'
import Link from 'next/link'

type CategoryStyle = {
  icon: string
  color: string
  background: string
  href: string
}

type Category =
  | 'Inclusion & compétences numériques'
  | 'Culture numérique'
  | 'Communs & souveraineté'
  | 'Numérique & environnement'

const CATEGORY_VARIANTS: Record<Category, CategoryStyle> = {
  'Inclusion & compétences numériques': {
    icon: 'ri-service-fill',
    color: 'fr-text-label--green-archipel',
    background: 'fr-background-alt--green-archipel',
    href: '/inclusion-et-competences-numeriques',
  },
  'Culture numérique': {
    icon: 'ri-stack-fill',
    color: 'fr-text-label--pink-tuile',
    background: 'fr-background-alt--pink-tuile',
    href: '/culture-numerique',
  },
  'Communs & souveraineté': {
    icon: 'ri-government-fill',
    color: 'fr-text-label--yellow-tournesol',
    background: 'fr-background-alt--yellow-tournesol',
    href: '/communs-et-souverainete',
  },
  'Numérique & environnement': {
    icon: 'ri-leaf-fill',
    color: 'fr-text-label--green-bourgeon',
    background: 'fr-background-alt--green-bourgeon',
    href: '/numerique-et-environnement',
  },
}

export type CategoryCardProps = {
  category: Category
  resourcesCount: number
  thematicCount: number
}

export const CategoryCard = ({
  category,
  resourcesCount,
  thematicCount,
}: CategoryCardProps) => (
  <div
    className={classNames(
      CATEGORY_VARIANTS[category].background,
      'fr-p-6w fr-border-radius--16 fr-height-full fr-flex fr-direction-column fr-enlarge-link',
    )}
  >
    <div>
      <span
        className={classNames(
          CATEGORY_VARIANTS[category].color,
          CATEGORY_VARIANTS[category].icon,
          'ri-3x',
        )}
        aria-hidden
      />
      <div className="fr-my-4w">
        <h3 className=" fr-mb-2w">{category}</h3>
        <span className="fr-flex fr-flex-gap-2v fr-direction-md-row fr-direction-column">
          <span className="fr-flex fr-flex-gap-2v fr-align-items-baseline">
            <span
              className="ri-file-text-line fr-text--lg fr-mb-0"
              aria-hidden
            />
            <span className="fr-text--bold">{resourcesCount}</span> Ressources
          </span>
          <span className="fr-flex fr-flex-gap-2v fr-align-items-baseline">
            <span className="fr-unhidden-md fr-hidden">·</span>
            <span
              className="ri-price-tag-3-line fr-text--lg fr-mb-0"
              aria-hidden
            />
            <span className="fr-text--bold">{thematicCount}</span> Thématiques
          </span>
        </span>
      </div>
    </div>
    <span className="fr-mt-auto">
      <Link
        href={CATEGORY_VARIANTS[category].href}
        className="fr-link fr-text--lg"
      >
        Découvrir <span className="ri-arrow-right-line" aria-hidden />
      </Link>
    </span>
  </div>
)
