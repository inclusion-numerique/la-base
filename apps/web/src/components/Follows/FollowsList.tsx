import Link from 'next/link'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import React from 'react'
import {
  BaseFollowListItem,
  ProfileFollowListItem,
} from '@app/web/server/follows/getFollowsList'
import EmptyBox from '@app/web/components/EmptyBox'
import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import ProfileCard from '@app/web/components/Profile/Card/ProfileCard'
import BaseCard from '@app/web/components/Base/Card/BaseCard'
import { SessionUser } from '@app/web/auth/sessionUser'

const FollowsList = ({
  baseFollows,
  profileFollows,
  user,
  isConnectedUser,
}: {
  baseFollows: BaseFollowListItem[]
  profileFollows: ProfileFollowListItem
  user: SessionUser | null
  isConnectedUser: boolean
}) =>
  baseFollows.length === 0 && profileFollows.length === 0 ? (
    <EmptyBox
      title={
        isConnectedUser
          ? 'Vous ne suivez pas de base ni de profil'
          : 'Ce profil ne suit pas de base ou d’autres profils'
      }
    >
      {isConnectedUser && (
        <>
          Retrouvez vos bases et vos profils préféré(e)s ici en les suivant. Et
          prochainement, vous pourrez voir l’ensemble des ressources qu’ils
          auront publiés sur votre fil d’actualité personnalisé.
        </>
      )}
      <div className="fr-mt-4w">
        <Link
          className="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-search-line fr-ml-2w"
          href={searchUrl('bases', defaultSearchParams)}
        >
          Explorer les bases
        </Link>
        <Link
          className="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-search-line fr-ml-2w"
          href={searchUrl('profils', defaultSearchParams)}
        >
          Explorer les profils
        </Link>
      </div>
    </EmptyBox>
  ) : (
    <>
      <h3>
        Mes suivi{sPluriel(baseFollows.length + profileFollows.length)} ·{' '}
        {baseFollows.length + profileFollows.length}
      </h3>
      <h6 className="fr-mb-4v fr-mt-12v">
        {baseFollows.length} base{sPluriel(baseFollows.length)}
      </h6>
      {baseFollows.map(({ base }) => (
        <BaseCard user={user} base={base} key={base.id} compact />
      ))}

      <h6 className="fr-mb-4v fr-mt-12v">
        {profileFollows.length} profil{sPluriel(profileFollows.length)}
      </h6>
      {profileFollows.map(({ profile }) => (
        <ProfileCard key={profile.id} profile={profile} user={user} />
      ))}
    </>
  )

export default FollowsList
