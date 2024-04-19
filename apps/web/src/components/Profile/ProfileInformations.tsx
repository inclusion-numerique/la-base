import React, { PropsWithChildren } from 'react'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { ProfilePrivacyTag } from '@app/web/components/PrivacyTags'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import ProfileMetadata from './ProfileMetadata'
import ImageEdition from './Edition/ProfileImageEdition'

const ProfileInformations = ({
  profile,
  resourcesCount,
  children,
  editMode,
}: {
  profile: ProfilePageData
  resourcesCount: number
  editMode?: boolean
} & PropsWithChildren) => (
  <div className="fr-flex-md fr-direction-row fr-flex-gap-8v fr-justify-content-center fr-text--center">
    <RoundProfileImage user={profile} size={128} borderWidth={1} />
    <div className="fr-flex-md fr-direction-column fr-align-items-md-start fr-align-items-center">
      {editMode && <ImageEdition profile={profile} />}
      <div className="fr-flex-md fr-flex-column fr-flex-gap-4v fr-align-items-baseline">
        <div>
          <h1 className="fr-h2 fr-text-title--blue-france fr-mb-0 fr-mt-md-0 fr-mt-2w">
            {profile.name}
          </h1>
          <div className="fr-mt-1v fr-mb-md-3w fr-mb-2w">
            <ProfileMetadata
              resourcesCount={resourcesCount}
              followedByCount={profile._count.followedBy}
            />
          </div>
        </div>
        <div>
          <ProfilePrivacyTag isPublic={profile.isPublic} />
        </div>
      </div>
      {children}
    </div>
  </div>
)

export default ProfileInformations
