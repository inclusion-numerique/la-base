import { givenUser } from '@app/e2e/support/given/givenUser'

describe('ETQ Utilisateur non connecté, lorsque je veux créer une ressource, on me redirige vers la page de connexion', () => {
  /**
   * US
   *  - https://www.notion.so/ETQ-Utilisateur-non-connect-lorsque-je-veux-cr-er-une-ressource-on-me-redirige-vers-la-page-de-co-f5f8174e9539454b90d32e80f839c99d?pvs=4
   *  - https://www.notion.so/ETQ-Utilisateur-non-connect-lorsque-je-me-connecte-apr-s-avoir-cliqu-sur-Cr-er-une-ressource-j-c231958422cf4807b6bb531a934014bf?pvs=4
   * Parcours
   *  - https://www.figma.com/file/4wfmwOaKRnMhgiGEF256qS/La-Base---Parcours-utilisateurs?node-id=38%3A1138&t=mLwaw4Kkwt7FG9lz-1
   *  - https://www.figma.com/file/4wfmwOaKRnMhgiGEF256qS/La-Base---Parcours-utilisateurs?node-id=38%3A998&t=mLwaw4Kkwt7FG9lz-1
   */

  it('Acceptation 0 - Redirection vers connexion', () => {
    cy.visit('/')

    // Ignoring NEXT_REDIRECT error
    Cypress.on('uncaught:exception', () => false)
    cy.get('.fr-header__tools').contains('Créer une ressource').click()

    cy.appUrlShouldBe('/connexion?suivant=/?creer-une-ressource')
  })

  it('Acceptation 1-4 - Redirection vers modale ouverte après connexion', () => {
    cy.createUserAndSignin(givenUser())

    // Ignoring NEXT_REDIRECT error
    Cypress.on('uncaught:exception', () => false)

    cy.visit('/connexion?suivant=/?creer-une-ressource')

    cy.appUrlShouldBe('/?creer-une-ressource')
    cy.get('#create-resource').should('have.attr', 'open')
    cy.get('#create-resource').contains('Créer une nouvelle ressource')
  })
})
