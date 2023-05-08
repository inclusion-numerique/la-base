import { v4 } from 'uuid'
import { LegacyResource } from '@app/migration/modelMigrations/migrateResource'
import type { Prisma } from '@prisma/client'
import { Resource } from '@prisma/client'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'

export type MigrateContentInput = {
  legacyResource: LegacyResource
  resource: Pick<Resource, 'id' | 'legacyId'>
  transaction: Prisma.TransactionClient
  imageIdFromLegacyId: LegacyToNewIdHelper
  uploadKeyFromLegacyKey: (legacyKey: string) => string
  legacyContent:
    | LegacyResource['main_contentsection'][number]['main_contentblock'][number]
    | LegacyResource['main_contentsection'][number]
  order: number
}

type CreateContentData = Parameters<
  Prisma.TransactionClient['content']['create']
>[0]['data']

export const migrateContent = async ({
  resource,
  legacyContent,
  transaction,
  order,
  imageIdFromLegacyId,
  uploadKeyFromLegacyKey,
}: MigrateContentInput) => {
  const legacyId = Number(legacyContent.id)

  const legacyIdsData =
    'main_contentblock' in legacyContent
      ? { legacySectionId: legacyId }
      : { legacyContentId: legacyId }

  const commonData = {
    id: v4(),
    ...legacyIdsData,
    resourceId: resource.id,
    order,
    // All relevant contents have a title
    title: legacyContent.title,
    created: legacyContent.created,
    updated: legacyContent.modified,
  } satisfies Partial<CreateContentData>

  let data: CreateContentData

  // We migrate sections as SectionTitle
  if ('main_contentblock' in legacyContent) {
    data = { ...commonData, type: 'SectionTitle' }
  } else if (legacyContent.main_textcontent) {
    data = {
      ...commonData,
      type: 'Text',
      text: legacyContent.main_textcontent.text,
    }
  } else if (legacyContent.main_linkcontent) {
    data = {
      ...commonData,
      type: 'Link',
      url: legacyContent.main_linkcontent.link,
      showPreview: legacyContent.main_linkcontent.with_preview,
      caption: legacyContent.main_linkcontent.target_description,
      linkDescription: legacyContent.main_linkcontent.target_description,
      linkTitle: legacyContent.main_linkcontent.target_title,
      linkImageUrl: legacyContent.main_linkcontent.target_image,
    }
  } else if (legacyContent.main_linkedresourcecontent) {
    const legacyLinkedResourceId =
      legacyContent.main_linkedresourcecontent.linked_resource_id
    if (!legacyLinkedResourceId) {
      throw new Error('Legacy content linked resource id is missing')
    }
    data = {
      ...commonData,
      type: 'ResourceLink',
      legacyLinkedResourceId: Number(legacyLinkedResourceId),
    }
  } else if (legacyContent.main_filecontent) {
    // Legacy file content can be an image (when preview = true) or a file
    const {
      contentblock_ptr_id: id,
      file,
      with_preview: withPreview,
    } = legacyContent.main_filecontent
    data = withPreview
      ? {
          ...commonData,
          type: 'Image',
          imageId: imageIdFromLegacyId(Number(id)),
        }
      : {
          ...commonData,
          type: 'File',
          fileKey: uploadKeyFromLegacyKey(file),
        }
  } else {
    throw new Error('Could not determine content type')
  }

  const content = await transaction.content.create({
    data,
  })

  return content
}
