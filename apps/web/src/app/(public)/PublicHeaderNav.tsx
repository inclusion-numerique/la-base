'use client'

import Link from 'next/link'
import * as navigation from 'next/navigation'

export const PublicHeaderNav = () => {
  const pathname =
    // TODO This is an error in typings of next/navigation in 13.2, remove this casting when next fix this
    (navigation as unknown as { usePathname: () => string }).usePathname() ??
    '/'
  return (
    <ul className="fr-nav__list">
      <li className="fr-nav__item">
        <Link
          className="fr-nav__link"
          aria-current={pathname === '/' ? 'page' : undefined}
          href="/"
        >
          Accueil
        </Link>
      </li>
      <li>
        <Link
          className="fr-nav__link"
          aria-current={pathname === '/ressources' ? 'page' : undefined}
          href="/ressources"
        >
          Ressources
        </Link>
      </li>
    </ul>
  )
}
