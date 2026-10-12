import {
  isGouvFrEmail,
  isTrustedUser,
  type TrustedUserSignals,
  trustedUserMinPublicResourcesViews,
} from '@app/web/features/indexation/trustedUser'

const now = new Date('2026-10-06T12:00:00.000Z')

const daysAgo = (days: number) =>
  new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

const givenSignals = (
  signals: Partial<TrustedUserSignals>,
): TrustedUserSignals => ({
  email: 'utilisateur@exemple.com',
  emailVerified: daysAgo(400),
  created: daysAgo(400),
  publicResourcesViewsCount: 0,
  hasRecommendedPublicResource: false,
  ...signals,
})

describe('isGouvFrEmail', () => {
  it.each([
    'agent@gouv.fr',
    'agent@anct.gouv.fr',
    'agent@inclusion-numerique.anct.gouv.fr',
    'Agent@ANCT.GOUV.FR',
  ])('accepte %s', (email) => {
    expect(isGouvFrEmail(email)).toBe(true)
  })

  it.each([
    'agent@fauxgouv.fr',
    'agent@gouv.fr.exemple.com',
    'gouv.fr@exemple.com',
    'agent@exemple.fr',
    'agent@gouv.fr.',
  ])('refuse %s', (email) => {
    expect(isGouvFrEmail(email)).toBe(false)
  })
})

describe('isTrustedUser', () => {
  it('fait confiance à un compte gouv.fr créé aujourd’hui', () => {
    expect(
      isTrustedUser(
        givenSignals({
          email: 'agent@gouv.fr',
          created: now,
          emailVerified: now,
        }),
        now,
      ),
    ).toBe(true)
  })

  it('fait confiance à un sous-domaine de gouv.fr, même récent', () => {
    expect(
      isTrustedUser(
        givenSignals({
          email: 'agent@anct.gouv.fr',
          created: daysAgo(2),
        }),
        now,
      ),
    ).toBe(true)
  })

  it('ne fait pas confiance à un email gouv.fr non vérifié', () => {
    expect(
      isTrustedUser(
        givenSignals({ email: 'agent@anct.gouv.fr', emailVerified: null }),
        now,
      ),
    ).toBe(false)
  })

  it.each(['spam@gouv.fr.exemple.com', 'spam@fauxgouv.fr'])(
    'ne fait pas confiance à un faux domaine : %s',
    (email) => {
      expect(isTrustedUser(givenSignals({ email }), now)).toBe(false)
    },
  )

  it('ne fait pas confiance à un compte ancien sans vues ni recommandation', () => {
    expect(isTrustedUser(givenSignals({}), now)).toBe(false)
  })

  it('ne fait pas confiance à 999 vues', () => {
    expect(
      isTrustedUser(givenSignals({ publicResourcesViewsCount: 999 }), now),
    ).toBe(false)
  })

  it('fait confiance à partir de 1000 vues', () => {
    expect(trustedUserMinPublicResourcesViews).toBe(1000)
    expect(
      isTrustedUser(givenSignals({ publicResourcesViewsCount: 1000 }), now),
    ).toBe(true)
  })

  it('fait confiance à un compte dont une ressource publique est recommandée', () => {
    expect(
      isTrustedUser(givenSignals({ hasRecommendedPublicResource: true }), now),
    ).toBe(true)
  })

  it('ne fait pas confiance à un compte de 29 jours, même avec des vues et une recommandation', () => {
    expect(
      isTrustedUser(
        givenSignals({
          created: daysAgo(29),
          publicResourcesViewsCount: 50_000,
          hasRecommendedPublicResource: true,
        }),
        now,
      ),
    ).toBe(false)
  })

  it('fait confiance à un compte de 30 jours avec 1000 vues', () => {
    expect(
      isTrustedUser(
        givenSignals({
          created: daysAgo(30),
          publicResourcesViewsCount: 1000,
        }),
        now,
      ),
    ).toBe(true)
  })

  it('fait confiance à un compte de 30 jours avec une ressource recommandée', () => {
    expect(
      isTrustedUser(
        givenSignals({
          created: daysAgo(30),
          hasRecommendedPublicResource: true,
        }),
        now,
      ),
    ).toBe(true)
  })
})
