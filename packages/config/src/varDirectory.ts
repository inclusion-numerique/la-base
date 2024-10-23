/* eslint unicorn/prevent-abbreviations: 0 */

import path from 'node:path'
import { getDirname } from '@app/config/dirname'

export const varDirectory = path.resolve(
  getDirname(import.meta.url),
  '../../../var',
)

export const varFile = (filename: string) =>
  path.resolve(varDirectory, filename)

export const cwdVarDirectory = path.resolve(process.cwd(), '../../var')

export const cwdVarFile = (filename: string) =>
  path.resolve(cwdVarDirectory, filename)
