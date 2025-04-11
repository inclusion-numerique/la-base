import React, { ReactNode } from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import ProfileCard from '@app/web/components/Profile/Card/ProfileCard'
import EmptyBox from '@app/web/components/EmptyBox'
import { numberToString } from '@app/web/utils/formatNumber'
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
