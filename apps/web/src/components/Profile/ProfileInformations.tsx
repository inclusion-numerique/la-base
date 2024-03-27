import React, { PropsWithChildren } from 'react'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { ProfilePrivacyTag } from '@app/web/components/PrivacyTags'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import ProfileMetadata from './ProfileMetadata'
import styles from './ProfileInformations.module.css'
import ProfileImageEdition from './Edition/ProfileImageEdition'

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
  <div
    className={editMode ? styles.profileEditionHeader : styles.profileHeader}
  >
    <div className={styles.profileImageContainer}>
      <RoundProfileImage user={profile} size={128} borderWidth={1} />
      {editMode && <ProfileImageEdition profile={profile} />}
    </div>
    <div>
      <div className="fr-flex fr-direction-column fr-direction-md-row fr-align-items-center fr-width-full fr-flex-gap-4v">
        <h1 className="fr-h2 fr-m-0 fr-text-title--blue-france">
          {profile.name}
        </h1>
        <ProfilePrivacyTag isPublic={profile.isPublic} />
      </div>
      <ProfileMetadata
        resourcesCount={resourcesCount}
        followedByCount={profile._count.followedBy}
      />
      {children}
    </div>
  </div>
)

export default ProfileInformations
