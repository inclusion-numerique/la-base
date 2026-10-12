import { output } from '@app/cli/output'
import { Command } from '@commander-js/extra-typings'
import { imageNameForBranch } from './registryRetention'
import {
  deleteImage,
  listWebAppImages,
  webAppImagePrefix,
} from './scalewayRegistry'

const protectedBranches = ['main', 'dev']

export const deleteRegistryImage = new Command()
  .command('infrastructure:delete-registry-image')
  .description('Delete the container image of a preview branch')
  .argument('<branch>', 'Branch whose image to delete')
  .action(async (branch) => {
    if (protectedBranches.includes(branch)) {
      throw new Error(`The image of ${branch} is never deleted`)
    }

    const name = imageNameForBranch(webAppImagePrefix, branch)
    const image = (await listWebAppImages()).find(
      (candidate) => candidate.name === name,
    )

    if (!image) {
      output(`No image ${name} in the registry`)
      return
    }

    await deleteImage(image.id)
    output(`Image ${name} deleted`)
  })
