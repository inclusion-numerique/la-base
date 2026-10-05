/**
 * Liens publiés par les utilisateurs : on ne transmet pas l'autorité du site
 * aux sites cibles, pour retirer tout intérêt aux publications de backlinks.
 * https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
 */
export const userContentLinkRel = 'nofollow ugc noopener noreferrer'

/**
 * Le rel est inséré en premier attribut : en html, seule la première
 * occurrence d'un attribut dupliqué est prise en compte, et le html
 * enregistré (passé par sanitize-html) échappe les "<" des textes et des
 * valeurs d'attributs.
 */
export const addUserContentRelToLinks = (html: string) =>
  html.replaceAll(/<a(?=[\s>])/gi, `<a rel="${userContentLinkRel}"`)
