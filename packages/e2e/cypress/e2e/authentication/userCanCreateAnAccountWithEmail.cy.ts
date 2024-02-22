import { givenUser } from '@app/e2e/support/given/givenUser'

describe('ETQ Utilisateur, lorsque je clique sur “Se créer un compte”, je peux créer un compte avec mon mail', () => {
  /**
   * US https://www.notion.so/ETQ-Utilisateur-lorsque-je-clique-sur-Cr-er-un-compte-je-peux-cr-er-un-compte-avec-mon-mail-19ceedd5ad574940af80f3f51d6943cf?pvs=4
   * Parcours https://www.figma.com/file/4wfmwOaKRnMhgiGEF256qS/La-Base---Parcours-utilisateurs?node-id=0-1&t=FqCnK7P9epO9Wpc4-0
   */

  // Unique user for this test
  const { email, firstName, lastName } = givenUser()

  it('Acceptation 0 - Création de compte par email sans valider les CGU', () => {
    cy.visit('/creer-un-compte')

    cy.log('Signup form fill and submit')
    cy.findByLabelText('Email').type(email)
    cy.findByLabelText('Prénom').type(firstName)
    cy.findByLabelText('Nom').type(lastName).type('{enter}')
    cy.contains(`Veuillez accepter les conditions générales d'utilisation`)
  })

  it('Acceptation 1 - Création de compte par email', () => {
    cy.visit('/creer-un-compte')

    cy.log('Signup form fill and submit')
    cy.findByLabelText('Email').type(email)
    cy.findByLabelText('Prénom').type(firstName)
    cy.findByLabelText('Nom').type(lastName)
    cy.get('#input-form-field__policyAccepted').check({ force: true })
    cy.findByText('Valider').click()
    cy.appUrlShouldBe('/connexion/verification', {
      timeout: 10_000,
    })

    cy.log('Magic link sent confirmation with email displayed')
    cy.contains('Un lien de connexion sécurisé a été envoyé')
    cy.contains(email)

    cy.log('Go check emails in maildev server')
    // Go to maildev server to checkout the email and get the magic link
    cy.visit('localhost:1080')
    cy.get('.email-list li a').first().click()

    cy.get('.email-meta .subject').should('contain', 'Connexion à Les Bases')

    // Cypress does not work well with iframes, we go to the html source of the email that is
    // included in the iframe preview of maildev ui
    cy.url().then((url) => {
      const emailPath = url.split('#').at(-1)
      if (!emailPath) {
        throw new Error('Could not find email content path from maildev url')
      }
      cy.visit(`localhost:1080${emailPath}/html`)
    })

    cy.log('Check mail contents')
    // We should not have the email html version in full
    cy.contains('Connexion à Les Bases')
    cy.contains('Se connecter').invoke('attr', 'target', '_self').click()

    // With a valid magic link we should be automatically redirected to homepage, logged in
    cy.log('User should now be signed in')
    cy.appUrlShouldBe('/')
    cy.get('.fr-header__tools').contains(firstName).contains(lastName)

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')
  })

  it('Acceptation 2 - Création de compte déjà existant', () => {
    cy.visit('/creer-un-compte')

    cy.log('Signup form fill and submit')
    cy.findByLabelText('Email').type(email)
    cy.findByLabelText('Prénom').type(firstName)
    cy.findByLabelText('Nom').type(lastName)
    cy.get('#input-form-field__policyAccepted').check({ force: true })
    cy.findByText('Valider').click()

    cy.appUrlShouldBe('/creer-un-compte')
    cy.contains('Un compte existe déjà avec cet email')
  })
})
