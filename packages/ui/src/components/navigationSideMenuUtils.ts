import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'

export const isItemActive = (activeHref: string, item: SideMenuProps.Item) =>
  'linkProps' in item && item.linkProps?.href === activeHref

const isAnchorNavigationItem = (item: SideMenuProps.Item) =>
  'linkProps' in item &&
  typeof item.linkProps?.href === 'string' &&
  item.linkProps.href.startsWith('#')

export const addActiveStateToItems = (
  items: SideMenuProps.Item[],
  activeHref?: string | null,
  isFirstRecursion = true,
): SideMenuProps.Item[] =>
  items.map((item, index) => {
    if ('items' in item) {
      return {
        expandedByDefault: activeHref
          ? item.items.some((subItem) => isItemActive(activeHref, subItem))
          : index === 0,
        ...item,
        items: addActiveStateToItems(item.items, activeHref, index === 0),
      }
    }

    const isActive = activeHref
      ? isItemActive(activeHref, item)
      : index === 0 && isFirstRecursion

    if (isAnchorNavigationItem(item)) {
      return {
        ...item,
        linkProps: {
          ...item.linkProps,
          'aria-current': isActive ? 'location' : undefined,
        },
        // Keep false to avoid DSFR forcing aria-current="page" for active items.
        isActive: false,
      }
    }

    return {
      ...item,
      isActive,
    }
  })
