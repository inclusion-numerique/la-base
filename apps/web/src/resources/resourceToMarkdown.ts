import TurndownService from 'turndown'
import { ResourceForMarkdown } from '@app/web/resources/getResourceForMarkdown'
import { themeLabels } from '@app/web/themes/themes'
import { supportTypeLabels } from '@app/web/themes/supportTypes'
import { targetAudienceLabels } from '@app/web/themes/targetAudiences'

const turndownService = new TurndownService()

const contentToMarkdown = ({
  type,
  caption,
  linkDescription,
  text,
  file,
  imageAltText,
  linkTitle,
  title,
  image,
  url,
}: ResourceForMarkdown['contents'][number]): string => {
  if (type === 'SectionTitle') {
    return `## ${title}`
  }

  if (type === 'Text' && text) {
    // converts html text to markdown using "turndown" library
    return turndownService.turndown(text)
  }

  if (type === 'File' && file) {
    return `**Fichier téléchargeable ${title ? ':' : ''} ${title}** :  
${caption}
${file.name}
`
  }

  if (type === 'Image' && image) {
    return `**Image ${title ? ':' : ''} ${title}** :
${caption}
${imageAltText}
${image.upload.name}
`
  }

  if (type === 'Link') {
    const parts: string[] = []

    if (title) {
      parts.push(`**${title}**`)
    }
    if (caption) {
      parts.push(`${caption}`)
    }

    if (linkDescription) {
      parts.push(`${linkDescription}`)
    }

    if (url) {
      parts.push(`[${linkTitle || url}](${url})`)
    }

    return parts.join('\n')
  }

  // Should not happen
  return ''
}

/**
 * Converts a resource to markdown
 */
export const resourceToMarkdown = ({
  title,
  slug,
  description,
  themes,
  contents,
  targetAudiences,
  supportTypes,
}: ResourceForMarkdown): string =>
  `# ${title}
Type: Ressource
Url: https://lesbases.anct.gouv.fr/ressources/${slug}

${description}

Themes: ${themes.map((theme) => themeLabels[theme]).join(', ')}
Type de support: ${supportTypes.map((supportType) => supportTypeLabels[supportType]).join(', ')}
Public cible: ${targetAudiences.map((targetAudience) => targetAudienceLabels[targetAudience]).join(', ')}

${contents.map((content) => contentToMarkdown(content)).join('\n\n')}
`
