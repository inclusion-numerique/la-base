import type { ProfilePageData } from '@app/web/server/profiles/getProfile'
import type { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import classNames from 'classnames'
import ProfileInformations from '../ProfileInformations'
import ProfileContactsEdition from './ProfileContactsEdition'
import ProfileDeletion from './ProfileDeletion'
import styles from './ProfileEdition.module.css'
import ProfileSideMenu from './ProfileEditionSideMenu'
import ProfileInformationsEdition from './ProfileInformationsEdition'
import ProfileNotificationsEdition from './ProfileNotificationsEdition'
import ProfileVisibilityEdition from './ProfileVisibilityForm'

const ProfileEdition = ({
  profile,
  resources,
  reportEmailNotifications,
}: {
  profile: ProfilePageData
  resources: ResourceListItem[]
  reportEmailNotifications: boolean | null
}) => (
  <>
    <div className="fr-grid-row">
      <div className="fr-col-offset-lg-3 fr-mb-5w fr-mx-auto">
        <ProfileInformations
          user={null}
          profile={profile}
          resourcesCount={resources.length}
          editMode
          context="card"
        />
      </div>
    </div>
    <div className="fr-grid-row">
      <ProfileSideMenu withNotifications={reportEmailNotifications !== null} />
      <div className={classNames(styles.container, 'fr-col-12 fr-col-lg-6')}>
        <div className="fr-grid-row fr-grid-row--gutters fr-mb-1w">
          <div className="fr-col-12">
            <ProfileInformationsEdition profile={profile} />
          </div>
          <div className="fr-col-12">
            <ProfileContactsEdition profile={profile} />
          </div>
          <div className="fr-col-12">
            <ProfileVisibilityEdition profile={profile} resources={resources} />
          </div>
          {reportEmailNotifications !== null && (
            <div className="fr-col-12">
              <ProfileNotificationsEdition
                reportEmailNotifications={reportEmailNotifications}
              />
            </div>
          )}
          <div className="fr-col-12">
            <ProfileDeletion userId={profile.id} />
          </div>
        </div>
      </div>
    </div>
  </>
)

export default ProfileEdition
