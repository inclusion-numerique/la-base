import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

/**
 * Depending on the branch, we use a different prefix for the storage
 */
export const getStoragePrefix = (): string => {
  if (ServerWebAppConfig.isCi) {
    return 'ci'
  }

  if (ServerWebAppConfig.isLocal) {
    return 'local'
  }

  if (ServerWebAppConfig.isE2e) {
    return 'e2e'
  }

  return ServerWebAppConfig.Namespace || 'local'
}
