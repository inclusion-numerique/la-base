import type { ResourceForMarkdown } from '@app/web/resources/getResourceForMarkdown'
import { beneficiariesLabels } from '@app/web/themes/beneficiairies'
import { professionalSectorsLabels } from '@app/web/themes/professionalSectors'
import { resourceTypesLabels } from '@app/web/themes/resourceTypes'
import { themeLabels } from '@app/web/themes/themes'
import TurndownService from 'turndown'

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
  description,
  themes,
  contents,
  beneficiaries,
  professionalSectors,
  resourceTypes,
}: ResourceForMarkdown): string =>
  `# ${title}

${description}

${
  themes.length > 0 &&
  `Thématiques : ${themes.map((theme) => themeLabels[theme]).join(', ')}`
}

${
  resourceTypes.length > 0 &&
  `Type de support : ${resourceTypes
    .map((resourceType) => resourceTypesLabels[resourceType])
    .join(', ')}`
}  

${
  beneficiaries.length > 0 &&
  `Bénéficiaires : ${beneficiaries
    .map((beneficiary) => beneficiariesLabels[beneficiary])
    .join(', ')}`
}

${
  professionalSectors.length > 0 &&
  `Secteurs professionnels : ${professionalSectors
    .map((professionalSector) => professionalSectorsLabels[professionalSector])
    .join(', ')}`
}



${contents.map((content) => contentToMarkdown(content)).join('\n\n')}
`
