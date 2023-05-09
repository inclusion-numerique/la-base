import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { LegacyResource } from '@app/migration/modelMigrations/migrateResources'

type CreateContentData = Parameters<
  Prisma.TransactionClient['content']['create']
>[0]['data']

export const transformContent = ({
  legacyResource,
  legacyContent,
  order,
  imageIdFromLegacyId,
  uploadKeyFromLegacyKey,
}: {
  legacyResource: LegacyResource
  imageIdFromLegacyId: LegacyToNewIdHelper
  uploadKeyFromLegacyKey: (legacyKey: string) => string
  legacyContent:
    | LegacyResource['main_contentsection'][number]['main_contentblock'][number]
    | LegacyResource['main_contentsection'][number]
  order: number
}): CreateContentData => {
  const legacyId = Number(legacyContent.id)

  const legacyIdsData =
    'main_contentblock' in legacyContent
      ? { legacySectionId: legacyId }
      : { legacyContentId: legacyId }

  const commonData = {
    id: v4(),
    ...legacyIdsData,
    resource: { connect: { legacyId: Number(legacyResource.id) } },
    order,
    // All relevant contents have a title
    title: legacyContent.title,
    created: legacyContent.created,
    updated: legacyContent.modified,
  } as const satisfies Partial<CreateContentData>

  // We migrate sections as SectionTitle
  if ('main_contentblock' in legacyContent) {
    return { ...commonData, type: 'SectionTitle' }
  }
  if (legacyContent.main_textcontent) {
    return {
      ...commonData,
      type: 'Text',
      text: legacyContent.main_textcontent.text,
    }
  }
  if (legacyContent.main_linkcontent) {
    return {
      ...commonData,
      type: 'Link',
      url: legacyContent.main_linkcontent.link,
      showPreview: legacyContent.main_linkcontent.with_preview,
      caption: legacyContent.main_linkcontent.target_description,
      linkDescription: legacyContent.main_linkcontent.target_description,
      linkTitle: legacyContent.main_linkcontent.target_title,
      linkImageUrl: legacyContent.main_linkcontent.target_image,
    }
  }
  if (legacyContent.main_linkedresourcecontent) {
    const legacyLinkedResourceId =
      legacyContent.main_linkedresourcecontent.linked_resource_id
    if (!legacyLinkedResourceId) {
      throw new Error('Legacy content linked resource id is missing')
    }
    return {
      ...commonData,
      type: 'ResourceLink',
      legacyLinkedResourceId: Number(legacyLinkedResourceId),
    }
  }
  if (legacyContent.main_filecontent) {
    // Legacy file content can be an image (when preview = true) or a file
    const {
      contentblock_ptr_id: id,
      file,
      with_preview: withPreview,
    } = legacyContent.main_filecontent
    return withPreview
      ? {
          ...commonData,
          type: 'Image',
          image: { connect: { id: imageIdFromLegacyId(Number(id)) } },
        }
      : {
          ...commonData,
          type: 'File',
          file: { connect: { key: uploadKeyFromLegacyKey(file) } },
        }
  }

  throw new Error('Could not determine content type')
}
