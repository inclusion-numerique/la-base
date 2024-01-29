import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

/**
 * Best practice is to suffix the metadata title with the name of the website
 */
export const metadataTitle = (title: string) =>
  `${title} | ${PublicWebAppConfig.projectTitle}`
