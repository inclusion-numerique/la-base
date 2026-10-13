import { createHash } from 'node:crypto'

export const MAX_NAMESPACE_LENGTH = 29

export const BRANCH_SUFFIX_LENGTH = 6

const permanentBranches = new Set(['main', 'dev'])

const slugOf = (branch: string, length: number) =>
  branch
    .replaceAll(/[./@_]/g, '-')
    .replaceAll(/\d/g, '')
    .replaceAll(/--+/g, '-')
    .replace(/^-/, '')
    .slice(0, length)
    .replace(/-$/, '')
    .toLowerCase()

export const branchSuffix = (branch: string) =>
  [
    ...createHash('sha256')
      .update(branch)
      .digest()
      .subarray(0, BRANCH_SUFFIX_LENGTH),
  ]
    .map((byte) => String.fromCodePoint(97 + (byte % 26)))
    .join('')

export const computeBranchNamespace = (branch: string) =>
  permanentBranches.has(branch)
    ? branch
    : [
        slugOf(branch, MAX_NAMESPACE_LENGTH - BRANCH_SUFFIX_LENGTH - 1),
        branchSuffix(branch),
      ]
        .filter(Boolean)
        .join('-')
