describe('getUserContentRobots', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv, BRANCH: 'main' }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  // La branche est lue au chargement du module : on l'importe après l'avoir fixée
  const getRobots = async (isPublic: boolean | null, isTrusted: boolean) => {
    const { getUserContentRobots } = await import('./getUserContentRobots')
    return getUserContentRobots({ isPublic, isTrusted: async () => isTrusted })
  }

  it('laisse indexer le contenu public d’un auteur de confiance', async () => {
    expect(await getRobots(true, true)).toBeUndefined()
  })

  it('ne laisse ni indexer ni suivre les liens du contenu public d’un auteur qui n’est pas de confiance', async () => {
    expect(await getRobots(true, false)).toBe('noindex, nofollow')
  })

  it.each([false, null])(
    'ne laisse ni indexer ni suivre un contenu privé (%s)',
    async (isPublic) => {
      expect(await getRobots(isPublic, true)).toBe('noindex, nofollow')
    },
  )

  it('ne change rien aux contenus publics hors production', async () => {
    process.env.BRANCH = 'dev'

    expect(await getRobots(true, false)).toBeUndefined()
  })
})

describe('getNeverIndexedRobots', () => {
  it('garde le suivi des liens des profils et avis publics', async () => {
    const { getNeverIndexedRobots } = await import('./getUserContentRobots')

    expect(getNeverIndexedRobots({ isPublic: true })).toBe('noindex, follow')
    expect(getNeverIndexedRobots({ isPublic: false })).toBe('noindex, nofollow')
  })
})
