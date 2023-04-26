'use client'

import Link from 'next/link'
import * as navigation from 'next/navigation'
import { menu } from './menu'

export const PublicHeaderNav = () => {
  const pathname =
    // TODO This is an error in typings of next/navigation in 13.2, remove this casting when next fix this
    (navigation as unknown as { usePathname: () => string }).usePathname() ??
    '/'
  return (
    <ul className="fr-nav__list">
      {menu.map((item) => (
        <li className="fr-nav__item" key={item.name}>
          <Link
            className="fr-nav__link"
            aria-current={pathname === item.href ? 'page' : undefined}
            href={item.href}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
