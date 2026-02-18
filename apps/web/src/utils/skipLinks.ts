export const contentId = 'contenu'
export const footerId = 'fr-footer'
export const searchId = 'recherche'

export const contentSkipLink = { label: 'Contenu', anchor: `#${contentId}` }
export const footerSkipLink = { label: 'Pied de page', anchor: `#${footerId}` }
export const searchSkipLink = { label: 'Recherche', anchor: `#${searchId}` }

export const defaultSkipLinks = [
  contentSkipLink,
  searchSkipLink,
  footerSkipLink,
]
