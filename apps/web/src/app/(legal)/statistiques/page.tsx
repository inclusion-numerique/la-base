import Beneficiaries from '@app/web/app/(legal)/statistiques/Beneficiaries'
import ProfessionalSectors from '@app/web/app/(legal)/statistiques/ProfessionalSectors'
import ResourcesTypes from '@app/web/app/(legal)/statistiques/ResourcesTypes'
import Card from '@app/web/components/Card'
import {
  getStatistics,
  type StatisticsParams,
} from '@app/web/server/statistiques/getStatistics'
import { numberToString } from '@app/web/utils/formatNumber'
import Tooltip from '@codegouvfr/react-dsfr/Tooltip'
import classNames from 'classnames'
import KeyFigureTitle from './KeyFigureTitle'
import SelectPeriod from './SelectPeriod'
import StatisticsChart from './StatisticsChart'
import styles from './StatisticsPage.module.css'
import Thematiques from './Thematiques'

const StatisticsPage = async ({
  searchParams,
}: {
  searchParams: Promise<StatisticsParams>
}) => {
  const statisticsParams = await searchParams
  const { kpi, search, creation, usage } = await getStatistics(statisticsParams)

  return (
    <>
      <section>
        <h2 className="fr-h3 fr-mb-4w">
          Chiffres clés pour suivre l’usage de la plateforme
        </h2>
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
                dont {numberToString(kpi.views.lastMonth)} sur les 30 derniers
                jours
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
                <Tooltip title="Un utilisateur est considéré actif lorsqu’il s’est connecté au moins 1 fois sur les 30 derniers jours.">
                  <span className="ri-question-line fr-ml-1v fr-text-label--blue-france" />
                </Tooltip>
              </span>
              <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
                sur les 30 derniers jours
              </div>
            </Card>
          </div>
        </div>
      </section>
      <hr className="fr-separator-6v fr-separator-md-12v" />
      <section>
        <div className="fr-flex-md fr-justify-content-space-between fr-align-items-center fr-flex-gap-4v fr-mb-4w">
          <div>
            <h2 className="fr-h3 fr-mb-0">
              Données pour suivre l'évolution de l’usage de la recherche
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
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12">
            <StatisticsChart
              title="Nombre de vues de ressources"
              data={search.resourceViews.data}
              xAxisDataKey="start_date"
              tooltipLabelDataKey="period"
              dataKeys={['value']}
              legend="above"
              legends={[
                { label: 'Vues de ressources', key: 'value' },
                {
                  label: 'Au total : ',
                  total: numberToString(search.resourceViews.total),
                },
              ]}
            />
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <StatisticsChart
              title="Nombre de recherches effectuées"
              data={search.searchExecutions.data}
              xAxisDataKey="start_date"
              tooltipLabelDataKey="period"
              dataKeys={['value']}
              legend="belowTitle"
              legends={[
                { label: 'Recherches effectuées', key: 'value' },
                {
                  label: 'Au total : ',
                  total: numberToString(search.searchExecutions.total),
                },
              ]}
            />
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <StatisticsChart
              title="Nombre de ressources enregistrées"
              data={search.collectionResources.data}
              xAxisDataKey="start_date"
              tooltipLabelDataKey="period"
              dataKeys={['value']}
              legend="belowTitle"
              legends={[
                { label: 'Ressources enregistrées', key: 'value' },
                {
                  label: 'Au total : ',
                  total: numberToString(search.collectionResources.total),
                },
              ]}
            />
          </div>
        </div>
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
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12">
            <StatisticsChart
              title="Nombre de ressources publiées"
              data={creation.data}
              xAxisDataKey="start_date"
              tooltipLabelDataKey="period"
              dataKeys={['private_resources', 'public_resources']}
              legends={[
                {
                  label: 'Ressources privées : ',
                  value: `${creation.proportions.privateResources}%`,
                  total: numberToString(creation.totals.privateResources),
                  key: 'private_resources',
                },
                {
                  label: 'Ressources publiques : ',
                  value: `${creation.proportions.publicResources}%`,
                  total: numberToString(creation.totals.publicResources),
                  key: 'public_resources',
                },
                {
                  label: 'Au total : ',
                  total: numberToString(
                    Number(
                      creation.totals.publicResources +
                        creation.totals.privateResources,
                    ),
                  ),
                },
              ]}
              legend="above"
            />
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <StatisticsChart
              title="Nombre de profils créés"
              data={creation.data}
              xAxisDataKey="start_date"
              tooltipLabelDataKey="period"
              dataKeys={['private_users', 'public_users']}
              legends={[
                {
                  label: 'Profils privés',
                  value: `${creation.proportions.privateUsers}%`,
                  total: numberToString(creation.totals.privateUsers),
                  key: 'private_users',
                },
                {
                  label: 'Profils publics',
                  value: `${creation.proportions.publicUsers}%`,
                  total: numberToString(creation.totals.publicUsers),
                  key: 'public_users',
                },
              ]}
              legend="below"
            />
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <StatisticsChart
              title="Nombre de bases créées"
              data={creation.data}
              xAxisDataKey="start_date"
              tooltipLabelDataKey="period"
              dataKeys={['private_bases', 'public_bases']}
              legends={[
                {
                  label: 'Bases privées',
                  value: `${creation.proportions.privateBases}%`,
                  total: numberToString(creation.totals.privateBases),
                  key: 'private_bases',
                },
                {
                  label: 'Bases publiques',
                  value: `${creation.proportions.publicBases}%`,
                  total: numberToString(creation.totals.publicBases),
                  key: 'public_bases',
                },
              ]}
              legend="below"
            />
          </div>
        </div>
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
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-lg-6">
            <ResourcesTypes resourceTypes={usage.resourceTypes} />
          </div>
          <div className="fr-col-12 fr-col-lg-6">
            <ProfessionalSectors
              professionalSectors={usage.professionalSectors}
            />
          </div>
          <div className="fr-col-12 fr-col-lg-6">
            <Thematiques thematiques={usage.thematiques} />
          </div>
          <div className="fr-col-12 fr-col-lg-6">
            <Beneficiaries beneficiaries={usage.beneficiaries} />
          </div>
        </div>
      </section>
    </>
  )
}

export default StatisticsPage
