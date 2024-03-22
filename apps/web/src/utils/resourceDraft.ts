import type { ContentProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { generateResourceExcerpt } from '../resources/resourceExcerpt'

const hasDraft = (
  resource: { published: Date | null } | null,
  draftResource?: {
    title: string
    description: string
    contents: ContentProjection[]
  } | null,
) => draftResource != null && !resource?.published

const appendDraftUpdate = <T>(
  resource: T,
  draftResource?: {
    title: string
    description: string
    image: { id: string; altText: string | null } | null
    contents: ContentProjection[]
  } | null,
): T =>
  resource != null && draftResource != null
    ? {
        ...resource,
        title: draftResource.title,
        description: draftResource.description,
        excerpt: generateResourceExcerpt(draftResource.description),
        image: draftResource.image,
        contents: draftResource.contents,
      }
    : resource

export const applyDraft = <T extends { published: Date | null }>(
  resource: T | null,
  draftResource?: {
    title: string
    description: string
    image: { id: string; altText: string | null } | null
    contents: ContentProjection[]
  } | null,
): T | null =>
  hasDraft(resource, draftResource)
    ? appendDraftUpdate(resource, draftResource)
    : resource
