import type { NewsFeedListPageData } from '@app/web/app/administration/fonctionnalites/fil-d-actualite/getNewsFeedListPageData'
import { professionalSectorsLabels } from '@app/web/themes/professionalSectors'
import { themeLabels } from '@app/web/themes/themes'
import { numberToString } from '@app/web/utils/formatNumber'

const percent = (count: number, total: number) =>
  total > 0 ? Math.round((count / total) * 100) : 0

const StatCard = ({
  label,
  count,
  total,
}: {
  label: string
  count: number
  total?: number
}) => (
  <div className="fr-col-12 fr-col-md-3">
    <div className="fr-border-radius--8 fr-border fr-p-4v">
      <p className="fr-text--sm fr-mb-1v fr-text-mention--grey">{label}</p>
      <p className="fr-h4 fr-mb-0">
        {numberToString(count)}
        {total != null && (
          <span className="fr-text--sm fr-text-mention--grey fr-ml-1w">
            ({percent(count, total)}%)
          </span>
        )}
      </p>
    </div>
  </div>
)

const NewsFeedStats = ({ data }: { data: NewsFeedListPageData }) => (
  <div className="fr-mb-6v">
    <div className="fr-grid-row fr-grid-row--gutters fr-mb-4v">
      <StatCard
        label="Inscrits au fil d'actualité"
        count={data.totalCount}
        total={data.totalUsers}
      />
      <StatCard
        label="N'ont jamais ouvert le fil"
        count={data.neverOpenedCount}
        total={data.totalCount}
      />
      <StatCard
        label="Onboarding complété"
        count={data.onboardingCount}
        total={data.totalCount}
      />
      <StatCard
        label="Abonnés newsletter"
        count={data.newsletterCount}
        total={data.totalCount}
      />
    </div>

    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-12 fr-col-md-6">
        <div className="fr-border-radius--8 fr-border fr-p-4v">
          <p className="fr-text--bold fr-mb-2v">Top 5 thèmes</p>
          {data.topThemes.length === 0 ? (
            <p className="fr-text--sm fr-text-mention--grey">Aucun thème</p>
          ) : (
            <ul className="fr-raw-list">
              {data.topThemes.map(([theme, count]) => (
                <li
                  key={theme}
                  className="fr-flex fr-justify-content-space-between fr-py-1v"
                >
                  <span className="fr-text--sm">{themeLabels[theme]}</span>
                  <span className="fr-text--sm fr-text--bold">
                    {numberToString(count)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="fr-col-12 fr-col-md-6">
        <div className="fr-border-radius--8 fr-border fr-p-4v">
          <p className="fr-text--bold fr-mb-2v">
            Répartition secteurs professionnels
          </p>
          {data.sectorDistribution.length === 0 ? (
            <p className="fr-text--sm fr-text-mention--grey">Aucun secteur</p>
          ) : (
            <ul className="fr-raw-list">
              {data.sectorDistribution.map(([sector, count]) => (
                <li
                  key={sector}
                  className="fr-flex fr-justify-content-space-between fr-py-1v"
                >
                  <span className="fr-text--sm">
                    {professionalSectorsLabels[sector]}
                  </span>
                  <span className="fr-text--sm fr-text--bold">
                    {numberToString(count)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default NewsFeedStats
