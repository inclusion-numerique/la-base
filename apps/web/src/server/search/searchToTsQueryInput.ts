export const searchToTsQueryInput = (search?: string | null) => {
  const trimmed = search?.trim() || ''
  if (!trimmed) {
    return null
  }

  const cleanedInput = trimmed
    // Replace "-", "'", "’", or "_" by spaces
    .replaceAll(/['_’-]/g, ' ')
    .toLowerCase()

  const words = cleanedInput
    // Split the string into words
    .split(/\s+/)
    // Filter empty words
    .filter(Boolean)

  // Add prefix search for each word
  // Join these words with the '&' operator
  return words.map((word) => `${word}:*`).join(' | ')
}

export const cleanSearchTerm = (search?: string | null) => {
  const trimmed = search?.trim() || ''
  if (!trimmed) {
    return null
  }

  const cleanedInput = trimmed
    // Replace "-", "'", "’", or "_" by spaces
    .replaceAll(/['_’-]/g, ' ')
    .toLowerCase()

  const words = cleanedInput
    // Split the string into words
    .split(/\s+/)
    // Filter empty words
    .filter(Boolean)

  return words.join(' ')
}
