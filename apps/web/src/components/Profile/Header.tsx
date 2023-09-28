import React from 'react'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { FilteredProfile } from '@app/web/server/profiles/authorization'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import CopyLinkButton from '../CopyLinkButton'
import styles from './Header.module.css'
import ProfileInformations from './ProfileInformations'

const Header = ({
  profile,
  isConnectedUser,
  resourcesCount,
}: {
  profile: ProfilePageData | FilteredProfile
  isConnectedUser?: boolean
  resourcesCount: number
}) => (
  <div className={styles.container}>
    <div className="fr-container">
      <Breadcrumbs
        currentPage={isConnectedUser ? 'Mon Profil' : `${profile.name || ''}`}
      />
      <ProfileInformations profile={profile} resourcesCount={resourcesCount}>
        {isConnectedUser ? (
          <Link
            data-testid="profile-edition-button"
            className="fr-mt-2w fr-btn fr-btn--secondary fr-icon-edit-line fr-btn--icon-left"
            href={`/profils/${profile.id}/editer`}
          >
            Modifier le profil
          </Link>
        ) : (
          <div className={styles.buttons}>
            <Button iconId="fr-icon-user-heart-line" size="small">
              Suivre
            </Button>
            <Link
              className="fr-btn--sm fr-btn fr-btn--secondary fr-icon-mail-line fr-btn--icon-left"
              href={`mailto:${profile.email}`}
            >
              Contacter
            </Link>
            <Button
              iconId="fr-icon-warning-line"
              size="small"
              priority="secondary"
            >
              Signaler
            </Button>
            <CopyLinkButton
              url={getServerUrl(`/profils/${profile.id}`, true)}
              priority="secondary"
            >
              Partager
            </CopyLinkButton>
          </div>
        )}
      </ProfileInformations>
    </div>
  </div>
)

export default Header
