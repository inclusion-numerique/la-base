import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'
import classNames from 'classnames'
import type { ResourceNavigationData } from './getResourceNavigationData'
import styles from './ResourceMobileNavigation.module.css'

/**
 * Dropdown navigation menu only visible in mobile layout
 */
const ResourceMobileNavigation = ({
  navigationData,
}: {
  navigationData: ResourceNavigationData
}) => {
  if (!navigationData) {
    return <hr className="fr-hidden-md fr-separator-1px" />
  }

  return (
    <NavigationSideMenu
      classes={{
        root: classNames('fr-hidden-md', styles.sideMenu),
        inner: styles.menuInner,
        item: styles.menuItem,
        link: styles.menuLink,
      }}
      burgerMenuButtonText={navigationData.burgerMenuButtonText}
      items={navigationData.items}
      sticky
      contentId={navigationData.contentId}
    />
  )
}

export default ResourceMobileNavigation
