export type RegistryTag = {
  readonly id: string
  readonly name: string
  readonly createdAt: string
}

export type RegistryImage = {
  readonly id: string
  readonly name: string
}

export const tagsBeyondTheMostRecent = (
  tags: readonly RegistryTag[],
  kept: number,
): RegistryTag[] =>
  [...new Map(tags.map((tag) => [tag.id, tag])).values()]
    .sort((first, second) => second.createdAt.localeCompare(first.createdAt))
    .slice(kept)

export const imageNameForBranch = (prefix: string, branch: string): string =>
  `${prefix}${branch.replaceAll('/', '-').toLowerCase()}`

export const orphanImages = ({
  images,
  prefix,
  branches,
  permanentBranches,
}: {
  readonly images: readonly RegistryImage[]
  readonly prefix: string
  readonly branches: readonly string[]
  readonly permanentBranches: readonly string[]
}): RegistryImage[] => {
  const ownedImages = new Set(
    [...permanentBranches, ...branches].map((branch) =>
      imageNameForBranch(prefix, branch),
    ),
  )

  return images.filter(
    ({ name }) => name.startsWith(prefix) && !ownedImages.has(name),
  )
}
