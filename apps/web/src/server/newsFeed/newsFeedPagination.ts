/**
 * Isolé de getNewsFeedResources pour que les composants clients puissent lire cette
 * constante sans embarquer le client Prisma (et son driver pg) dans leur bundle.
 */
export const NEWS_FEED_DEFAULT_PER_PAGE = 20
