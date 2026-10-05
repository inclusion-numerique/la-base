/**
 * Liens publiés par les utilisateurs : on ne transmet pas l'autorité du site
 * aux sites cibles, pour retirer tout intérêt aux publications de backlinks.
 * https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
 */
export const userContentLinkRel = 'nofollow ugc noopener noreferrer'

const relAttributeRegex = /\s+rel\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi

/**
 * Le html enregistré passe par sanitize-html, qui retire l'attribut rel et
 * échappe les ">" dans les valeurs d'attributs : une balise <a ...> ne
 * contient donc pas de ">" avant sa fermeture.
 */
export const addUserContentRelToLinks = (html: string) =>
  html.replaceAll(
    /<a(\s[^>]*)?>/gi,
    (_tag, attributes: string | undefined) =>
      `<a${(attributes ?? '').replaceAll(relAttributeRegex, '')} rel="${userContentLinkRel}">`,
  )
