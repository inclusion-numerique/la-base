import { Resource } from '@app/web/server/resources/getResource'
import { WithAnchorIdAndHref } from '@app/web/components/Resource/View/addAnchorIdsToResourceContents'

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
  const items = contentsWithAnchor
    .filter((content) => content.type === 'SectionTitle')
    .map((content) => ({
      text: content.title ?? '',
      linkProps: {
        href: content.anchorHref,
      },
    }))

  if (items.length === 0) {
    // No navigation for short resources without any section titles
    return null
  }

  items.unshift({
    text: title,
    linkProps: {
      href: `#${slug}`,
    },
  })

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
