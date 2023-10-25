import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import { imageCropSelect } from '@app/web/server/image/imageCropSelect'
import {
  computeResourcesListWhereForUser,
  resourceListSelect,
} from '../resources/getResourcesList'
import { profileSelect } from '../profiles/getProfilesList'

const baseSelect = (user: Pick<SessionUser, 'id'> | null) =>
  ({
    id: true,
    slug: true,
    title: true,
    description: true,
    department: true,
    email: true,
    emailIsPublic: true,
    linkedin: true,
    facebook: true,
    twitter: true,
    website: true,
    isPublic: true,
    ownerId: true,
    coverImage: {
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
    resources: {
      select: resourceListSelect,
      where: computeResourcesListWhereForUser(user),
    },
    members: {
      select: {
        isAdmin: true,
        baseId: true,
        memberId: true,
        accepted: true,
        member: {
          select: profileSelect,
        },
      },
      orderBy: { added: 'asc' },
    },
  }) satisfies Prisma.BaseSelect

export const getBase = async (id: string, user: Pick<SessionUser, 'id'>) =>
  prismaClient.base.findFirst({
    select: baseSelect(user),
    where: { id, deleted: null },
  })

export const basePageQuery = async (
  slug: string,
  user: Pick<SessionUser, 'id'> | null,
) =>
  prismaClient.base.findFirst({
    select: baseSelect(user),
    where: { slug, deleted: null },
  })

export type BasePageData = Exclude<
  Awaited<ReturnType<typeof basePageQuery>>,
  null
>
export type BaseResource = BasePageData['resources'][number]
export type BaseMember = BasePageData['members'][number]
