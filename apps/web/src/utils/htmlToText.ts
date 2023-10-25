import { htmlToText as htmlToTextLibrary } from 'html-to-text'

export const htmlToText = (html: string): string => htmlToTextLibrary(html, {})
