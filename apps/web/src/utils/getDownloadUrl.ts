export const getDownloadUrl = (
  key: string,
  options?: { download?: boolean },
) => {
  if (!options?.download) {
    return `/download/${key}`
  }

  return `/download/${key}?download`
}
