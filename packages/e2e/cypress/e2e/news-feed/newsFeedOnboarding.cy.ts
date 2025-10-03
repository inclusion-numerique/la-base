import { givenUser } from '@app/e2e/support/given/givenUser'

describe("ETQ Utilisateur, je peux gérer mon fil d'actualité et son onboarding", () => {
  // Users for different test scenarios
  const userWithoutNewsFeed = givenUser({ newsFeed: undefined })
  const userWithNewsFeedIncomplete = givenUser({
    newsFeed: {
      create: {
        themes: [],
        professionalSectors: [],
        hasCompleteOnboarding: false,
      },
    },
  })
  const userWithNewsFeedComplete = givenUser({
    newsFeed: {
      create: {
        themes: ['Accessibilite'],
        professionalSectors: ['ActeursPrivesEtAssociatifs'],
        hasCompleteOnboarding: true,
      },
    },
  })

  beforeEach(() => {
    cy.execute('deleteAllData', {})
  })

  it("Acceptation 1 - Utilisateur connecté sans newsFeed est redirigé vers l'onboarding", () => {
    cy.createUserAndSignin(userWithoutNewsFeed)
    cy.visit('/')

    cy.appUrlShouldBe('/fil-d-actualite/onboarding')
    cy.contains("Découvrez un fil d'actualité adapté à vos préférences")
    cy.contains('Choisir mes préférences')
    cy.contains('Revenir plus tard')
  })

  it('Acceptation 2 - Utilisateur skip l\'onboarding via le bouton "Revenir plus tard"', () => {
    cy.createUserAndSignin(userWithoutNewsFeed)
    cy.visit('/')
    cy.appUrlShouldBe('/fil-d-actualite/onboarding')

    cy.contains("Découvrez un fil d'actualité adapté à vos préférences")
    cy.contains('Revenir plus tard').click()

    cy.appUrlShouldBe('/')
  })

  it("Acceptation 3 - Utilisateur suit tout le processus d'onboarding", () => {
    cy.intercept('/api/trpc/newsFeed*').as('mutation')

    cy.createUserAndSignin(userWithoutNewsFeed)
    cy.visit('/fil-d-actualite/onboarding')

    cy.contains('Choisir mes préférences').click()

    cy.appUrlShouldBe('/fil-d-actualite/onboarding/secteurs-professionnels')
    cy.contains('Quel secteur professionnel vous intéresse ?')

    cy.get('input[type="checkbox"], input[type="radio"]')
      .first()
      .check({ force: true })
    cy.contains('Suivant').click()
    cy.wait('@mutation')

    cy.appUrlShouldBe('/fil-d-actualite/onboarding/themes')
    cy.contains('Quelles thématiques vous intéressent ?')

    cy.get('input[type="checkbox"], input[type="radio"]')
      .first()
      .check({ force: true })
    cy.contains('Suivant').click()
    cy.wait('@mutation')

    cy.appUrlShouldBe('/fil-d-actualite/onboarding/bases')
    cy.contains('Suivant').click()

    cy.appUrlShouldBe('/fil-d-actualite/onboarding/resume-mensuel')
    cy.contains('Valider mes préférences').click()
    cy.wait('@mutation')

    cy.contains("Votre fil d'actualité est prêt !")

    cy.appUrlShouldBe('/fil-d-actualite?onboarding=true')
  })

  it("Acceptation 4 - Utilisateur qui a skip peut accéder à l'onboarding via le bouton header", () => {
    cy.createUserAndSignin(userWithNewsFeedIncomplete)
    cy.visit('/')

    cy.testId('news-feed-button').click()

    cy.appUrlShouldBe('/fil-d-actualite/onboarding')
    cy.contains("Découvrez un fil d'actualité adapté à vos préférences")
  })

  it("Acceptation 5 - Utilisateur qui a complété l'onboarding accède au fil d'actualité via le header", () => {
    cy.createUserAndSignin(userWithNewsFeedComplete)
    cy.visit('/')
    cy.testId('news-feed-button').click()

    cy.appUrlShouldBe('/fil-d-actualite')
  })

  it("Acceptation 6 - Utilisateur connecté avec newsFeed complet ne peut pas accéder à l'onboarding", () => {
    cy.createUserAndSignin(userWithNewsFeedComplete)
    cy.visit('/fil-d-actualite/onboarding')
    cy.appUrlShouldBe('/fil-d-actualite')
  })
})
