'use client'

import React from 'react'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import { Resource } from '@app/web/server/resources/getResource'
import { useResourceNavigation } from '@app/web/components/Resource/View/resourceSideMenu.hooks'
import { hasIndexation } from '@app/web/utils/indexation'
import styles from './ResourceSideMenu.module.css'

const ResourceSideMenu = ({ resource }: { resource: Resource }) => {
  const { navigationContents, active } = useResourceNavigation(
    resource.contents,
  )

  const items = [
    navigationContents.length === 0
      ? {
          // Only display one level item if there is no section title in resource contents
          text: 'Ressource',
          // Resource content is active by default
          isActive: active === 'contenu',
          linkProps: {
            href: '#contenu',
          },
        }
      : {
          text: 'Ressource',
          isActive: active !== 'informations',
          expandedByDefault: true,
          items: navigationContents.map((content) => ({
            text: content.title,
            linkProps: {
              href: `#${content.navigation.id}`,
            },
            isActive: active === content.navigation.id,
          })),
        },
  ]

  if (resource.isPublic || hasIndexation(resource)) {
    items.push({
      text: 'Informations',
      isActive: active === 'informations',
      linkProps: {
        href: '#informations',
      },
    })
  }

  return (
    <SideMenu
      className={styles.sideMenu}
      burgerMenuButtonText="Contenus"
      items={items}
    />
  )
}

export default ResourceSideMenu
