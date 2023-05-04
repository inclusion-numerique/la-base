import { PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from './PrivacyTags.module.css'

const PublicTag = ({ children }: PropsWithChildren) => (
  <span
    className={classNames(
      'fr-tag',
      'fr-tag--icon-left',
      'fr-icon-earth-fill',
      'fr-text--medium',
      styles.public,
    )}
  >
    {children}
  </span>
)
const PrivateTag = ({ children }: PropsWithChildren) => (
  <span className="fr-tag fr-tag--icon-left fr-icon-lock-line fr-text--medium">
    {children}
  </span>
)

export const ProfilePrivacyTag = ({ isPublic }: { isPublic?: boolean }) =>
  isPublic ? (
    <PublicTag>Profil public</PublicTag>
  ) : (
    <PrivateTag>Profil privé</PrivateTag>
  )
export const BasePrivacyTag = ({ isPublic }: { isPublic?: boolean }) =>
  isPublic ? (
    <PublicTag>Base publique</PublicTag>
  ) : (
    <PrivateTag>Base privée</PrivateTag>
  )
