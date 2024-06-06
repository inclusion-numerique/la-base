import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'
import type { Resource } from '@app/web/server/resources/getResource'
import { ResourceNavigationData } from './getResourceNavigationData'
import styles from './ResourceDesktopNavigation.module.css'
import ResourceIndexationView from './ResourceIndexationView'

const ResourceDesktopNavigation = ({
  resource,
  navigationData,
}: {
  resource: Resource
  navigationData: ResourceNavigationData
}) => (
  <>
    <ResourceIndexationView
      resource={resource}
      withLink
      themes
      tagsClassName="fr-mt-1v"
      titleClassName="fr-text--xs fr-mb-0"
    />
    {!!navigationData && (
      <>
        <hr className="fr-separator-6v fr-mb-2v" />
        <NavigationSideMenu
          classes={{
            root: 'fr-p-0 fr-pt-4v',
            inner: styles.menuInner,
            item: styles.menuItem,
            link: styles.menuLink,
          }}
          burgerMenuButtonText={navigationData.burgerMenuButtonText}
          items={navigationData.items}
          sticky
          contentId={navigationData.contentId}
        />
      </>
    )}
  </>
)

export default ResourceDesktopNavigation
