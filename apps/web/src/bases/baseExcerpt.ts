export const generateBaseExcerpt = (description?: string | null) => {
  if (!description) {
    return null
  }
  // description is html, we only want the first 800 characters
  const descriptionText = description.replaceAll(/<[^>]*>?/gm, '')

  return descriptionText.slice(0, 300)
}
