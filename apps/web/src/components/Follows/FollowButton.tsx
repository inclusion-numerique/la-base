import type { SessionUser } from '@app/web/auth/sessionUser'
import ClientFollowButton from '@app/web/components/Follows/ClientFollowButton'
import {
  followBaseButtonProps,
  followBaseIconOnlyButtonProps,
  followProfileButtonProps,
  followProfileIconOnlyButtonProps,
} from '@app/web/components/Follows/followButtonProps'
import { loginUrl } from '@app/web/security/login'
import type { BasePageData } from '@app/web/server/bases/getBase'
import type { BaseProfileListItem } from '@app/web/server/bases/getBasesList'
import type { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import Button from '@codegouvfr/react-dsfr/Button'

export type FollowButtonProps = {
  user: SessionUser | null
  className?: string
  iconOnly?: boolean
  followPriority?: ButtonProps['priority']
} & (
  | { base: BaseProfileListItem | BasePageData; profile?: undefined }
  | {
      profile: Pick<ProfileListItem, 'id' | 'followedBy' | 'name'>
      base?: undefined
    }
)

export const FollowButton = (props: FollowButtonProps) => {
  const { className, profile, base, user, iconOnly, followPriority } = props

  if (!profile && !base) {
    return null
  }

  if (user) {
    // Only load client logic for button with feature for logged in user
    return <ClientFollowButton {...props} />
  }

  const href = loginUrl({
    intent: 'suivre-une-base-ou-un-profil',
  })

  // Server component version
  if (base) {
    const initialButtonProps = iconOnly
      ? followBaseIconOnlyButtonProps
      : followBaseButtonProps

    const buttonProps = followPriority
      ? { ...initialButtonProps, priority: followPriority }
      : initialButtonProps

    return (
      <Button
        className={className}
        {...buttonProps}
        linkProps={{
          href,
        }}
      />
    )
  }

  const initialButtonProps = iconOnly
    ? followProfileIconOnlyButtonProps
    : followProfileButtonProps

  const buttonProps: ButtonProps = followPriority
    ? { ...initialButtonProps, priority: followPriority }
    : initialButtonProps

  return (
    <Button
      title={buttonProps.title}
      priority={buttonProps.priority}
      size={buttonProps.size}
      className={className}
      linkProps={{
        href,
      }}
    >
      <span className="ri-user-heart-line fr-mr-1w" aria-hidden />
      {buttonProps.children}
    </Button>
  )
}
