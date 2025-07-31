'use client'

import { addActiveStateToItems } from '@app/ui/components/navigationSideMenuUtils'
import { useNavigationSideMenu } from '@app/ui/hooks/useNavigationSideMenu'
import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import classNames from 'classnames'
import Link from 'next/link'
import { Fragment, memo } from 'react'
import styles from './CompactNavigationSideMenu.module.css'

/**
 * This component is a replacement for DSFR side menu, with sections always open and with a compact design.
 * It adds the active state to the items of the menu depending on scroll position.
 * This will use all the side menu items with an href starting with # to compute the active item
 */

export type CompactNavigationSideMenuProps = {
  className?: string
  contentId: string
  id?: string
} & Omit<SideMenuProps, 'id'>

const CompactNavigationSideMenu = memo(
  ({
    id: idProperty,
    contentId,
    title,
    items: itemsProperty,
    style,
    sticky,
    className,
    fullHeight,
    classes = {},
    align = 'left',
    burgerMenuButtonText,
    ...rest
  }: CompactNavigationSideMenuProps) => {
    const { activeHref } = useNavigationSideMenu({
      contentId,
      items: itemsProperty,
    })

    const items = addActiveStateToItems(itemsProperty, activeHref)

    const id = idProperty ?? 'fr-sidemenu'

    const collapseId = `${id}-collapse`

    const titleId = `${id}-title`

    const getItemId = (params: { level: number; key: string }) => {
      const { level, key } = params

      return `fr-sidemenu-item-${id}-${level}-${key}`
    }
    return (
      <nav
        id={id}
        {...rest}
        style={style}
        aria-labelledby={titleId}
        className={classNames(
          'fr-sidemenu',
          {
            'fr-sidemenu--right': align === 'right',
            'fr-sidemenu--sticky': sticky && !fullHeight,
            'fr-sidemenu--sticky-full-height': sticky && fullHeight,
          },
          classes.root,
          className,
          styles.nav,
        )}
      >
        <div className={classNames('fr-sidemenu__inner', classes.inner)}>
          <button
            type="button"
            hidden
            aria-expanded="false"
            aria-controls={collapseId}
            className={classNames('fr-sidemenu__btn', classes.button)}
          >
            {burgerMenuButtonText}
          </button>
          <div className={classNames('fr-collapse')} id={collapseId}>
            {title !== undefined && (
              <div
                className={classNames('fr-sidemenu__title', classes.title)}
                id={titleId}
              >
                {title}
              </div>
            )}
            <ul className={classNames('fr-sidemenu__list', classes.list)}>
              {items.map((rootItem, index) => {
                const getItemRec = (params: {
                  item: SideMenuProps.Item
                  key: string
                  level: number
                }) => {
                  const { item, key, level } = params

                  const itemId = getItemId({ key, level })

                  return (
                    <Fragment key={key}>
                      <li
                        className={classNames(
                          'fr-sidemenu__item',
                          classes.item,
                        )}
                        id={itemId}
                      >
                        <Link
                          target="_self"
                          {...(item.linkProps as unknown as any)}
                          {...(item.isActive && {
                            'aria-current': 'page',
                          })}
                          className={classNames(
                            'fr-sidemenu__link',
                            classes.link,
                            item.linkProps?.className,
                          )}
                        >
                          {item.text}
                        </Link>
                      </li>

                      {'items' in item ? (
                        <li
                          className={classNames(
                            'fr-sidemenu__item',
                            classes.item,
                          )}
                        >
                          <ul
                            className={classNames(
                              'fr-sidemenu__list',
                              classes.list,
                            )}
                          >
                            {item.items.map((subItem, subindex) =>
                              getItemRec({
                                item: subItem,
                                key: `${key}-${subindex}`,
                                level: level + 1,
                              }),
                            )}
                          </ul>
                        </li>
                      ) : null}
                    </Fragment>
                  )
                }

                return getItemRec({
                  key: `${index}`,
                  item: rootItem,
                  level: 0,
                })
              })}
            </ul>
          </div>
        </div>
      </nav>
    )
  },
)

export default CompactNavigationSideMenu
