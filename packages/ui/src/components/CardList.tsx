import classNames from 'classnames'
import type { ComponentProps, ReactElement } from 'react'

/**
 * Composant CardList pour enforcer la structure sémantique correcte
 * des listes de cartes selon les critères RGAA 4.1
 *
 * Toutes les grilles de cartes doivent utiliser une structure <ul> avec <li>
 * pour que les lecteurs d'écran puissent annoncer le nombre d'éléments
 * et permettre la navigation par éléments de liste.
 *
 * @example
 * <CardList>
 *   <ResourceCard resource={resource1} />
 *   <ResourceCard resource={resource2} />
 * </CardList>
 *
 * Génère:
 * <ul>
 *   <li><ResourceCard resource={resource1} /></li>
 *   <li><ResourceCard resource={resource2} /></li>
 * </ul>
 */
const CardList = ({
  children,
  className,
  itemClassName,
  ariaLabel,
  ...ulProps
}: ComponentProps<'ul'> & {
  itemClassName?: string
  ariaLabel?: string
}) => {
  // Convertir children en array pour pouvoir wrapper chaque élément
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <ul
      className={classNames(className)}
      aria-label={ariaLabel}
      {...ulProps}
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        ...ulProps.style,
      }}
    >
      {childrenArray.map((child, index) => {
        // Filtrer les enfants null/undefined/false
        if (!child) return null

        return (
          <li
            key={(child as ReactElement).key ?? `card-item-${index}`}
            className={itemClassName}
          >
            {child}
          </li>
        )
      })}
    </ul>
  )
}

export default CardList
