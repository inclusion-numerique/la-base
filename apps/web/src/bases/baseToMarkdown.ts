import TurndownService from 'turndown'
import type { BaseForMarkdown } from '@app/web/bases/getBaseForMarkdown'

const turndownService = new TurndownService()

/**
 * Converts a public base to markdown
 */
export const baseToMarkdown = ({
  title,
  slug,
  description,
}: BaseForMarkdown): string => `# ${title}
Type: Base
Url: https://lesbases.anct.gouv.fr/bases/${slug}

${description ? turndownService.turndown(description) : ''}
`
