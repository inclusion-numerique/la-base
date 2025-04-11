import React from 'react'
import {
  getStatistics,
  StatisticsParams,
} from '@app/web/server/statistiques/getStatistics'
import Card from '@app/web/components/Card'
import { numberToString } from '@app/web/utils/formatNumber'
import StatisticsChart from './StatisticsChart'
import KeyFigureTitle from './KeyFigureTitle'
import SelectPeriod from './SelectPeriod'
import TargetAudiences from './TargetAudiences'
import Thematiques from './Thematiques'

const StatisticsPage = async ({
  searchParams,
}: {
  searchParams: StatisticsParams
}) => {
  const { kpi, search, creation, usage } = await getStatistics(searchParams)

  return (
    <>
      <section>
        <h2 className="fr-h3 fr-mb-4w">
          Chiffres clés pour suivre l’usage du service
        </h2>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-3">
            <Card
              title={
                <KeyFigureTitle type="publications">
                  {numberToString(kpi.publications.count)}
                </KeyFigureTitle>
              }
              titleAs="div"
            >
              Nombre total de ressources publiées
              <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
                dont {numberToString(kpi.publications.public)} publiques et{' '}
                {numberToString(kpi.publications.private)} privées
              </div>
            </Card>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-3">
            <Card
              title={
                <KeyFigureTitle type="views">
                  {numberToString(kpi.views.count)}
                </KeyFigureTitle>
              }
              titleAs="div"
            >
              Nombre total de vues de ressources
              <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
                dont {numberToString(kpi.views.lastMonth)} sur les 30 derniers
                jours
              </div>
            </Card>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-3">
            <Card
              title={
                <KeyFigureTitle type="rates">
                  {numberToString(kpi.rates.average)}/10
                </KeyFigureTitle>
              }
              titleAs="div"
            >
              Indice de satisfaction globale
              <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
                sur {numberToString(kpi.rates.count)} avis
              </div>
            </Card>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-3">
            <Card
              title={
                <KeyFigureTitle type="users">
                  {numberToString(kpi.recentUsers)}
                </KeyFigureTitle>
              }
              titleAs="div"
            >
              Nombre de membres avec une activité
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
              Données pour comprendre l’usage de la recherche
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
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <StatisticsChart
              title="Nombre de recherches effectuées"
              data={search}
              xAxisDataKey="start_date"
              tooltipLabelDataKey="period"
              dataKeys={['search_executions']}
              legends={[
                {
                  label: 'Recherches effectuées',
                  key: 'search_executions',
                },
              ]}
            />
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <StatisticsChart
              title="Nombre de vues de ressources"
              data={search}
              xAxisDataKey="start_date"
              tooltipLabelDataKey="period"
              dataKeys={['resource_views']}
              legends={[
                {
                  label: 'Vues de ressources',
                  key: 'resource_views',
                },
              ]}
            />
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <StatisticsChart
              title="Nombre de ressources enregistrées"
              data={search}
              xAxisDataKey="start_date"
              tooltipLabelDataKey="period"
              dataKeys={['collection_resources']}
              legends={[
                {
                  label: 'Ressources enregistrées',
                  key: 'collection_resources',
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
              Données pour comprendre
              <br />
              la création de ressources, bases & profils
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
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <StatisticsChart
              title="Nombre de ressources publiées"
              titleClassName="fr-h6"
              data={creation.data}
              xAxisDataKey="start_date"
              tooltipLabelDataKey="period"
              dataKeys={['private_resources', 'public_resources']}
              legends={[
                {
                  label: 'Ressources privées',
                  value: `${creation.proportions.privateResources}%`,
                  key: 'private_resources',
                },
                {
                  label: 'Ressources publiques',
                  value: `${creation.proportions.publicResources}%`,
                  key: 'public_resources',
                },
              ]}
              showLegendBelowChart
            />
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
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
                  key: 'private_users',
                },
                {
                  label: 'Profils publics',
                  value: `${creation.proportions.publicUsers}%`,
                  key: 'public_users',
                },
              ]}
              showLegendBelowChart
            />
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
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
                  key: 'private_bases',
                },
                {
                  label: 'Bases publiques',
                  value: `${creation.proportions.publicBases}%`,
                  key: 'public_bases',
                },
              ]}
              showLegendBelowChart
            />
          </div>
        </div>
      </section>
      <hr className="fr-separator-6v fr-separator-md-12v" />
      <section>
        <div className="fr-flex-md fr-justify-content-space-between fr-align-items-center fr-flex-gap-4v fr-mb-4w">
          <div>
            <h2 className="fr-h3 fr-mb-0">
              Données pour comprendre le contenu des ressources ainsi que les
              publics visés
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
            <Thematiques thematiques={usage.thematiques} />
          </div>
          <div className="fr-col-12 fr-col-lg-6">
            <TargetAudiences targetAudiences={usage.publics} />
          </div>
        </div>
      </section>
    </>
  )
}

export default StatisticsPage
