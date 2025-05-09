import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { SessionUser } from '@app/web/auth/sessionUser'
import EmptyBox from '@app/web/components/EmptyBox'
import ProfileCard from '@app/web/components/Profile/Card/ProfileCard'
import type { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import { numberToString } from '@app/web/utils/formatNumber'
import React, { type ReactNode } from 'react'
import styles from './SearchContents.module.css'

const ProfilesSearchResult = ({
  totalCount,
  profiles,
  user,
  children,
}: {
  totalCount: number
  profiles: ProfileListItem[]
  user: SessionUser | null
  children: ReactNode
}) => (
  <>
    <div className={styles.header}>
      <h1 className="fr-text--lg fr-mb-0">
        {numberToString(totalCount)} Profil{sPluriel(totalCount)}
      </h1>
      {children}
    </div>
    {profiles.length > 0 ? (
      profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} user={user} />
      ))
    ) : (
      <EmptyBox title="Aucun résultat pour votre recherche">
        Veuillez réessayer avec différents mots-clés.
      </EmptyBox>
    )}
  </>
)

export default ProfilesSearchResult
