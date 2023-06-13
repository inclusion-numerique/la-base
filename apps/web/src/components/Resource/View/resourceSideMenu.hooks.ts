import { useEffect, useMemo, useState } from 'react'
import { ResourceContent } from '@app/web/server/resources/getResource'
import { getResourceSectionIdAttribute } from '@app/web/components/Resource/View/getResourceSectionIdAttribute'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'

/**
 * This hooks filters contents to display in the side menu of a resource view
 * It also computes the active element using an IntersectionObserver
 * Performance vs scroll listener:  https://itnext.io/1v1-scroll-listener-vs-intersection-observers-469a26ab9eb6
 */
export const useResourceNavigation = (contents: ResourceContent[]) => {
  // Memoizing contents and more importantly Ids (memo key) to not recreate an observer on each render
  const [navigationContents, navigationIds, navigationMemoKey] = useMemo(() => {
    const navigable = contents
      .map((content, index) => ({
        ...content,
        navigation: { id: getResourceSectionIdAttribute(content, index) },
      }))
      .filter(
        (
          content,
        ): content is ResourceContent & { navigation: { id: string } } =>
          content.type === 'SectionTitle',
      )

    const ids = [
      ...(navigable.length > 0
        ? navigable.map((content) => content.navigation.id)
        : ['contenu']),
      'informations',
    ]

    return [navigable, ids, ids.join('-')]
  }, [contents])

  const [activeElementId, setActiveElementId] = useState<string | null>(null)

  useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport) {
      return
    }

    const elements = navigationIds
      // eslint-disable-next-line unicorn/prefer-query-selector
      .map((id) => document.getElementById(id))
      .filter(isDefinedAndNotNull)

    if (elements.length === 0) {
      return
    }

    const visibleElements = new Map(navigationIds.map((id) => [id, false]))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entryChange of entries) {
          visibleElements.set(entryChange.target.id, entryChange.isIntersecting)
        }

        // Set first visible element as active
        for (const [id, isVisible] of visibleElements.entries()) {
          if (isVisible) {
            setActiveElementId(id)
            break
          }
        }
      },
      {
        threshold: 1,
      },
    )
    for (const element of elements) {
      observer.observe(element)
    }
    return () => observer.disconnect()
  }, [navigationMemoKey])

  return {
    navigationContents,
    active: activeElementId,
  }
}
