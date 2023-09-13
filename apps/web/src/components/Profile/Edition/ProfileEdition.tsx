import React from 'react'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import ProfileInformations from '../ProfileInformations'
import ProfileSideMenu from './SideMenu'
import styles from './ProfileEdition.module.css'
import Visibility from './Visibility'

const ProfileEdition = ({
  profile,
  resourcesCount,
}: {
  profile: ProfilePageData
  resourcesCount: number
}) => (
  <div className={styles.container}>
    <ProfileSideMenu />
    <div>
      <ProfileInformations
        profile={profile}
        resourcesCount={resourcesCount}
        editMode
      />
      <Visibility isPublic={profile.isPublic} />
    </div>
  </div>
)

export default ProfileEdition
