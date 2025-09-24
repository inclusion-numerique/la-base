import { prismaClient } from '@app/web/prismaClient'
import { imageCropSelect } from '@app/web/server/image/imageCropSelect'

export const getProfilePageQuery = async ({
  id,
  slug,
}: { id: string; slug?: undefined } | { id?: undefined; slug: string }) => {
  const profile = await prismaClient.user.findUnique({
    select: {
      id: true,
      slug: true,
      deleted: true,
      name: true,
      firstName: true,
      lastName: true,
      department: true,
      description: true,
      image: {
        select: {
          id: true,
          altText: true,
          ...imageCropSelect,
          upload: {
            select: {
              name: true,
              size: true,
              mimeType: true,
            },
          },
        },
      },
      followedBy: {
        select: {
          id: true,
          followerId: true,
          follower: {
            select: {
              image: true,
              id: true,
              firstName: true,
              lastName: true,
              name: true,
              isPublic: true,
              followedBy: true,
              slug: true,
              _count: {
                select: { resources: true, followedBy: true },
              },
            },
          },
        },
        orderBy: {
          follower: {
            isPublic: 'desc',
          },
        },
      },
      isPublic: true,
      email: true,
      emailIsPublic: true,
      website: true,
      facebook: true,
      twitter: true,
      linkedin: true,
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
    where: { id, slug, deleted: null },
  })

  if (!profile) {
    return null
  }

  const publicFollowedBy = profile.followedBy
    .map(({ follower }) => follower)
    .filter(({ isPublic }) => isPublic)
  const privateFollowedBy = profile.followedBy
    .map(({ follower }) => follower)
    .filter(({ isPublic }) => !isPublic)

  return {
    ...profile,
    followedByData: {
      counts: {
        total: profile.followedBy.length,
        public: publicFollowedBy.length,
        private: privateFollowedBy.length,
      },
      followedBy: profile.followedBy.map(({ follower }) => follower),
    },
  }
}

export type ProfilePageData = Exclude<
  Awaited<ReturnType<typeof getProfilePageQuery>>,
  null
>

export type ProfileFollowedByData = ProfilePageData['followedByData']
