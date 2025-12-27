/**
 * Extracts and validates a token from URL segments
 * Returns the token if valid, null otherwise
 */
export const extractTokenFromSegments = (
  segments: string[] | undefined,
): string | null => {
  if (!segments || segments.length === 0) {
    return null
  }

  const potentialToken = segments[0]
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  return uuidRegex.test(potentialToken) ? potentialToken : null
}
