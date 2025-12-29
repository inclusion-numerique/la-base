import { validate } from 'uuid'

/**
 * Check if a string is a UUID token (shareable link token)
 */
export const isShareableLinkToken = (value: string): boolean => validate(value)
