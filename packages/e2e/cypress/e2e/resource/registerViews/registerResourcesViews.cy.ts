import { givenUser } from '@app/e2e/support/given/givenUser'
import { cleanUpAndCreateTestPublishedResource } from '../edition/editionTestUtils'

let interceptCounter = 0
const interceptRegisterView = () => {
  interceptCounter += 1
  const alias = `registerView${interceptCounter}`
  cy.intercept('/ressources/*/register-view').as(alias)
  return `@${alias}`
}

describe("Les visites d'une ressource sont comptées", () => {
  beforeEach(() => {
    cy.intercept('/ressources/*/register-view').as('registerView')
  })

  it('Acceptation 1 - Visiteur non connecté', () => {
    Cypress.Cookies.debug(true)

    const register0 = interceptRegisterView()
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      visitResourcePage: true,
    })
    cy.log('Je peux voir la ressource')
    // Visit counts for non connected users
    cy.testId('resource-views-count').should('contain.text', '0')
    cy.getCookie('visit-hash').should('exist')
    cy.wait(register0)

    // Visit only counted once
    const register1 = interceptRegisterView()
    cy.reload()
    cy.testId('resource-views-count').should('contain.text', '1')
    cy.getCookie('visit-hash').should('exist')
    cy.wait(register1)

    const register2 = interceptRegisterView()
    cy.reload()
    cy.testId('resource-views-count').should('contain.text', '1')
    cy.getCookie('visit-hash').should('exist')
    cy.wait(register2)
  })

  it('Acceptation 2 - Utilisateur connecté sur une ressource publique', () => {
    Cypress.Cookies.debug(true)

    const register0 = interceptRegisterView()
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      visitResourcePage: true,
    })

    const user = givenUser()
    cy.createUserAndSignin(user)

    cy.log('Je peux voir la ressource')
    // Visit counts for non connected users
    cy.testId('resource-views-count').should('contain.text', '0')
    cy.getCookie('visit-hash').should('exist')
    cy.wait(register0)

    // Visit only counted once
    const register1 = interceptRegisterView()
    cy.reload()
    cy.testId('resource-views-count').should('contain.text', '1')
    cy.getCookie('visit-hash').should('exist')
    cy.wait(register1)

    const register2 = interceptRegisterView()
    cy.reload()
    cy.testId('resource-views-count').should('contain.text', '1')
    cy.getCookie('visit-hash').should('exist')
    cy.wait(register2)
  })
})
