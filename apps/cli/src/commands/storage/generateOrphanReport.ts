import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { stringify } from 'csv-stringify/sync'
import type { OrphanCategory, OrphanedFile } from './types'

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${units[i]}`
}

export const generateOrphanReport = ({
  orphans,
  outputDir,
  isDryRun,
}: {
  orphans: OrphanedFile[]
  outputDir: string
  isDryRun: boolean
}): { filepath: string; filename: string } => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `orphaned-files-${isDryRun ? 'dryrun' : 'deleted'}-${timestamp}.csv`
  const filepath = join(outputDir, filename)

  const headers = ['Key', 'Category', 'Reason', 'Size (bytes)', 'Last Modified']

  const rows = orphans.map((o) => [
    o.key,
    o.category,
    o.reason,
    o.size.toString(),
    o.lastModified?.toISOString() ?? 'inconnu',
  ])

  const csvContent = stringify([headers, ...rows], {
    delimiter: ';',
    bom: true,
  })

  writeFileSync(filepath, csvContent, 'utf-8')

  return { filepath, filename }
}

export const printSummary = ({
  orphans,
  stats,
  isDryRun,
  filepath,
}: {
  orphans: OrphanedFile[]
  stats: {
    totalScanned: number
    skippedExternalImage: number
    skippedFileContent: number
    skippedTooRecent: number
  }
  isDryRun: boolean
  filepath: string
}): string => {
  const categoryGroups = new Map<OrphanCategory, OrphanedFile[]>()
  for (const orphan of orphans) {
    const group = categoryGroups.get(orphan.category) ?? []
    group.push(orphan)
    categoryGroups.set(orphan.category, group)
  }

  const totalSize = orphans.reduce((sum, o) => sum + o.size, 0)

  const lines: string[] = [
    '',
    '=== Rapport de recyclage S3 ===',
    `Objets S3 scannes : ${stats.totalScanned.toLocaleString('fr-FR')}`,
    `Fichiers exclus (external-image) : ${stats.skippedExternalImage.toLocaleString('fr-FR')}`,
    `Fichiers exclus (Content non-image) : ${stats.skippedFileContent.toLocaleString('fr-FR')}`,
    `Fichiers exclus (< seuil) : ${stats.skippedTooRecent.toLocaleString('fr-FR')}`,
    `Fichiers orphelins trouves : ${orphans.length.toLocaleString('fr-FR')}`,
    '',
    'Par categorie :',
  ]

  const categories: OrphanCategory[] = [
    'no-upload-record',
    'upload-no-image',
    'image-no-entity',
    'orphaned-webp-cache',
    'legacy-unreferenced',
  ]

  for (const category of categories) {
    const group = categoryGroups.get(category)
    if (group) {
      const groupSize = group.reduce((sum, o) => sum + o.size, 0)
      lines.push(
        `  ${category.padEnd(25)} ${group.length.toString().padStart(6)} (${formatBytes(groupSize)})`,
      )
    }
  }

  lines.push('')
  lines.push(`Espace recuperable total : ${formatBytes(totalSize)}`)
  lines.push('')

  if (isDryRun) {
    lines.push('Mode : DRY RUN (utiliser --delete pour supprimer)')
  } else {
    lines.push('Mode : SUPPRESSION')
  }

  lines.push(`Rapport : ${filepath}`)
  lines.push('')

  return lines.join('\n')
}
