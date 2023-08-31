import React from 'react'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import ProfileInformations from '../ProfileInformations'
import ProfileSideMenu from './SideMenu'
import styles from './EditProfile.module.css'
import Visibility from './Visibility'

const EditProfile = ({
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
        withPictureModification
      />
      <Visibility isPublic={profile.isPublic} />
    </div>
  </div>
)

export default EditProfile
