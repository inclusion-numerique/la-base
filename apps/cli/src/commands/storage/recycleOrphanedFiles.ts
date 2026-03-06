import {
  configureDeploymentTarget,
  DeploymentTargetOption,
} from '@app/cli/deploymentTarget'
import { output } from '@app/cli/output'
import { recursiveListItems } from '@app/web/features/uploads/migration/listStorageItems'
import { prismaClient } from '@app/web/prismaClient'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { Command, Option } from '@commander-js/extra-typings'
import { deleteOrphanedFiles } from './deleteOrphanedFiles'
import { findOrphanedFiles } from './findOrphanedFiles'
import { generateOrphanReport, printSummary } from './generateOrphanReport'

export const recycleOrphanedFiles = new Command()
  .command('s3:recycle-orphaned-files')
  .description(
    'Identifie et supprime les fichiers S3 orphelins (images non reférencees depuis 3+ mois)',
  )
  .addOption(DeploymentTargetOption)
  .addOption(
    new Option('--prefix <prefix>', 'Préfix S3 a scanner').default('main/'),
  )
  .addOption(new Option('--include-legacy', 'Scanner aussi le prefix legacy/'))
  .addOption(
    new Option(
      '--threshold-months <months>',
      'Seuil en mois pour considérer un fichier comme orphelin',
    ).default('3'),
  )
  .addOption(
    new Option(
      '--output-dir <dir>',
      'Répertoire de sortie pour le rapport CSV',
    ).default('./'),
  )
  .addOption(
    new Option(
      '--delete',
      'Supprimer réellement les fichiers orphelins (defaut: dry-run)',
    ),
  )
  .addOption(
    new Option(
      '--batch-size <size>',
      'Taille de batch pour les suppressions S3',
    ).default('100'),
  )
  .action(async (options) => {
    await configureDeploymentTarget(options)

    const thresholdMonths = Number.parseInt(options.thresholdMonths, 10)
    const batchSize = Number.parseInt(options.batchSize, 10)
    const isDryRun = !options.delete

    const thresholdDate = new Date()
    thresholdDate.setMonth(thresholdDate.getMonth() - thresholdMonths)

    output(`Seuil : fichiers antérieurs au ${thresholdDate.toISOString()}`)
    output(`Mode : ${isDryRun ? 'DRY RUN' : 'SUPPRESSION'}`)

    const bucket = ServerWebAppConfig.S3.uploadsBucket
    output(`Scan du bucket S3 ${bucket}, prefix: ${options.prefix}...`)
    let { items: s3Objects } = await recursiveListItems({
      bucket,
      prefix: options.prefix,
    })
    output(`  ${s3Objects.length} objets trouves sous ${options.prefix}`)

    if (options.includeLegacy) {
      output('Scan du prefix legacy/...')
      const { items: legacyObjects } = await recursiveListItems({
        bucket,
        prefix: 'legacy/',
      })
      output(`  ${legacyObjects.length} objets trouvés sous legacy/`)
      s3Objects = [...s3Objects, ...legacyObjects]
    }

    output(`Total : ${s3Objects.length} objets S3 à analyser`)

    output('Analyse des orphelins...')
    const { orphans, stats } = await findOrphanedFiles({
      s3Objects,
      thresholdDate,
    })

    // -- we generate report on dry run
    if (isDryRun) {
      const { filepath } = generateOrphanReport({
        orphans,
        outputDir: options.outputDir,
        isDryRun,
      })

      output(printSummary({ orphans, stats, isDryRun, filepath }))
    }

    if (!isDryRun && orphans.length > 0) {
      output('Suppression des fichiers orphelins...')
      const { deletedCount, errorCount } = await deleteOrphanedFiles({
        orphans,
        batchSize,
      })

      output(
        `Suppression terminee : ${deletedCount} supprimes, ${errorCount} erreurs`,
      )
    }

    await prismaClient.$disconnect()
  })
