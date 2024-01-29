import {
  getStatistics,
  StatisticsParams,
} from '@app/web/app/(public)/statistiques/getStatistics'
import SearchStatistics from '@app/web/app/(public)/statistiques/SearchStatistics'

const StatisticsPage = async ({
  searchParams: { fonctionnalites, recherche },
}: {
  searchParams: StatisticsParams
}) => {
  const { search } = await getStatistics({ recherche, fonctionnalites })

  return (
    <>
      <h3>Chiffres clés pour comprendre l’usage du service</h3>
      <div />
      <hr className="fr-separator-6v fr-separator-md-12v" />
      <h3>Données pour comprendre l’usage de la recherche</h3>
      <div className="fr-grid-row">
        <div
          className="fr-col-12 fr-col-md-6 fr-col-lg-4"
          style={{ height: 400 }}
        >
          <SearchStatistics data={search} />
        </div>
      </div>
      <hr className="fr-separator-6v fr-separator-md-12v" />
      <h3>
        Données pour comprendre la création de ressources, bases & profils
      </h3>
      <div />
      <hr className="fr-separator-6v fr-separator-md-12v" />
      <h3>Données pour comprendre les difficultés rencontrées</h3>
    </>
  )
}

export default StatisticsPage
