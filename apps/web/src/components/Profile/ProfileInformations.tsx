import type { SessionUser } from '@app/web/auth/sessionUser'
import { ProfilePrivacyTag } from '@app/web/components/PrivacyTags'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import type { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { formatName } from '@app/web/server/rpc/user/formatName'
import { type PropsWithChildren } from 'react'
import ImageEdition from './Edition/ProfileImageEdition'
import ProfileMetadata from './ProfileMetadata'

const ProfileInformations = ({
  profile,
  resourcesCount,
  children,
  editMode,
  context,
  user,
}: {
  profile: ProfilePageData
  resourcesCount: number
  editMode?: boolean
  context: 'base' | 'profile' | 'card'
  user: SessionUser | null
} & PropsWithChildren) => (
  <div className="fr-flex-md fr-direction-row fr-justify-content-center fr-flex-gap-6v fr-align-items-center fr-text--center">
    <div className="fr-my-2w fr-position-relative">
      <RoundProfileImage user={profile} size={128} borderWidth={1} />
      {editMode && <ImageEdition profile={profile} />}
    </div>
    <div>
      <div className="fr-flex-md fr-flex-column fr-flex-gap-4v fr-align-items-baseline">
        <div>
          <div className="fr-flex fr-flex-gap-4v fr-align-items-center fr-justify-content-center ">
            <h1 className="fr-h2 fr-text-title--blue-france fr-mb-0">
              {profile.name && formatName(profile.name)}
            </h1>
            <div className="fr-unhidden-md fr-hidden">
              <ProfilePrivacyTag isPublic={profile.isPublic} />
            </div>
          </div>
          <div className="fr-mt-1v">
            {context === 'profile' ? (
              <ProfileMetadata
                resourcesCount={resourcesCount}
                followedByData={profile.followedByData}
                context="profile"
                user={user}
              />
            ) : (
              <ProfileMetadata
                resourcesCount={resourcesCount}
                followedByCount={profile._count.followedBy}
                context={context}
                user={user}
              />
            )}
          </div>
        </div>
        <div className="fr-unhidden fr-hidden-md fr-mt-2w">
          <ProfilePrivacyTag isPublic={profile.isPublic} />
        </div>
      </div>
      {children}
    </div>
  </div>
)

export default ProfileInformations
