import Card from '@app/web/components/Card'
import { getKpisStatistics } from '@app/web/server/statistiques/getStatistics'
import { numberToString } from '@app/web/utils/formatNumber'
import Tooltip from '@codegouvfr/react-dsfr/Tooltip'
import classNames from 'classnames'
import KeyFigureTitle from './KeyFigureTitle'
import styles from './StatisticsPage.module.css'

const KpiSection = async () => {
  const kpi = await getKpisStatistics()

  return (
    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
        <Card
          className="fr-border fr-border-radius--8"
          noBorder
          title={
            <KeyFigureTitle type="publications">
              {numberToString(kpi.publications.count)}
            </KeyFigureTitle>
          }
          titleAs="div"
        >
          <span
            className={classNames(
              styles.noWrap,
              'fr-text--lg fr-mb-0 fr-text--medium',
            )}
          >
            Nombre total de ressources publiées
          </span>
          <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
            dont {numberToString(kpi.publications.public)} publiques et{' '}
            {numberToString(kpi.publications.private)} privées
          </div>
        </Card>
      </div>
      <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
        <Card
          className="fr-border fr-border-radius--8"
          noBorder
          title={
            <KeyFigureTitle type="views">
              {numberToString(kpi.views.count)}
            </KeyFigureTitle>
          }
          titleAs="div"
        >
          <span className="fr-text--lg fr-mb-0 fr-text--medium">
            Nombre total de vues de ressources
          </span>
          <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
            dont {numberToString(kpi.views.lastMonth)} sur les 30 derniers jours
          </div>
        </Card>
      </div>
      <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
        <Card
          className="fr-border fr-border-radius--8"
          noBorder
          title={
            <KeyFigureTitle type="users">
              {numberToString(kpi.recentUsers)}
            </KeyFigureTitle>
          }
          titleAs="div"
        >
          <span className="fr-text--lg fr-mb-0 fr-text--medium">
            Nombre d'utilisateurs actifs
            <Tooltip title="Un utilisateur est considéré actif lorsqu'il s'est connecté au moins 1 fois sur les 30 derniers jours.">
              <span className="ri-question-line fr-ml-1v fr-text-label--blue-france" />
            </Tooltip>
          </span>
          <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
            sur les 30 derniers jours
          </div>
        </Card>
      </div>
    </div>
  )
}

export default KpiSection
