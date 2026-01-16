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

  it('Acceptation 2 - Utilisateur skip l\'onboarding via le bouton "Revenir plus tard" - redirection direct', () => {
    cy.createUserAndSignin(userWithoutNewsFeed)
    cy.intercept('/api/trpc/newsFeed*').as('mutation')

    cy.visit('/')
    cy.appUrlShouldBe('/fil-d-actualite/onboarding')

    cy.contains("Découvrez un fil d'actualité adapté à vos préférences")
    cy.contains('Revenir plus tard').click()
    cy.wait('@mutation')

    cy.appUrlShouldBe('/')
  })

  it('Acceptation 3 - Utilisateur skip l\'onboarding via le bouton "Revenir plus tard" - modale', () => {
    const user = givenUser({
      newsFeed: {
        create: {
          themes: ['Accessibilite'],
          professionalSectors: [],
        },
      },
    })
    cy.createUserAndSignin(user)

    cy.visit('/')
    cy.testId('news-feed-button').click()
    cy.appUrlShouldBe('/fil-d-actualite/onboarding')

    cy.contains("Découvrez un fil d'actualité adapté à vos préférences")

    // Ensure DSFR is fully loaded before interacting with modal
    cy.dsfrShouldBeStarted()

    // Wait for DSFR modals to be bound (important for modal functionality)
    cy.wait(500) // Additional wait for DSFR binding

    cy.contains('Revenir plus tard').click()

    cy.get('#news-feed-onboarding-modal').should('have.attr', 'open')
    cy.get('#news-feed-onboarding-modal').contains(
      'Êtes-vous sûr de vouloir quitter le choix de vos préférences ?',
    )
    cy.get('#news-feed-onboarding-modal')
      .find('button')
      .contains('Quitter')
      .click()

    cy.appUrlShouldBe('/')
  })

  it("Acceptation 4 - Utilisateur suit tout le processus d'onboarding", () => {
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

    cy.appUrlShouldBe('/fil-d-actualite/tout?onboarding=true')
  })

  it("Acceptation 5 - Utilisateur qui a skip peut accéder à l'onboarding via le bouton header", () => {
    cy.createUserAndSignin(userWithNewsFeedIncomplete)
    cy.visit('/')

    cy.testId('news-feed-button').click()

    cy.appUrlShouldBe('/fil-d-actualite/onboarding')
    cy.contains("Découvrez un fil d'actualité adapté à vos préférences")
  })

  it("Acceptation 6 - Utilisateur qui a complété l'onboarding accède au fil d'actualité via le header", () => {
    cy.createUserAndSignin(userWithNewsFeedComplete)
    cy.visit('/')
    cy.testId('news-feed-button').click()

    cy.appUrlShouldBe('/fil-d-actualite/tout')
  })

  it("Acceptation 7 - Utilisateur connecté avec newsFeed complet ne peut pas accéder à l'onboarding", () => {
    cy.createUserAndSignin(userWithNewsFeedComplete)
    cy.visit('/fil-d-actualite/onboarding')
    cy.appUrlShouldBe('/fil-d-actualite/tout')
  })
})
