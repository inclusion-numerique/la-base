import path from 'node:path'
import { getFilename } from '@app/config/filename'

/**
 * Get the (commonjs) __dirname from the current ES module import.meta.url
 * Usage: `const __dirname = getDirname(import.meta.url)`
 */
export const getDirname = (importMetaUrl: string) =>
  path.dirname(getFilename(importMetaUrl))
