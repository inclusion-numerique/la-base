import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import type { Metadata } from 'next'

const privateRobots = 'noindex, nofollow'

// Contenu public d'un auteur qui n'est pas de confiance : visible, mais pas
// indexé. On garde "follow" pour que les moteurs suivent les liens internes.
export const untrustedAuthorRobots = 'noindex, follow'

/**
 * Directive robots d'une page de contenu publié par les utilisateurs
 * (ressource, collection, profil, base) : un contenu public n'est indexable
 * que si son auteur est de confiance. `undefined` retire la balise robots (la
 * directive du layout racine n'est pas héritée) : c'est le comportement
 * existant des pages publiques. Hors production, on le conserve, robots.txt
 * bloquant déjà tout le site.
 */
export const getUserContentRobots = async ({
  isPublic,
  isTrusted,
}: {
  isPublic: boolean | null
  isTrusted: () => Promise<boolean>
}): Promise<Metadata['robots']> => {
  if (!isPublic) {
    return privateRobots
  }
  if (!PublicWebAppConfig.isMain) {
    return undefined
  }
  return (await isTrusted()) ? undefined : untrustedAuthorRobots
}
