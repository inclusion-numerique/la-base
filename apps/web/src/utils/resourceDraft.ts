import { generateResourceExcerpt } from '../resources/resourceExcerpt'

const hasDraft = (
  resource: { published: Date | null } | null,
  draftResource?: { title: string; description: string } | null,
) => draftResource != null && !resource?.published

const appendDraftUpdate = <T>(
  resource: T,
  draftResource?: {
    title: string
    description: string
    image: { id: string; altText: string | null } | null
  } | null,
): T =>
  resource != null && draftResource != null
    ? {
        ...resource,
        title: draftResource.title,
        description: draftResource.description,
        excerpt: generateResourceExcerpt(draftResource.description),
        image: draftResource.image,
      }
    : resource

export const applyDraft = <T extends { published: Date | null }>(
  resource: T | null,
  draftResource?: {
    title: string
    description: string
    image: { id: string; altText: string | null } | null
  } | null,
): T | null =>
  hasDraft(resource, draftResource)
    ? appendDraftUpdate(resource, draftResource)
    : resource
