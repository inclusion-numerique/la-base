import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  getWhereResourcesList,
  resourceListSelect,
} from '../resources/getResourcesList'

export const basePageQuery = async (
  slug: string,
  user: Pick<SessionUser, 'id'>,
) =>
  prismaClient.base.findUnique({
    select: {
      slug: true,
      title: true,
      isPublic: true,
      ownerId: true,
      resources: {
        select: resourceListSelect,
        where: getWhereResourcesList(user),
      },
    },
    where: { slug },
  })

export type BasePageData = Exclude<
  Awaited<ReturnType<typeof basePageQuery>>,
  null
>
export type BaseResource = BasePageData['resources'][number]
