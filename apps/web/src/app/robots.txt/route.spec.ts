describe('robots.txt', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  // La configuration est lue au chargement du module : on l'importe après
  // avoir fixé la branche
  const getRobotsTxt = async (branch: string | undefined) => {
    if (branch === undefined) {
      delete process.env.BRANCH
    } else {
      process.env.BRANCH = branch
    }
    const { GET } = await import('./route')
    return GET()
  }

  it('autorise l’exploration en production', async () => {
    const response = await getRobotsTxt('main')

    expect(await response.text()).toBe('User-agent: *\nAllow: /\n')
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=3600')
  })

  it.each([
    ['dev', 'dev'],
    ['une preview', 'feat/exemple'],
    ['le local', undefined],
  ])('interdit l’exploration sur %s', async (_label, branch) => {
    const response = await getRobotsTxt(branch)

    expect(await response.text()).toBe('User-agent: *\nDisallow: /\n')
  })

  it('est calculée à chaque requête, pas au build', async () => {
    const { dynamic } = await import('./route')

    expect(dynamic).toBe('force-dynamic')
  })
})
