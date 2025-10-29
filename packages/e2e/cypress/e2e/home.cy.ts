import { givenUser } from '@app/e2e/support/given/givenUser'

describe('Page d’accueil', () => {
  it('La page d’accueil s’affiche correctement, avec les styles du DSFR', () => {
    cy.visit('/')
    cy.dsfrStylesShouldBeLoaded()
    cy.get('.fr-header__brand a').should(
      'contain',
      'Les Bases du numérique d’intérêt général',
    )
    cy.get('.fr-header__tools .fr-btn')
      .should('contain', 'Rechercher')
      .should('have.css', 'color', 'rgb(0, 0, 145)')
    cy.get('.fr-header__tools').contains('Se connecter')
  })

  it('Les overrides DSFR de app.css sont visibles', () => {
    cy.visit('/')
    cy.dsfrStylesShouldBeLoaded()
    cy.get('.fr-header').should('have.css', 'filter', 'none')
  })

  it("La page d'accueil affiche le statut de connexion de l'utilisateur", () => {
    const user = givenUser()

    cy.createUserAndSignin(user)
    cy.visit('/')
    cy.dsfrStylesShouldBeLoaded()
    cy.get('.fr-header__tools')
      .filter(':visible')
      .should('not.contain', 'Se connecter')
    cy.dsfrShouldBeStarted()
    cy.get('.fr-header__tools button[aria-controls="header_user_menu"]')
      .filter(':visible')
      .contains(user.name)
      .click()
    cy.get('.fr-dropdown__pane').contains('Se déconnecter')
  })

  it('Un utilisateur avec un token invalide peut accéder au site', () => {
    const user = givenUser()

    cy.createUserAndSignin(user).then((sessionToken) => {
      cy.execute('deleteSession', sessionToken)
    })
    cy.visit('/')
    cy.dsfrStylesShouldBeLoaded()
    cy.get('.fr-header__tools').contains('Se connecter')
  })
})
