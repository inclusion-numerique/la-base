/**
 * List of mime types that are displayable in the browser.
 * This is not exhaustive, but it's a good starting point.
 * This allows us to display a "preview" button of a file for the user if the mime type is in this list.
 */
export const mimeTypesDisplayableInBrowser = new Set([
  'application/atom+xml',
  'application/javascript',
  'application/json',
  'application/pdf',
  'application/rss+xml',
  'application/xhtml+xml',
  'application/xml',

  'audio/mpeg',
  'audio/ogg',
  'audio/wav',

  'font/woff',
  'font/woff2',

  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'image/x-icon',

  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/xml',

  'video/mp4',
  'video/ogg',
  'video/webm',
])
