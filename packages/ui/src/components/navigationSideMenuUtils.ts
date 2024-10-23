import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'

export const isItemActive = (activeHref: string, item: SideMenuProps.Item) =>
  'linkProps' in item && item.linkProps?.href === activeHref

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

    return {
      ...item,
      isActive: activeHref
        ? isItemActive(activeHref, item)
        : index === 0 && isFirstRecursion,
    }
  })
