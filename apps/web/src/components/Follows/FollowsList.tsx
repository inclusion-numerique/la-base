import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { SessionUser } from '@app/web/auth/sessionUser'
import BaseCard from '@app/web/components/Base/Card/BaseCard'
import EmptyBox from '@app/web/components/EmptyBox'
import IconInSquare from '@app/web/components/IconInSquare'
import ProfileCard from '@app/web/components/Profile/Card/ProfileCard'
import type {
  BaseFollowListItem,
  ProfileFollowListItem,
} from '@app/web/server/follows/getFollowsList'

const FollowsList = ({
  baseFollows,
  profileFollows,
  user,
}: {
  baseFollows: BaseFollowListItem[]
  profileFollows: ProfileFollowListItem
  user: SessionUser | null
}) =>
  baseFollows.length === 0 && profileFollows.length === 0 ? (
    <EmptyBox title="Vous ne suivez pas de base, ni de profil.">
      Suivez vos bases et vos profils préféré(e)s et retrouvez-les dans cet
      onglet. Prochainement, vous pourrez retrouver les dernières publications
      des bases et profils que vous suivez sur votre fil d’actualité.
    </EmptyBox>
  ) : (
    <>
      <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
        <IconInSquare iconId="ri-user-heart-line" />
        <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
          Mes suivis · {baseFollows.length + profileFollows.length}
        </h2>
      </div>
      <h3 className="fr-mb-4v fr-mt-12v fr-h6">
        {baseFollows.length} base{sPluriel(baseFollows.length)}
      </h3>
      {baseFollows.map(({ base }) => (
        <BaseCard user={user} base={base} key={base.id} compact titleAs="h4" />
      ))}

      <h3 className="fr-mb-4v fr-mt-12v fr-h6">
        {profileFollows.length} profil{sPluriel(profileFollows.length)}
      </h3>
      {profileFollows.map(({ profile }) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          user={user}
          titleAs="h4"
        />
      ))}
    </>
  )

export default FollowsList
