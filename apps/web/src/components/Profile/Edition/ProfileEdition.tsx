import React from 'react'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import ProfileInformations from '../ProfileInformations'
import ProfileSideMenu from './ProfileEditionSideMenu'
import ProfileInformationsEdition from './ProfileInformationsEdition'
import ProfileVisibilityEdition from './ProfileVisibilityForm'

const ProfileEdition = ({
  profile,
  resources,
}: {
  profile: ProfilePageData
  resources: ResourceListItem[]
}) => (
  <>
    <div className="fr-grid-row">
      <div className="fr-col-offset-lg-3">
        <ProfileInformations
          profile={profile}
          resourcesCount={resources.length}
          editMode
        />
      </div>
    </div>
    <div className="fr-grid-row">
      <ProfileSideMenu />
      <div className="fr-col-12 fr-col-lg-6">
        <div className="fr-grid-row fr-grid-row--gutters fr-mb-1w">
          <div className="fr-col-12">
            <ProfileInformationsEdition profile={profile} />
          </div>
          <div className="fr-col-12">
            <ProfileVisibilityEdition profile={profile} resources={resources} />
          </div>
        </div>
      </div>
    </div>
  </>
)

export default ProfileEdition
