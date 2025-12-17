import { SessionUser } from '@app/web/auth/sessionUser'
import { BaseJoinRequestButton } from '@app/web/features/base/join-requests/components/BaseJoinRequestButton'
import { BasePageData } from '@app/web/server/bases/getBase'
import Button from '@codegouvfr/react-dsfr/Button'
import { getUserBaseJoinRequestContext } from '../db/getBaseJoinRequestContext'

export const BaseJoinRequest = async ({
  user,
  base,
  size = 'medium',
  children,
}: {
  user: SessionUser | null
  base: BasePageData
  size?: 'small' | 'medium' | 'large'
  children?: React.ReactNode
}) => {
  if (!user) {
    return (
      <Button
        priority="secondary"
        size={size}
        linkProps={{
          href: `/connexion?suivant=/bases/${base.slug}?rejoindre-une-base`,
        }}
      >
        <span className="ri-team-line fr-mr-1w" />
        Demander à rejoindre la base
      </Button>
    )
  }

  const { hasPendingJoinRequest, isAlreadyMember } =
    await getUserBaseJoinRequestContext({
      user,
      baseId: base.id,
    })

  // user cannot request to join (already member, or has pending request)
  if (hasPendingJoinRequest || isAlreadyMember) {
    return children
  }

  return <BaseJoinRequestButton size={size} />
}
