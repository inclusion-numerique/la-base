import {
  BRANCH_SUFFIX_LENGTH,
  branchSuffix,
  computeBranchNamespace,
  MAX_NAMESPACE_LENGTH,
} from './branchNamespace'

const previewDomain = 'v2.labase.incubateur.anct.gouv.fr'

const previewSubdomain = (namespace: string) =>
  namespace.slice(0, 63 - 1 - previewDomain.length).replace(/[-_]$/, '')

describe('computeBranchNamespace', () => {
  it('keeps main and dev as they are, as their states are named after them', () => {
    expect(computeBranchNamespace('main')).toEqual('main')
    expect(computeBranchNamespace('dev')).toEqual('dev')
  })

  it('suffixes the slug of a preview branch with letters derived from the whole branch name', () => {
    expect(computeBranchNamespace('fix/contrat-futur')).toEqual(
      `fix-contrat-futur-${branchSuffix('fix/contrat-futur')}`,
    )
  })

  it('derives a suffix made of lowercase letters only', () => {
    expect(branchSuffix('fix/issue-1836')).toMatch(
      new RegExp(`^[a-z]{${BRANCH_SUFFIX_LENGTH}}$`),
    )
  })

  it('always gives the same namespace to the same branch', () => {
    expect(computeBranchNamespace('feat/preview')).toEqual(
      computeBranchNamespace('feat/preview'),
    )
  })

  it('separates branches that only differ by their digits', () => {
    expect(computeBranchNamespace('fix/issue-12')).not.toEqual(
      computeBranchNamespace('fix/issue-34'),
    )
  })

  it('separates branches that only differ by a slash or a hyphen', () => {
    expect(computeBranchNamespace('feat/a-b')).not.toEqual(
      computeBranchNamespace('feat/a/b'),
    )
  })

  it('never names a preview like main or dev', () => {
    expect(computeBranchNamespace('main/')).not.toEqual('main')
    expect(computeBranchNamespace('dev1')).not.toEqual('dev')
  })

  it('truncates a long branch name and keeps its suffix', () => {
    const branch = 'feat/une-branche-au-nom-deraisonnablement-long'
    const namespace = computeBranchNamespace(branch)

    expect(namespace).toEqual(`feat-une-branche-au-no-${branchSuffix(branch)}`)
    expect(namespace).toHaveLength(MAX_NAMESPACE_LENGTH)
  })

  it('keeps the suffix in the preview subdomain, the tightest name', () => {
    const branch =
      'feat/une-branche-au-nom-deraisonnablement-long-comme-il-en-existe'
    const namespace = computeBranchNamespace(branch)

    expect(previewSubdomain(namespace)).toEqual(namespace)
    expect(namespace.endsWith(branchSuffix(branch))).toBe(true)
  })

  it('never overflows the 63 characters of the uploads bucket name', () => {
    expect(
      `la-base-uploads-${computeBranchNamespace('feat/une-branche-au-nom-deraisonnablement-long')}`
        .length,
    ).toBeLessThanOrEqual(63)
  })

  it('removes the trailing hyphen left by the truncation', () => {
    const branch = 'fix/aaaaaaaaaaaaaaaaa-bb'

    expect(computeBranchNamespace(branch)).toEqual(
      `fix-aaaaaaaaaaaaaaaaa-${branchSuffix(branch)}`,
    )
  })

  it('drops digits, and the hyphen they leave dangling', () => {
    expect(computeBranchNamespace('fix/issue-1836')).toEqual(
      `fix-issue-${branchSuffix('fix/issue-1836')}`,
    )
  })

  it('replaces dots, at signs and underscores with hyphens', () => {
    const branch = 'Dependabot/npm_and_yarn/next@'

    expect(computeBranchNamespace(branch)).toEqual(
      `dependabot-npm-and-yar-${branchSuffix(branch)}`,
    )
  })

  it('falls back on the suffix alone when the branch has no letter', () => {
    expect(computeBranchNamespace('1234')).toEqual(branchSuffix('1234'))
  })
})
