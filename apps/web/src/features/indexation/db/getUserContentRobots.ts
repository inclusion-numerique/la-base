import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import type { Metadata } from 'next'

// Page privée, ou contenu public d'un auteur qui n'est pas de confiance : ni
// indexée, ni ses liens suivis (fichiers déposés compris)
const notIndexedNorFollowedRobots = 'noindex, nofollow'

// Page publique visible sur le site mais pas indexée. On garde "follow" pour
// que les moteurs suivent les liens internes.
const notIndexedRobots = 'noindex, follow'

/**
 * Directive robots d'une page de contenu publié par les utilisateurs
 * (ressource, collection, base) : un contenu public n'est indexable, et ses
 * liens suivis, que si son auteur est de confiance. `undefined` retire la balise robots (la
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
    return notIndexedNorFollowedRobots
  }
  if (!PublicWebAppConfig.isMain) {
    return undefined
  }
  return (await isTrusted()) ? undefined : notIndexedNorFollowedRobots
}

/**
 * Pages jamais indexées, quel que soit l'auteur : profils et avis sur une
 * ressource. Elles n'apportent rien à la recherche (doublon de la ressource,
 * données personnelles) et peuvent porter du spam.
 */
export const getNeverIndexedRobots = ({
  isPublic,
}: {
  isPublic: boolean | null
}): Metadata['robots'] =>
  isPublic ? notIndexedRobots : notIndexedNorFollowedRobots
