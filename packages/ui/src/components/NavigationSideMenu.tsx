'use client'

import { addActiveStateToItems } from '@app/ui/components/navigationSideMenuUtils'
import { useNavigationSideMenu } from '@app/ui/hooks/useNavigationSideMenu'
import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'

/**
 * This component is a wrapper around the SideMenu component from DSFR.
 * It adds the active state to the items of the menu depending on scroll position.
 * This will use all the side menu items with an href starting with # to compute the active item
 */

export type NavigationSideMenuProps = {
  className?: string
  contentId: string
} & Omit<SideMenuProps, 'id'>

const NavigationSideMenu = ({
  contentId,
  items,
  ...sideMenuProps
}: NavigationSideMenuProps) => {
  const { activeHref } = useNavigationSideMenu({
    contentId,
    items,
  })

  return (
    <SideMenu
      {...sideMenuProps}
      items={addActiveStateToItems(items, activeHref)}
    />
  )
}

export default NavigationSideMenu
