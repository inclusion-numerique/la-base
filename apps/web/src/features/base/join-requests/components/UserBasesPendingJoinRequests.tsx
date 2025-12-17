import type { SessionUser } from '@app/web/auth/sessionUser'
import BaseCancelJoinRequest from '@app/web/features/base/join-requests/components/BaseCancelJoinRequest'
import { getUserBasesJoinRequestsContext } from '@app/web/features/base/join-requests/db/getUserBasesJoinRequestsContext'
import { getAdminMailToUrl } from '@app/web/features/base/join-requests/utils/mailToUrl'
import ProfileBaseCard from '@app/web/features/profil/base/components/ProfileBaseCard'
import Button from '@codegouvfr/react-dsfr/Button'
import styles from './UserBasesPendingJoinRequests.module.css'

export const UserBasesPendingJoinRequests = async ({
  user,
}: {
  user: SessionUser | null
}) => {
  if (!user) {
    return null
  }

  const { data, count } = await getUserBasesJoinRequestsContext({
    user,
  })
  if (count === 0) {
    return null
  }

  return (
    <div className="fr-pt-1w fr-pb-6w">
      <div className="fr-flex fr-flex-gap-2v fr-align-items-center fr-mb-1w">
        <span className="ri-loader-line" aria-hidden />
        <span className="fr-text-mention--grey fr-text--uppercase fr-text--xs fr-text--bold fr-mb-0">
          Demande à rejoindre une base en attente · {count}
        </span>
      </div>
      {data.map(({ base }) => (
        <div
          key={base.id}
          className="fr-flex fr-align-items-center fr-justify-content-space-between fr-p-md-4w fr-background-alt--blue-france fr-border-radius--8"
        >
          <ProfileBaseCard
            className={styles.contentContainer}
            base={base}
            user={user}
            isOwner={false}
          />
          <div className="fr-flex fr-flex-gap-2v fr-align-items-center">
            <Button
              priority="tertiary no outline"
              size="small"
              linkProps={{
                href: getAdminMailToUrl(base.members),
              }}
            >
              Contacter
              <span className="ri-mail-line fr-ml-1w" aria-hidden />
            </Button>
            <BaseCancelJoinRequest base={base} />
          </div>
        </div>
      ))}
    </div>
  )
}
