import { branch as gitBranch } from 'git-rev-sync'

export const getBranch = () => process.env.CDK_FORCE_BRANCH || gitBranch()

export const computeBranchNamespace = (branch: string) =>
  branch
    // Replace special characters with hyphen
    .replaceAll(/[./@_]/g, '-')
    // Do not include digits
    .replaceAll(/\d/g, '')
    // When digits are removed, there might be multiple hyphens in a row
    .replaceAll(/--+/g, '-')
    // Remove prefix hyphen
    .replace(/^-/, '')
    // Namespace should be shorter than 32 chars to ensure all resources can be deployed
    .slice(0, 32)
    // Remove suffix hyphen
    .replace(/-$/, '')
    .toLowerCase()

export const namespacer = (namespace: string) => (name: string) =>
  `${name}-${namespace}`

export const generateDatabaseUrl = ({
  user,
  password,
  host,
  port,
  name,
}: {
  user: string
  password: string
  host: string
  port: number
  name: string
}) =>
  `postgres://${user}:${encodeURIComponent(password)}@${host}:${port}/${name}`

export const shortenNamespace = (namespace: string, length: number) =>
  namespace
    .slice(0, length)
    // Remove trailing hyphen
    .replace(/-$/, '')
    // Remove trailing underscore
    .replace(/_$/, '')

export const createPreviewSubdomain = (
  namespace: string,
  previewDomain: string,
) => {
  // DNS record has to be 63 chars or shorter
  const maxRecordLength = 63
  // We will add a ".", also remove 1
  const maxNamespaceLength = maxRecordLength - 1 - previewDomain.length

  const subdomain = shortenNamespace(namespace, maxNamespaceLength)

  return { hostname: `${subdomain}.${previewDomain}`, subdomain }
}
