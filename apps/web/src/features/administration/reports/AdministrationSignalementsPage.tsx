import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import { ReasonBadge } from '@app/web/features/administration/reports/components/ReasonBadge'
import ReportedResourceDeletion from '@app/web/features/administration/reports/components/ReportedResourceDeletion'
import ResolveReportedResourceModal from '@app/web/features/administration/reports/components/ResolveReportedResourceModal'
import ResourceReportUpdateForm from '@app/web/features/administration/reports/components/ResourceReportUpdateForm'
import { getReportedResourcesList } from '@app/web/features/administration/reports/db/getReportedResourcesList'
import { dateFormatter } from '@app/web/utils/formatDate'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'

export const reportDateFormatter = dateFormatter("dd/MM/yyyy à HH'h'mm")

const AdministrationSignalementsPage = async () => {
  const user = await getSessionUser()
  const reportedResources = await getReportedResourcesList(user)

  return (
    <AdministrationPageContainer>
      <AdministrationBreadcrumbs currentPage="Signalements" />
      <AdministrationTitle icon="ri-alert-line">
        Signalements
      </AdministrationTitle>
      <div className="fr-flex fr-direction-column fr-flex-gap-6v">
        <span className="fr-text--lg fr-text--bold fr-mb-0">
          {reportedResources.length} signalements à traiter
        </span>
        {reportedResources.map((report) => (
          <AdministrationInfoCard key={report.id}>
            <div className="fr-flex fr-direction-column fr-flex-gap-4v">
              <span>
                Signalement
                {report.sentBy && (
                  <>
                    &nbsp;de&nbsp;
                    <Link
                      className="fr-link fr-link--no-underline"
                      href={`/profils/${report.sentBy?.slug}`}
                    >
                      {report.sentBy?.name}
                    </Link>
                  </>
                )}
                &nbsp;· le {reportDateFormatter(report.created)}
              </span>
              <ReasonBadge reason={report.reason} />
              {report.comment}
              {report.sentBy && (
                <span className="fr-text--sm fr-text-mention--grey fr-mb-0">
                  Contactez par mail&nbsp;:{' '}
                  <Link
                    href={`mailto:${report.sentBy?.email}`}
                    className="fr-link fr-text--sm"
                  >
                    {report.sentBy?.email}
                  </Link>
                </span>
              )}
            </div>
            <div className="fr-mt-5w">
              <span className="fr-text--xs fr-text--bold fr-text--uppercase">
                Ressource signalée
              </span>

              <div className="fr-border fr-border-radius--8 fr-p-3w fr-mt-2w fr-flex fr-justify-content-space-between fr-align-items-center">
                <div className="fr-flex fr-direction-column fr-flex-gap-2v">
                  <OwnershipInformation
                    user={report.resource.createdBy}
                    base={report.resource.base}
                    attributionWording="resource"
                  />
                  <span className="fr-mb-0 fr-h6">{report.resource.title}</span>
                </div>
                <div className="fr-flex fr-direction-column fr-flex-gap-2v">
                  <Button
                    priority="secondary"
                    linkProps={{
                      href: `/ressources/${report.resource.slug}`,
                      target: '_blank',
                    }}
                  >
                    Voir la ressource
                  </Button>
                </div>
              </div>
              <div className="fr-mt-5w">
                <ResourceReportUpdateForm reportedResource={report} />
              </div>
              <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
                <div className="fr-col-4">
                  <span className="fr-text--xs fr-text-mention--grey fr-mb-0">
                    Contactez par mail le créateur de la ressource&nbsp;:{' '}
                  </span>
                  <Link
                    href={`mailto:${report.resource.createdBy.email}`}
                    className="fr-link fr-text--sm"
                  >
                    {report.resource.createdBy.email}
                  </Link>
                </div>
                <div className="fr-flex fr-flex-gap-4v">
                  <ReportedResourceDeletion
                    resource={report.resource}
                    user={user}
                  />
                  <ResolveReportedResourceModal reportId={report.id} />
                </div>
              </div>
            </div>
          </AdministrationInfoCard>
        ))}
      </div>
    </AdministrationPageContainer>
  )
}

export default AdministrationSignalementsPage
