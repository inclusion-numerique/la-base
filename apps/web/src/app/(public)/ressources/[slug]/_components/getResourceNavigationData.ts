import type { Resource } from '@app/web/server/resources/getResource'
import type { WithAnchorIdAndHref } from './addAnchorIdsToResourceContents'

export const getResourceNavigationData = ({
  title,
  slug,
  contentsWithAnchor,
  hasInformationSection,
}: {
  title: string
  slug: string
  contentsWithAnchor: WithAnchorIdAndHref<Resource['contents'][number]>[]
  hasInformationSection: boolean
}) => {
  const sectionTitles = contentsWithAnchor
    .filter((content) => content.type === 'SectionTitle')
    .map((content) => ({
      text: content.title ?? '',
      linkProps: {
        href: content.anchorHref,
      },
    }))

  const items = [
    {
      text: title,
      linkProps: {
        href: `#${slug}`,
      },
    },
    ...sectionTitles,
  ]

  if (hasInformationSection) {
    items.push({
      text: 'Informations',
      linkProps: {
        href: '#informations',
      },
    })
  }

  return {
    items,
    contentId: 'resource-content',
    burgerMenuButtonText: 'Contenus',
  }
}

export type ResourceNavigationData = ReturnType<
  typeof getResourceNavigationData
>
