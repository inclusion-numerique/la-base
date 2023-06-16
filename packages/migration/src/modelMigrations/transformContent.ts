import { v4 } from 'uuid'
import type { MigrateResourceCommand } from '@app/web/server/resources/feature/MigrateResource'
import { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import type { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import type { LegacyResource } from '@app/migration/modelMigrations/migrateResources'

type TransformContentResult =
  MigrateResourceCommand['payload']['contents'][number]

export const transformContent = ({
  legacyContent,
  order,
  imageIdFromLegacyId,
  uploadKeyFromLegacyKey,
  migratedResourcesByLegacyId,
}: {
  imageIdFromLegacyId: LegacyToNewIdHelper
  uploadKeyFromLegacyKey: (legacyKey: string) => string
  legacyContent:
    | LegacyResource['main_contentsection'][number]['main_contentblock'][number]
    | LegacyResource['main_contentsection'][number]
  order: number
  migratedResourcesByLegacyId: Map<number, ResourceProjection>
}): TransformContentResult | null => {
  const legacyId = Number(legacyContent.id)

  const legacyIdsData =
    'main_contentblock' in legacyContent
      ? { legacySectionId: legacyId }
      : { legacyContentId: legacyId }

  const commonData = {
    id: v4(),
    ...legacyIdsData,
    order,
    // All relevant contents have a title
    title: legacyContent.title,
    created: legacyContent.created,
    updated: legacyContent.modified,
    legacyContentId: Number(legacyContent.id),
    legacySectionId: null,
    caption: null,
    imageId: null,
    imageAltText: null,
    fileKey: null,
    showPreview: null,
    url: null,
    linkDescription: null,
    linkTitle: null,
    linkImageUrl: null,
    linkFaviconUrl: null,
    legacyLinkedResourceId: null,
    text: null,
  } satisfies Omit<TransformContentResult, 'type'>

  // We migrate sections as SectionTitle
  if ('main_contentblock' in legacyContent) {
    if (!legacyContent.title?.trim()) {
      return null
    }
    return {
      ...commonData,
      legacyContentId: null,
      legacySectionId: Number(legacyContent.id),
      type: 'SectionTitle',
    }
  }
  if (legacyContent.main_textcontent) {
    if (!legacyContent.main_textcontent.text?.trim()) {
      return null
    }
    return {
      ...commonData,
      type: 'Text',
      text: legacyContent.main_textcontent.text,
    }
  }
  if (legacyContent.main_linkcontent) {
    if (!legacyContent.main_linkcontent.link?.trim()) {
      return null
    }

    const canShowPreview =
      !!legacyContent.main_linkcontent.target_description ||
      !!legacyContent.main_linkcontent.target_title ||
      !!legacyContent.main_linkcontent.target_image

    return {
      ...commonData,
      type: 'Link',
      url: legacyContent.main_linkcontent.link,
      showPreview:
        canShowPreview && legacyContent.main_linkcontent.with_preview,
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
    const linkedResource = migratedResourcesByLegacyId.get(
      Number(legacyLinkedResourceId),
    )
    if (!linkedResource) {
      throw new Error(
        `Legacy linked resource ${legacyLinkedResourceId} is missing`,
      )
    }

    return {
      ...commonData,
      type: 'Link',
      legacyLinkedResourceId: Number(legacyLinkedResourceId),
      showPreview: true,
      linkTitle: linkedResource.title,
      linkDescription: linkedResource.description,
      url: `/ressources/${linkedResource.slug}`,
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
          imageId: imageIdFromLegacyId(Number(id)),
        }
      : {
          ...commonData,
          type: 'File',
          fileKey: uploadKeyFromLegacyKey(file),
        }
  }

  throw new Error('Could not determine content type')
}
