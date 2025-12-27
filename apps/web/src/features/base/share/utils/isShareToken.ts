/**
 * Check if a string is a UUID token (shareable link token)
 */
export const isShareToken = (value: string): boolean => {
  // UUID v4 regex pattern
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(value)
}
