import type { SessionUser } from '@app/web/auth/sessionUser'
import BaseImage from '@app/web/components/BaseImage'
import {
  BasePrivacyTag,
  ProfilePrivacyTag,
} from '@app/web/components/PrivacyTags'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import type { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import Notice from '@codegouvfr/react-dsfr/Notice'
import styles from './ResourcePublicationView.module.css'

const ResourcePublicationView = ({
  isCreator,
  resource,
  user,
}: {
  isCreator: boolean
  resource: ResourceProjectionWithContext
  user: SessionUser
}) => {
  const isContributor = resource.contributors.some(
    (contributor) => contributor.contributorId === user.id,
  )
  return (
    <>
      {(!!isContributor || !isCreator) && (
        <Notice
          className="fr-mb-3w"
          title="En tant que contributeur, vous ne pouvez pas modifier le lieu de publication de la ressource."
        />
      )}
      {resource.base ? (
        <div className={styles.baseInfo}>
          <div className={styles.baseName}>
            <BaseImage className="fr-mr-1w" base={resource.base} />
            <span>{resource.base.title}</span>
          </div>
          <BasePrivacyTag isPublic={resource.base.isPublic} />
        </div>
      ) : (
        resource.createdBy && (
          <div className={styles.baseInfo}>
            <div className={styles.baseName}>
              <RoundProfileImage
                className="fr-mr-1w"
                user={resource.createdBy}
              />
              {resource.createdBy.name}
            </div>
            <ProfilePrivacyTag isPublic={user.isPublic} />
          </div>
        )
      )}
    </>
  )
}

export default ResourcePublicationView
