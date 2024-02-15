import { generateResourceExcerpt } from '../resources/resourceExcerpt'

const hasDraft = (
  resource: { published: Date | null } | null,
  draftResource?: { title: string; description: string } | null,
) => draftResource != null && !resource?.published

const appendDraftUpdate = <T>(
  resource: T,
  draftResource?: { title: string; description: string } | null,
): T =>
  resource != null && draftResource != null
    ? {
        ...resource,
        title: draftResource.title,
        description: draftResource.description,
        excerpt: generateResourceExcerpt(draftResource.description),
      }
    : resource

export const applyDraft = <T extends { published: Date | null }>(
  resource: T | null,
  draftResource?: { title: string; description: string } | null,
): T | null =>
  hasDraft(resource, draftResource)
    ? appendDraftUpdate(resource, draftResource)
    : resource
