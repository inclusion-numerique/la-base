export const searchParamsFromQueryString = (
  queryString: string,
): Record<string, string | string[]> => {
  const searchParams = new URLSearchParams(decodeURIComponent(queryString))
  const object: Record<string, string | string[]> = {}

  for (const [key, value] of searchParams.entries()) {
    if (key in object) {
      const existing = object[key]
      if (Array.isArray(existing)) {
        existing.push(value)
      } else {
        object[key] = [object[key] as string, value]
      }
    } else {
      object[key] = value
    }
  }

  return object
}
