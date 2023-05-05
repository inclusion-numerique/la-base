import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { prismaClient } from '@app/web/prismaClient'
import { v4 } from 'uuid'
import { createSlug } from '@app/web/utils/createSlug'
import { CreateResourceValidation } from '@app/web/server/rpc/resource/createResource'
import {
  EditResourceBaseValidation,
  EditResourceTitleValidation,
} from './editResource'
import { notFoundError } from '../trpcErrors'
import { getResourceSelect } from '../../resources'

const createUniqueSlug = async (title: string) => {
  const resourcesCount = await prismaClient.resource.count()
  return `${createSlug(title)}-${resourcesCount + 1}`
}

export const resourceRouter = router({
  create: protectedProcedure
    .input(CreateResourceValidation)
    .mutation(
      async ({ input: { baseId, title, description }, ctx: { user } }) => {
        const slug = await createUniqueSlug(title)

        return prismaClient.resource.create({
          data: {
            id: v4(),
            slug,
            title,
            titleDuplicationCheckSlug: createSlug(title),
            description,
            createdById: user.id,
            baseId,
          },
          select: {
            id: true,
            slug: true,
          },
        })
      },
    ),
  editTitle: protectedProcedure
    .input(EditResourceTitleValidation)
    .mutation(async ({ input: { title, description, id } }) => {
      const existingResource = await prismaClient.resource.findFirst({
        where: { id },
        select: {
          createdById: true,
        },
      })

      // TODO manage createdById
      if (!existingResource) {
        throw notFoundError()
      }

      return prismaClient.resource.update({
        data: {
          title,
          description,
        },
        where: {
          id,
        },
        select: getResourceSelect,
      })
    }),
  editBase: protectedProcedure
    .input(EditResourceBaseValidation)
    .mutation(async ({ input: { baseId, id } }) => {
      const existingResource = await prismaClient.resource.findFirst({
        where: { id },
        select: {
          createdById: true,
        },
      })

      // TODO manage createdById
      if (!existingResource) {
        throw notFoundError()
      }

      return prismaClient.resource.update({
        data: {
          baseId,
        },
        where: {
          id,
        },
        select: getResourceSelect,
      })
    }),
})
