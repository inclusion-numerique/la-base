/**
 * Types TypeScript pour enforcer l'accessibilité des images
 * selon les critères RGAA 4.1
 *
 * Une image doit soit :
 * - Avoir un texte alternatif descriptif (alt)
 * - Être marquée comme décorative (aria-hidden + role="presentation")
 */

/**
 * Props pour une image informative (avec contenu significatif)
 * Le texte alternatif est obligatoire
 */
export type InformativeImageProps = {
  alt: string
  decorative?: false
  'aria-hidden'?: never
  role?: never
}

/**
 * Props pour une image décorative (sans contenu significatif)
 * Doit être masquée pour les lecteurs d'écran
 */
export type DecorativeImageProps = {
  alt: '' // Alt vide obligatoire si decorative est true
  decorative: true
  'aria-hidden': true
  role: 'presentation'
}

/**
 * Union type qui enforce qu'une image soit soit informative, soit décorative
 */
export type AccessibleImageProps = InformativeImageProps | DecorativeImageProps

/**
 * Helper pour créer des props d'image accessibles
 */
export const createAccessibleImageProps = (
  options: { alt: string } | { decorative: true },
): AccessibleImageProps => {
  if ('alt' in options) {
    return {
      alt: options.alt,
    }
  }
  return {
    alt: '',
    decorative: true,
    'aria-hidden': true,
    role: 'presentation',
  }
}

/**
 * Vérifie si une image a un alt text valide
 */
export const hasValidAltText = (altText: string | null | undefined): boolean =>
  !!altText && altText.trim().length > 0

/**
 * Helper pour gérer les images de BDD qui peuvent avoir altText null/undefined
 * Si altText est vide, considère l'image comme décorative
 */
export const getImageAccessibilityProps = (
  altText: string | null | undefined,
): AccessibleImageProps => {
  if (hasValidAltText(altText)) {
    return {
      alt: altText as string,
    }
  }
  return {
    alt: '',
    decorative: true,
    'aria-hidden': true,
    role: 'presentation',
  }
}
