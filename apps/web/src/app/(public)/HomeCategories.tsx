import Accordion from '@codegouvfr/react-dsfr/Accordion'
import Link from 'next/link'
import classNames from 'classnames'
import { getHomeCategoriesCount } from '@app/web/app/(public)/getHomeCategoriesCount'
import { sPluriel } from '@app/web/utils/sPluriel'
import {
  defaultSearchParams,
  searchParamsToUrl,
} from '@app/web/server/search/searchQueryParams'
import styles from './HomeCategories.module.css'

const HomeCategories = async () => {
  const categories = await getHomeCategoriesCount()

  return (
    <div className="fr-container fr-pt-20v fr-pb-30v">
      <div className="fr-text--center">
        <h3 className="fr-mb-4v">
          Découvrez les ressources grâce aux thématiques
        </h3>
        <p className="fr-text--xl fr-mb-12v">
          Découvrez les ressources publiées grâce aux thématiques organisés en 3
          grandes catégories.
        </p>
      </div>
      <div className="fr-accordions-group">
        {categories.map(({ title, resourcesCount, themes }) => (
          <Accordion
            key={title}
            label={
              <div className={styles.accordionTitle}>
                <h6 className="fr-mb-0">{title}</h6>
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
              {themes.map((item) => (
                <Link
                  key={item.theme}
                  href={searchParamsToUrl({
                    ...defaultSearchParams,
                    themes: [item.theme],
                  })}
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
