import type { SessionUser } from '@app/web/auth/sessionUser'
import LesBasesSvgLogo from '@app/web/components/LesBasesSvgLogo'
import ProfileBaseCard from '@app/web/features/profil/base/components/ProfileBaseCard'
import type { BaseProfileListItemWithAllFields } from '@app/web/server/bases/getBasesList'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import React from 'react'
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
  <div data-testid="base-resources">
    <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-reverse fr-mb-4w">
      <div className="fr-col-sm-auto fr-col-12">
        <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
          <LesBasesSvgLogo />
          <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
            Mes bases · {bases.length}
          </h2>
        </div>
      </div>
      {isOwner && canWrite && (
        <div className="fr-col-sm-auto fr-col-12 fr-mb-5w fr-mb-md-2w">
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
        titleAs="h3"
        isOwner={isOwner}
      />
    ))}
  </div>
)

export default ProfileBases
