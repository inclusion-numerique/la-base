import Accordion from '@codegouvfr/react-dsfr/Accordion'
import { Theme } from '@prisma/client'
import Link from 'next/link'
import classNames from 'classnames'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { getHomeCategoriesCount } from '@app/web/app/(public)/getHomeCategoriesCount'
import { categories } from '@app/web/themes/themes'
import { searchResultThemeHref } from '@app/web/themes/searchResultHrefHelpers'
import styles from './HomeCategories.module.css'

const sum = (total: number, { count }: { count: number }) => total + count

const toNames = ({ theme }: { theme: Theme }) => theme

const HomeCategories = async () => {
  const categoriesCount = await getHomeCategoriesCount()
  return (
    <div className="fr-container fr-pt-12v fr-pb-16v fr-pb-md-30v fr-pt-md-20v">
      <div className="fr-text--center">
        <h2 className="fr-mb-4v fr-h3">
          Découvrez les ressources grâce aux thématiques
        </h2>
        <p className="fr-text--xl fr-mb-12v">
          Découvrez les ressources publiées grâce aux thématiques organisées en{' '}
          {categories.length} grandes catégories.
        </p>
      </div>
      <div className="fr-accordions-group">
        {categoriesCount.map(({ title, resourcesCount, themes }) => (
          <Accordion
            key={title}
            label={
              <div className={styles.accordionTitle}>
                <span className="fr-mb-0 fr-h6">{title}</span>
                <p
                  className={classNames(
                    'fr-mr-8v fr-text-default--grey',
                    styles.categoryInfos,
                  )}
                >
                  <span className={styles.categoryInfo}>
                    <span className="fr-icon-compass-3-line fr-mr-1w" />
                    <strong className="fr-text--strong">{themes.length}</strong>
                    &nbsp;Thématique{sPluriel(themes.length)}
                  </span>
                  <span className={styles.categoryInfoSeparator}>·</span>
                  <span className={styles.categoryInfo}>
                    <span className="fr-icon-file-text-line  fr-mr-1w" />
                    <strong className="fr-text--strong">
                      {resourcesCount}
                    </strong>
                    &nbsp;Ressource{sPluriel(resourcesCount)}
                  </span>
                </p>
              </div>
            }
          >
            <div className={styles.tags}>
              <Link
                href={searchResultThemeHref(...themes.map(toNames))}
                className="fr-tag"
              >
                Toutes les thématiques&nbsp;·&nbsp;
                <strong>{themes.reduce(sum, 0)}</strong>
              </Link>
              {themes.map((item) => (
                <Link
                  key={item.theme}
                  href={searchResultThemeHref(item.theme)}
                  className="fr-tag"
                >
                  {item.title}&nbsp;·&nbsp;<strong>{item.count}</strong>
                </Link>
              ))}
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  )
}

export default HomeCategories
