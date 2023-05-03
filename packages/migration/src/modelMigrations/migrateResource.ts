import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import type { Prisma } from '@prisma/client'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { prismaClient } from '@app/web/prismaClient'
import { v4 } from 'uuid'
import { SlugToLegacyIdMap } from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'
import { migrateContent } from '@app/migration/modelMigrations/migrateContent'
import { createSlug } from '@app/web/utils/createSlug'

export const getLegacyResources = () =>
  migrationPrismaClient.main_resource.findMany({
    include: {
      main_basesection_resources: true,
      // Each content seems to be inside a section. With a null title if at the "root", or with a "title" if inside a section
      main_contentsection: {
        orderBy: { order: 'asc' },
        include: {
          main_contentblock: {
            orderBy: { order: 'asc' },
            include: {
              main_filecontent: true,
              main_linkcontent: true,
              main_linkedresourcecontent: true,
              main_textcontent: true,
            },
          },
        },
      },
      // TODO Do not know if this is useful
      main_contentblock: true,
    },
  })

export type LegacyResource = FindManyItemType<typeof getLegacyResources>

export const getExistingResourceSlugs = (): Promise<SlugToLegacyIdMap> =>
  prismaClient.resource
    .findMany({ select: { slug: true, legacyId: true } })
    .then(
      (resources) =>
        new Map(resources.map(({ slug, legacyId }) => [slug, legacyId])),
    )

export type MigrateResourceInput = {
  legacyResource: LegacyResource
  transaction: Prisma.TransactionClient
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  // Deduplicated slug
  slug: string
}

// I created a legacy resource with id 1336 in the legacy app to debug this migration
// const debugLegacyResourceId = 1336
const debugLegacyResourceId = null

export const migrateResource = async ({
  legacyResource,
  slug,
  transaction,
  userIdFromLegacyId,
  baseIdFromLegacyId,
}: MigrateResourceInput) => {
  const legacyId = Number(legacyResource.id)

  if (debugLegacyResourceId === legacyId) {
    console.log('=== START DEBUG RESOURCE ===')
    console.log('Resource', legacyResource)
    console.log('Sections')
    for (const section of legacyResource.main_contentsection) {
      console.log(section)
    }
    console.log('=== END DEBUG RESOURCE ===')
  }

  const data = {
    title: legacyResource.title,
    slug,
    titleDuplicationCheckSlug: createSlug(legacyResource.title),
    description: legacyResource.description ?? '',
    createdById: userIdFromLegacyId(Number(legacyResource.creator_id)),
    baseId: legacyResource.root_base_id
      ? baseIdFromLegacyId(Number(legacyResource.root_base_id))
      : null,
    created: legacyResource.created,
    updated: legacyResource.modified,
  } satisfies Parameters<typeof transaction.resource.upsert>[0]['update']

  const resource = await transaction.resource.upsert({
    where: { legacyId },
    create: {
      id: v4(),
      legacyId,
      ...data,
    },
    update: data,
    select: { id: true, createdBy: true, legacyId: true },
  })

  // Instead of merging the content blocks, we delete all the existing ones and recreate them
  await transaction.content.deleteMany({ where: { resource: { legacyId } } })

  const orderedLegacyResourcesOrSectionTitle =
    legacyResource.main_contentsection.flatMap((legacySection) => {
      if (legacySection.title === null) {
        // This is a section without title, it is at the "root" level of the resource
        return legacySection.main_contentblock
      }

      // This is a legacy section with a title, we flatten the structure in the new app and the section becomes a content
      return [legacySection, ...legacySection.main_contentblock]
    })

  const contents = await Promise.all(
    orderedLegacyResourcesOrSectionTitle.map((legacyContent, index) =>
      migrateContent({
        legacyResource,
        resource,
        legacyContent,
        transaction,
        order: index,
      }),
    ),
  )

  return { resource, contents }
}
