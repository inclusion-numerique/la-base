export const MAX_NAMESPACE_LENGTH = 32

export const computeBranchNamespace = (branch: string) =>
  branch
    .replaceAll(/[./@_]/g, '-')
    .replaceAll(/\d/g, '')
    .replaceAll(/--+/g, '-')
    .replace(/^-/, '')
    .slice(0, MAX_NAMESPACE_LENGTH)
    .replace(/-$/, '')
    .toLowerCase()
