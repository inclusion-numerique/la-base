export const contentId = 'contenu'
export const footerId = 'fr-footer'
export const navigationId = 'navigation-principale'
export const searchId = 'recherche'

export const contentSkipLink = { label: 'Contenu', anchor: `#${contentId}` }
export const footerSkipLink = { label: 'Pied de page', anchor: `#${footerId}` }
export const navigationSkipLink = {
  label: 'Navigation',
  anchor: `#${navigationId}`,
}
export const searchSkipLink = { label: 'Recherche', anchor: `#${searchId}` }

export const defaultSkipLinks = [
  contentSkipLink,
  navigationSkipLink,
  searchSkipLink,
  footerSkipLink,
]
