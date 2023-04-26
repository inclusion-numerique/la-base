import { Route } from 'next'

type MenuItem = {
  name: string
  href: Route
}
export const menu: MenuItem[] = [
  { name: 'Accueil', href: '/' },
  { name: 'Ressources', href: '/ressources' },
]
