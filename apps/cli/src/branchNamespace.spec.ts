import { computeBranchNamespace, MAX_NAMESPACE_LENGTH } from './branchNamespace'

describe('computeBranchNamespace', () => {
  it('keeps a short branch name as is', () => {
    expect(computeBranchNamespace('fix/contrat-terme-futur')).toEqual(
      'fix-contrat-terme-futur',
    )
  })

  it('truncates a long branch name', () => {
    const namespace = computeBranchNamespace(
      'feat/une-branche-au-nom-deraisonnablement-long',
    )

    expect(namespace).toEqual('feat-une-branche-au-nom-deraison')
    expect(namespace).toHaveLength(MAX_NAMESPACE_LENGTH)
  })

  it('never overflows the 63 characters of the uploads bucket name, its tightest resource', () => {
    const namespace = computeBranchNamespace(
      'feat/une-branche-au-nom-deraisonnablement-long-comme-il-en-existe',
    )

    expect(`la-base-uploads-${namespace}`.length).toBeLessThanOrEqual(63)
  })

  it('removes the trailing hyphen left by the truncation', () => {
    expect(
      computeBranchNamespace('fix/aaaaaaaaaaaaaaaaaaaaaaaaaaa-bb'),
    ).toEqual('fix-aaaaaaaaaaaaaaaaaaaaaaaaaaa')
  })

  it('drops digits, and the hyphen they leave dangling', () => {
    expect(computeBranchNamespace('fix/issue-1836')).toEqual('fix-issue')
  })

  it('replaces dots, at signs and underscores with hyphens', () => {
    expect(computeBranchNamespace('Dependabot/npm_and_yarn/next@')).toEqual(
      'dependabot-npm-and-yarn-next',
    )
  })
})
