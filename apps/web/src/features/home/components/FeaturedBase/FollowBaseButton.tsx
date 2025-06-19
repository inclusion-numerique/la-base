'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { loginUrl } from '@app/web/security/login'
import { trpc } from '@app/web/trpc'
import Button, { type ButtonProps } from '@codegouvfr/react-dsfr/Button'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'

const followingButtonsProps: ButtonProps = {
  type: 'button',
  priority: 'tertiary',
  children: 'Ne plus suivre',
}

const NOT_FOLLOWING_CHILDREN = (
  <>
    <span className="ri-user-heart-line fr-mr-1w" aria-hidden />
    Suivre
  </>
)

const match =
  (userId?: string) =>
  ({ id }: { id: string }) =>
    id === userId

const followingButtonProps = (onFollow: () => Promise<void>) => () => ({
  ...followingButtonsProps,
  onClick: onFollow,
})

const notFollowingButtonsProps =
  (onUnfollow: () => Promise<void>) =>
  (userId?: string): ButtonProps =>
    userId
      ? {
          type: 'button',
          priority: 'secondary',
          children: NOT_FOLLOWING_CHILDREN,
          onClick: onUnfollow,
        }
      : {
          linkProps: {
            href: loginUrl({ intent: 'suivre-une-base-ou-un-profil' }),
          },
          priority: 'secondary',
          children: NOT_FOLLOWING_CHILDREN,
        }

const followSuccessToast = (title: string) => () =>
  createToast({
    priority: 'success',
    message: (
      <>
        Vous suivez la base <strong>{title}</strong>.
      </>
    ),
  })

const unfollowSuccessToast = (title: string) => () =>
  createToast({
    priority: 'success',
    message: (
      <>
        Vous ne suivez plus la base <strong>{title}</strong>.
      </>
    ),
  })

const FollowBaseButton = ({
  id,
  title,
  followedBy,
  userId,
  className,
}: {
  id: string
  title: string
  followedBy: { id: string }[]
  userId?: string
  className?: string
}) => {
  const router = useRouter()

  const followBaseMutation = trpc.follow.followBase.useMutation()
  const unfollowBaseMutation = trpc.follow.unfollowBase.useMutation()

  const isLoading =
    followBaseMutation.isPending || unfollowBaseMutation.isPending

  const isFollowing = followedBy.some(match(userId))

  const onUnfollow = async () => {
    try {
      await unfollowBaseMutation
        .mutateAsync({ baseId: id })
        .then(unfollowSuccessToast(title))
      router.refresh()
    } catch (error) {
      Sentry.captureException(error)
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue, merci de réessayer ultérieurement',
      })
    }
  }

  const onFollow = async () => {
    try {
      await followBaseMutation
        .mutateAsync({
          baseId: id,
        })
        .then(followSuccessToast(title))
      router.refresh()
    } catch (error) {
      Sentry.captureException(error)
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue, merci de réessayer ultérieurement',
      })
    }
  }

  return (
    <Button
      {...buttonLoadingClassname(isLoading, className)}
      {...(isFollowing
        ? followingButtonProps(onUnfollow)()
        : notFollowingButtonsProps(onFollow)(userId))}
    />
  )
}

export default withTrpc(FollowBaseButton)
