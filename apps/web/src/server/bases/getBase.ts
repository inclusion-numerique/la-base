import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  getWhereResourcesList,
  resourceListSelect,
} from '../resources/getResourcesList'

const baseSelect = (user: Pick<SessionUser, 'id'>) =>
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
    resources: {
      select: resourceListSelect,
      where: getWhereResourcesList(user),
    },
    members: {
      select: {
        isAdmin: true,
        baseId: true,
        member: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
  } satisfies Prisma.BaseSelect)

export const getBase = async (id: string, user: Pick<SessionUser, 'id'>) =>
  prismaClient.base.findFirst({
    select: baseSelect(user),
    where: { id, deleted: null },
  })

export const basePageQuery = async (
  slug: string,
  user: Pick<SessionUser, 'id'>,
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
