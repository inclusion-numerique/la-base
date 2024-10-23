import { fileURLToPath } from 'node:url'

/**
 * Get the (commonjs) __filename from the current ES module import.meta.url
 * Usage: `const __filename = getFilename(import.meta.url)`
 */
export const getFilename = (importMetaUrl: string) =>
  fileURLToPath(importMetaUrl)
