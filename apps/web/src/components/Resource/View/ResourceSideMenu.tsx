import { Route } from 'next'
import React from 'react'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import { ResourceContent } from '@app/web/server/resources/getResource'
import styles from './ResourceSideMenu.module.css'

const ResourceSideMenu = ({
  visibleRefIndex,
  contents,
}: {
  visibleRefIndex: number | null
  contents: ResourceContent[]
}) => (
  <SideMenu
    className={styles.sideMenu}
    burgerMenuButtonText="Contenus"
    items={[
      {
        text: 'Ressource',
        isActive: visibleRefIndex !== null && visibleRefIndex >= 0,
        items: contents
          .filter((content) => content.type === 'SectionTitle')
          .map((section, index) => ({
            text: section.title,
            linkProps: { href: `#section-${section.id}` as Route },
            isActive: visibleRefIndex === index,
          })),
      },
      {
        text: 'Informations',
        isActive: visibleRefIndex === -1,
        linkProps: {
          href: '#informations' as Route,
        },
      },
    ]}
  />
)

export default ResourceSideMenu
