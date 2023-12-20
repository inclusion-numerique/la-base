import React from 'react'
import { Resource } from '@app/web/server/resources/getResource'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import {
  BasePrivacyTag,
  ProfilePrivacyTag,
} from '@app/web/components/PrivacyTags'
import { SessionUser } from '@app/web/auth/sessionUser'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import BaseImage from '@app/web/components/BaseImage'
import styles from './PublicationView.module.css'

const PublicationView = ({
  resource,
  user,
}: {
  resource: ResourceProjectionWithContext | Resource
  user: SessionUser
}) =>
  resource.base ? (
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
          <RoundProfileImage className="fr-mr-1w" user={resource.createdBy} />
          <span>Publié par {resource.createdBy.name}</span>
        </div>
        <ProfilePrivacyTag isPublic={user.isPublic} />
      </div>
    )
  )

export default PublicationView
