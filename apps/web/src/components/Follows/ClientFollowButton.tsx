'use client'

import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { createToast } from '@app/ui/toast/createToast'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/navigation'
import type { FollowButtonProps } from '@app/web/components/Follows/FollowButton'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { isFollowedBy } from '@app/web/follows/isFollowedBy'
import {
  followBaseButtonProps,
  followBaseIconOnlyButtonProps,
  followProfileButtonProps,
  followProfileIconOnlyButtonProps,
  unfollowBaseButtonProps,
  unfollowBaseIconOnlyButtonProps,
  unfollowProfileButtonProps,
  unfollowProfileIconOnlyButtonProps,
} from '@app/web/components/Follows/followButtonProps'

/**
 * Only load client follow button for logged in user (see FollowButton)
 */
const ClientFollowButton = ({
  base,
  profile,
  user,
  iconOnly,
}: FollowButtonProps) => {
  const followBaseMutation = trpc.follow.followBase.useMutation()
  const followProfileMutation = trpc.follow.followProfile.useMutation()
  const unfollowBaseMutation = trpc.follow.unfollowBase.useMutation()
  const unfollowProfileMutation = trpc.follow.unfollowProfile.useMutation()

  const isFollowing = base
    ? isFollowedBy(base, user)
    : isFollowedBy(profile, user)

  const router = useRouter()

  const buttonProps = base
    ? iconOnly
      ? isFollowing
        ? unfollowBaseIconOnlyButtonProps
        : followBaseIconOnlyButtonProps
      : isFollowing
        ? unfollowBaseButtonProps
        : followBaseButtonProps
    : iconOnly
      ? isFollowing
        ? unfollowProfileIconOnlyButtonProps
        : followProfileIconOnlyButtonProps
      : isFollowing
        ? unfollowProfileButtonProps
        : followProfileButtonProps
  /**
   * Sorry for the mess, I hesitated between creating 4 buttons, or composition but went with a single file instead...
   */
  const onFollow = async () => {
    try {
      if (isFollowing) {
        await (base
          ? unfollowBaseMutation
              .mutateAsync({
                baseId: base.id,
              })
              .then(() =>
                createToast({
                  priority: 'success',
                  message: (
                    <>
                      Vous ne suivez plus la base <strong>{base.title}</strong>.
                    </>
                  ),
                }),
              )
          : unfollowProfileMutation
              .mutateAsync({
                profileId: profile.id,
              })
              .then(() =>
                createToast({
                  priority: 'success',
                  message: (
                    <>
                      Vous ne suivez plus <strong>{profile.name}</strong>.
                    </>
                  ),
                }),
              ))
      } else {
        await (base
          ? followBaseMutation
              .mutateAsync({
                baseId: base.id,
              })
              .then(() =>
                createToast({
                  priority: 'success',
                  message: (
                    <>
                      Vous suivez la base <strong>{base.title}</strong>.
                    </>
                  ),
                }),
              )
          : followProfileMutation
              .mutateAsync({
                profileId: profile.id,
              })
              .then(() =>
                createToast({
                  priority: 'success',
                  message: (
                    <>
                      Vous suivez <strong>{profile.name}</strong>.
                    </>
                  ),
                }),
              ))
      }
      router.refresh()
    } catch (error) {
      console.error(error)
      Sentry.captureException(error)
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue, merci de réessayer ultérieurement',
      })
    }
  }

  const isLoading =
    followBaseMutation.isPending ||
    followProfileMutation.isPending ||
    unfollowBaseMutation.isPending ||
    unfollowProfileMutation.isPending

  const iconId = isFollowing
    ? 'fr-icon-user-heart-fill'
    : 'fr-icon-user-heart-line'

  console.log({
    base,
    profile,
    isFollowing,
    iconId,
  })

  return (
    <Button
      {...(buttonProps as ButtonProps.IconOnly)}
      {...buttonLoadingClassname(isLoading)}
      type="button"
      onClick={onFollow}
    />
  )
}

export default withTrpc(ClientFollowButton)
