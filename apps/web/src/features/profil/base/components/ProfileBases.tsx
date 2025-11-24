import type { SessionUser } from '@app/web/auth/sessionUser'
import IconInSquare from '@app/web/components/IconInSquare'
import ProfileBaseCard from '@app/web/features/profil/base/components/ProfileBaseCard'
import type { BaseProfileListItemWithAllFields } from '@app/web/server/bases/getBasesList'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { CreateBaseButton } from '../../../../components/Base/CreateBaseButton'

const ProfileBases = ({
  profile,
  user,
  bases,
  canWrite,
  isOwner,
}: {
  profile: ProfilePageData
  user: SessionUser | null
  bases: BaseProfileListItemWithAllFields[]
  canWrite: boolean
  isOwner: boolean
}) => (
  <div data-testid="base-profiles">
    <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-md-reverse fr-mb-5w">
      <div className="fr-col-sm-auto fr-col-12">
        <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
          <IconInSquare iconId="ri-team-line" />
          <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
            {isOwner ? 'Mes bases' : 'Bases'} · {bases.length}
          </h2>
        </div>
      </div>
      {isOwner && canWrite && (
        <div className="fr-col-sm-auto fr-col-12 fr-mt-4w fr-mt-md-0">
          <CreateBaseButton className="fr-btn--secondary fr-width-full fr-justify-content-center" />
        </div>
      )}
    </div>
    {bases.map((base) => (
      <ProfileBaseCard
        profile={profile}
        user={user}
        base={base}
        key={base.slug}
        isOwner={isOwner}
      />
    ))}
  </div>
)

export default ProfileBases
