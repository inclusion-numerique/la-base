import { writeFileSync } from 'node:fs'
import { octokit, owner, repo } from '@app/cli/github'
import { output } from '@app/cli/output'
import { Command } from '@commander-js/extra-typings'
import {
  imageNameForBranch,
  orphanImages,
  type RegistryImage,
  type RegistryTag,
  tagsBeyondTheMostRecent,
} from './registryRetention'
import {
  deleteImage,
  deleteTag,
  listImageTags,
  listWebAppImages,
  webAppImagePrefix,
} from './scalewayRegistry'

const permanentBranches = ['main', 'dev']

type Removal =
  | { readonly kind: 'image'; readonly image: RegistryImage }
  | {
      readonly kind: 'tag'
      readonly image: RegistryImage
      readonly tag: RegistryTag
    }

const remoteBranches = async (
  page = 1,
  collected: string[] = [],
): Promise<string[]> => {
  const { data } = await octokit.rest.repos.listBranches({
    owner,
    repo,
    per_page: 100,
    page,
  })
  const all = [...collected, ...data.map(({ name }) => name)]
  return data.length < 100 ? all : remoteBranches(page + 1, all)
}

const tagsToRemove = async (
  images: readonly RegistryImage[],
  branch: string,
  kept: number,
): Promise<Removal[]> => {
  const image = images.find(
    ({ name }) => name === imageNameForBranch(webAppImagePrefix, branch),
  )
  if (!image) return []
  const tags = await listImageTags(image.id)
  return tagsBeyondTheMostRecent(tags, kept).map((tag) => ({
    kind: 'tag',
    image,
    tag,
  }))
}

const csvLine = (removal: Removal): string =>
  removal.kind === 'image'
    ? `image;${removal.image.name};;`
    : `tag;${removal.image.name};${removal.tag.name};${removal.tag.createdAt}`

const remove = (removal: Removal): Promise<void> =>
  removal.kind === 'image'
    ? deleteImage(removal.image.id)
    : deleteTag(removal.tag.id)

export const pruneRegistry = new Command()
  .command('infrastructure:prune-registry')
  .description(
    'Delete the images of branches that no longer exist and the oldest tags of main and dev (dry run unless --apply)',
  )
  .option('--apply', 'Delete instead of only listing', false)
  .option('--keep-main <count>', 'Number of main tags to keep', '10')
  .option('--keep-dev <count>', 'Number of dev tags to keep', '5')
  .option('--report <file>', 'Write the removals to a CSV file')
  .action(async ({ apply, keepMain, keepDev, report }) => {
    const [images, branches] = await Promise.all([
      listWebAppImages(),
      remoteBranches(),
    ])

    if (!branches.includes('main')) {
      throw new Error(
        'The branch list does not contain main: refusing to treat every image as an orphan',
      )
    }

    const orphans: Removal[] = orphanImages({
      images,
      prefix: webAppImagePrefix,
      branches,
      permanentBranches,
    }).map((image) => ({ kind: 'image', image }))

    const oldTags = [
      ...(await tagsToRemove(images, 'main', Number(keepMain))),
      ...(await tagsToRemove(images, 'dev', Number(keepDev))),
    ]

    const removals = [...oldTags, ...orphans]

    if (report) {
      writeFileSync(
        report,
        `${['type;image;tag;cree_le', ...removals.map(csvLine)].join('\n')}\n`,
      )
      output(`Report written to ${report}`)
    }

    output(
      `${orphans.length} orphan image(s), ${oldTags.length} old tag(s) of main and dev${apply ? '' : ' (dry run)'}`,
    )

    if (!apply) return

    await removals.reduce<Promise<void>>(
      (previous, removal) => previous.then(() => remove(removal)),
      Promise.resolve(),
    )

    output(`${removals.length} removal(s) done`)
  })
