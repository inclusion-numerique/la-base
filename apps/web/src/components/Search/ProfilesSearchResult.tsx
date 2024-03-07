import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import ProfileCard from '@app/web/components/Profile/Card/ProfileCard'
import EmptyBox from '@app/web/components/EmptyBox'
import ResultSortingSelect from '@app/web/components/Search/ResultSortingSelect'
import {
  PaginationParams,
  SearchParams,
} from '@app/web/server/search/searchQueryParams'
import styles from './SearchContents.module.css'

const ProfilesSearchResult = ({
  profiles,
  totalCount,
  user,
  searchParams,
  paginationParams,
}: {
  profiles: ProfileListItem[]
  totalCount: number
  searchParams: SearchParams
  paginationParams: PaginationParams
  user: SessionUser | null
}) => (
  <>
    <div className={styles.header}>
      <h1 className="fr-text--lg fr-mb-0">
        {totalCount} Profil{sPluriel(totalCount)}
      </h1>
      <ResultSortingSelect
        paginationParams={paginationParams}
        searchParams={searchParams}
        tab="profils"
      />
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
