import RoundProfileImage from '@app/web/components/RoundProfileImage'
import AdminBaseAcceptJoinRequest from '@app/web/features/base/join-requests/components/AdminBaseAcceptJoinRequest'
import AdminBaseDeclineJoinRequest from '@app/web/features/base/join-requests/components/AdminBaseDeclineJoinRequest'
import { getBasePendingJoinRequestsContext } from '@app/web/features/base/join-requests/db/getBasePendingJoinRequestsContext'
import { BasePageData } from '@app/web/server/bases/getBase'
import Button from '@codegouvfr/react-dsfr/Button'

export const AdminBasePendingJoinRequests = async ({
  base,
}: {
  base: BasePageData
}) => {
  const { data, count } = await getBasePendingJoinRequestsContext({
    baseId: base.id,
  })
  if (count === 0) {
    return null
  }

  return (
    <div className="fr-pt-1w fr-pb-6w">
      <div className="fr-flex fr-flex-gap-2v fr-align-items-center fr-mb-1w">
        <span className="ri-loader-line" aria-hidden />
        <span className="fr-text-mention--grey fr-text--uppercase fr-text--xs fr-text--bold fr-mb-0">
          Demande à rejoindre votre base en attente · {count}
        </span>
      </div>
      {data.map((joinRequest) => (
        <div
          key={joinRequest.id}
          className="fr-flex fr-direction-column fr-direction-sm-row fr-align-items-md-center fr-justify-content-space-between fr-p-2w fr-p-md-4w fr-background-alt--blue-france fr-border-radius--8 fr-mb-2v"
        >
          <div className="fr-flex fr-flex-gap-3v fr-align-items-center">
            <RoundProfileImage user={joinRequest.applicant} />
            <div className="fr-flex fr-direction-column">
              <span className="fr-text--bold fr-mb-0">
                {joinRequest.applicant.firstName &&
                joinRequest.applicant.lastName
                  ? `${joinRequest.applicant.firstName} ${joinRequest.applicant.lastName}`
                  : joinRequest.applicant.name || joinRequest.applicant.email}
              </span>
              <span className="fr-text-mention--grey fr-text--sm fr-mb-0">
                {joinRequest.applicant.email}
              </span>
            </div>
          </div>
          <div className="fr-flex fr-direction-sm-row fr-direction-column fr-flex-gap-2v fr-align-items-md-center">
            <Button
              size="small"
              priority="tertiary no outline"
              linkProps={{ href: `/profils/${joinRequest.applicant.slug}` }}
            >
              Voir le profil
            </Button>
            <div className="fr-flex fr-flex-gap-2v">
              <AdminBaseDeclineJoinRequest request={joinRequest} />
              <AdminBaseAcceptJoinRequest request={joinRequest} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
