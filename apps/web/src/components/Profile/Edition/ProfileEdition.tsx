import React from 'react'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import ProfileInformations from '../ProfileInformations'
import ProfileSideMenu from './SideMenu'
import styles from './ProfileEdition.module.css'
import Visibility from './Visibility'

const ProfileEdition = ({
  profile,
  resources,
}: {
  profile: ProfilePageData
  resources: ResourceListItem[]
}) => (
  <div className={styles.container}>
    <ProfileSideMenu />
    <div>
      <ProfileInformations
        profile={profile}
        resourcesCount={resources.length}
        editMode
      />
      <Visibility profile={profile} resources={resources} />
    </div>
  </div>
)

export default ProfileEdition
