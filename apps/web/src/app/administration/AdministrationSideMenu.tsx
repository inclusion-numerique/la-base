'use client'

import type { SessionUser } from '@app/web/auth/sessionUser'
import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import { usePathname } from 'next/navigation'
import styles from './AdministrationSideMenu.module.css'

const AdministrationSideMenu = ({ user }: { user: SessionUser }) => {
  const pathname = usePathname()

  const items = [
    {
      text: (
        <>
          <span className="ri-alert-line ri-xl fr-mr-1w fr-text--regular" />
          Signalements
        </>
      ),
      linkProps: {
        href: '/administration/signalements',
      },
      isActive: pathname?.startsWith('/administration/signalements'),
    },
    ...(user.role === 'Admin'
      ? [
          {
            text: (
              <>
                <span className="fr-icon-team-line ri-xl fr-mr-1w fr-text--regular" />
                Utilisateurs
              </>
            ),
            linkProps: {
              href: '/administration/utilisateurs',
            },
            isActive: pathname?.startsWith('/administration/utilisateurs'),
          },
        ]
      : []),
    ...(user.role === 'Admin' || user.role === 'Moderator'
      ? [
          {
            text: (
              <>
                <span className="ri-article-line ri-xl fr-mr-1w fr-text--regular" />
                Ressources
              </>
            ),
            linkProps: {
              href: '/administration/ressources',
            },
            isActive: pathname?.startsWith('/administration/ressources'),
          },
          {
            text: (
              <>
                <span className="ri-stack-line ri-xl fr-mr-1w fr-text--regular" />
                Bases
              </>
            ),
            linkProps: {
              href: '/administration/bases',
            },
            isActive: pathname?.startsWith('/administration/bases'),
          },
          {
            text: (
              <>
                <span className="ri-star-line ri-xl fr-mr-1w fr-text--regular" />
                En vedette
              </>
            ),
            linkProps: {
              href: '/administration/landing',
            },
            isActive: pathname?.startsWith('/administration/landing'),
          },
        ]
      : []),
    ...(user.role === 'Admin'
      ? [
          {
            text: (
              <>
                <span className="ri-list-check-3 ri-xl fr-mr-2v fr-text--regular" />
                Fonctionnalités
              </>
            ),
            isActive: pathname?.startsWith('/administration/fonctionnalites'),
            expandedByDefault: pathname?.startsWith(
              '/administration/fonctionnalites',
            ),
            items: [
              {
                text: (
                  <>
                    <span className="ri-newspaper-line ri-xl fr-mr-1w fr-text--regular" />
                    Fil d'actualité
                  </>
                ),
                linkProps: {
                  href: '/administration/fonctionnalites/fil-d-actualite',
                },
                isActive: pathname?.startsWith(
                  '/administration/fonctionnalites/fil-d-actualite',
                ),
              },
            ],
          },
        ]
      : []),
  ] satisfies SideMenuProps.Item[]

  return (
    <SideMenu
      title={
        <p className="fr-text-title--blue-france fr-h5 fr-mb-0">
          Administration
        </p>
      }
      classes={{ item: styles.item, root: styles.sideMenu }}
      items={items}
      burgerMenuButtonText="Menu Administration"
      sticky
      fullHeight
    />
  )
}

export default AdministrationSideMenu
