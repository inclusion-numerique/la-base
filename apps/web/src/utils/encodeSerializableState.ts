import superjson from 'superjson'

/**
 * Utility functions to encode and decode form state for safe transmission via URL.
 *
 * This module provides two functions, `encodeSerializableState` and `decodeSerializableState`,
 * which are intended to be used for serializing form state to a Base64-encoded string
 * and deserializing it back to its original form. This is particularly useful for passing
 * non-sensitive form data through URLs, ensuring the data remains unreadable to users.
 *
 * Example use case:
 * - Encode form state into a Base64 string and append it as a query parameter in a URL.
 * - Decode the Base64 string from the URL to prefill the form with the original data.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type EncodedState<T> = string & { __encodedStateType: T }

export const encodeSerializableState = <T>(formState: T): EncodedState<T> => {
  const jsonString = superjson.stringify(formState)
  return btoa(encodeURIComponent(jsonString)) as EncodedState<T>
}

export const decodeSerializableState = <T>(
  encodedState: EncodedState<T>,
  defaultValue: T, // Needed if decoding fails
): T => {
  try {
    const jsonString = decodeURIComponent(atob(encodedState))
    return superjson.parse<T>(jsonString)
  } catch {
    return defaultValue
  }
}
