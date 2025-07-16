import { getStoragePrefix } from './getStoragePrefix'

export const getStorageKey = (filename: string): string => {
  const prefix = getStoragePrefix()
  return `${prefix}/${filename}`
}
