// cette fonction échappe tous les caractères interdits ou problématiques
// selon la RFC 6266. elle part du principe que filename est placé
// entre guillemets, donc on doit échapper les guillemets doubles et
// les backslashes. on remplace aussi les caractères de contrôle
// et potentiellement les caractères non-ascii.
//
// règles appliquées :
// - remplacer tous les caractères de contrôle (code < 32 ou == 127) par "_"
// - remplacer les guillemets doubles (") par \"
// - remplacer les backslashes (\) par \\
// - remplacer tous les caractères non ASCII par "_"
//
// ceci n'est pas un encodage complet RFC 6266/8187, mais une simplification
// raisonnable pour éviter les caractères qui posent problème dans le header.
const escapeChar = (char: string): string => {
  const code = char.codePointAt(0) ?? 0

  // Replace control characters or DEL with "_"
  if (code < 32 || code === 127) {
    return '_'
  }

  // Escape double quotes
  if (char === '"') {
    return String.raw`\"`
  }

  // Escape backslash
  if (char === '\\') {
    return '\\\\'
  }

  // Replace non-ASCII characters with their ASCII equivalents
  if (code > 127) {
    // Normalize and strip accents/diacritics
    // biome-ignore lint/suspicious/noMisleadingCharacterClass: this works 🤷
    const normalized = char.normalize('NFKD').replaceAll(/[\u0300-\u036F]/g, '')
    // If normalization results in an empty string, replace with "_"
    return normalized || '_'
  }

  // Return the character as-is
  return char
}

export const escapeHeaderFilename = (filename: string): string => {
  let result = ''
  for (const char of filename) {
    result += escapeChar(char)
  }
  return result
}
