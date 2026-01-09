import SelectPeriod from '@app/web/app/(legal)/statistiques/SelectPeriod'
import { StatisticsCardSkeleton } from '@app/web/app/(legal)/statistiques/StatisticsCardSkeleton'
import { type StatisticsParams } from '@app/web/server/statistiques/getStatistics'
import { Suspense } from 'react'
import CreationDataSection from './CreationDataSection'
import KpiSection from './KpiSection'
import ResourceContentSection from './ResourceContentSection'
import SearchUsageSection from './SearchUsageSection'
import styles from './StatisticsPage.module.css'

const StatisticsPage = async ({
  searchParams,
}: {
  searchParams: Promise<StatisticsParams>
}) => {
  const statisticsParams = await searchParams

  return (
    <>
      <section>
        <h2 className="fr-h3 fr-mb-4w">
          Chiffres clés pour suivre l'usage de la plateforme
        </h2>
        <Suspense
          fallback={
            <div className="fr-flex fr-direction-column fr-direction-sm-row fr-flex-gap-6v fr-align-items-center fr-justify-content-space-between">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="fr-width-full">
                  <StatisticsCardSkeleton className={styles.kpiSkeleton} />
                </div>
              ))}
            </div>
          }
        >
          <KpiSection />
        </Suspense>
      </section>
      <hr className="fr-separator-6v fr-separator-md-12v" />
      <section>
        <div className="fr-flex-md fr-justify-content-space-between fr-align-items-center fr-flex-gap-4v fr-mb-4w">
          <div>
            <h2 className="fr-h3 fr-mb-0">
              Données pour suivre l'évolution de l'usage de la recherche
            </h2>
          </div>
          <SelectPeriod
            param="recherche"
            segments={[
              { label: 'Par semaine', param: 'semaine' },
              { label: 'Par mois', param: 'mois' },
              { label: 'En cumulé', param: 'total' },
            ]}
          />
        </div>
        <Suspense
          key={`search-${statisticsParams.recherche}`}
          fallback={
            <div className="fr-flex fr-direction-column fr-flex-gap-6v">
              <div className="fr-width-full">
                <StatisticsCardSkeleton
                  className={styles.searchCreationSkeleton}
                />
              </div>
              <div className="fr-flex fr-direction-column fr-direction-sm-row fr-flex-gap-6v fr-align-items-center fr-justify-content-space-between">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="fr-width-full">
                    <StatisticsCardSkeleton
                      className={styles.searchCreationSkeleton}
                    />
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <SearchUsageSection statisticsParams={statisticsParams} />
        </Suspense>
      </section>
      <hr className="fr-separator-6v fr-separator-md-12v" />
      <section>
        <div className="fr-flex-md fr-justify-content-space-between fr-align-items-center fr-flex-gap-4v fr-mb-4w">
          <div>
            <h2 className="fr-h3 fr-mb-0">
              Données pour suivre l'évolution de la communauté
            </h2>
          </div>
          <SelectPeriod
            param="creation"
            segments={[
              { label: 'Par semaine', param: 'semaine' },
              { label: 'Par mois', param: 'mois' },
              { label: 'En cumulé', param: 'total' },
            ]}
          />
        </div>
        <Suspense
          key={`search-${statisticsParams.creation}`}
          fallback={
            <div className="fr-flex fr-direction-column fr-flex-gap-6v">
              <div className="fr-width-full">
                <StatisticsCardSkeleton
                  className={styles.searchCreationSkeleton}
                />
              </div>
              <div className="fr-flex fr-direction-column fr-direction-sm-row fr-flex-gap-6v fr-align-items-center fr-justify-content-space-between">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="fr-width-full">
                    <StatisticsCardSkeleton
                      className={styles.searchCreationSkeleton}
                    />
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <CreationDataSection statisticsParams={statisticsParams} />
        </Suspense>
      </section>
      <hr className="fr-separator-6v fr-separator-md-12v" />
      <section>
        <div className="fr-flex-md fr-justify-content-space-between fr-align-items-center fr-flex-gap-4v fr-mb-4w">
          <div>
            <h2 className="fr-h3 fr-mb-0">
              Données pour comprendre le contenu des ressources
            </h2>
          </div>
          <SelectPeriod
            param="usage"
            segments={[
              { label: 'Sur les 30 derniers jours', param: 'mois' },
              { label: 'Sur les 6 derniers mois', param: 'six-mois' },
              { label: 'Depuis le début', param: 'total' },
            ]}
          />
        </div>
        <Suspense
          key={`usage-${statisticsParams.usage}`}
          fallback={
            <div className="fr-flex fr-direction-column fr-flex-gap-6v">
              <div className="fr-flex fr-direction-column fr-direction-sm-row fr-flex-gap-6v fr-align-items-center fr-justify-content-space-between">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="fr-width-full">
                    <StatisticsCardSkeleton
                      className={styles.resourceContentSkeleton}
                    />
                  </div>
                ))}
              </div>
              <div className="fr-flex fr-direction-column fr-direction-sm-row fr-flex-gap-6v fr-align-items-center fr-justify-content-space-between">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="fr-width-full">
                    <StatisticsCardSkeleton
                      className={styles.resourceContentListSkeleton}
                    />
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <ResourceContentSection statisticsParams={statisticsParams} />
        </Suspense>
      </section>
    </>
  )
}

export default StatisticsPage
