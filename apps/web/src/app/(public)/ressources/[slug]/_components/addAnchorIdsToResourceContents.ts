import type { Resource } from '@app/web/server/resources/getResource'
import { createSlug } from '@app/web/utils/createSlug'

export type WithAnchorIdAndHref<T> = T & {
  anchorId: string
  anchorHref: string
}

export const addAnchorIdsToResourceContents = <
  Content extends Pick<Resource['contents'][number], 'title'>,
>(
  contents: Content[],
): WithAnchorIdAndHref<Content>[] => {
  const existingAnchorIds = new Set<string>()

  return contents.map((content, index) => {
    const anchorSlug =
      'title' in content && content.title
        ? createSlug(content.title)
        : `contenu-${index}`

    let anchorId = anchorSlug
    let deduplicationSuffix = 1

    while (existingAnchorIds.has(anchorId)) {
      anchorId = `${anchorSlug}-${deduplicationSuffix}`
      deduplicationSuffix += 1
    }

    existingAnchorIds.add(anchorId)

    return {
      ...content,
      anchorId,
      anchorHref: `#${anchorId}`,
    }
  })
}
