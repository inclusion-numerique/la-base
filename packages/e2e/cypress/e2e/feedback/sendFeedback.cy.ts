import { goToMostRecentEmailReceived } from '@app/e2e/e2e/goToMostRecentEmailReceived'

describe('Utilisateur, je peux donner mon avis', () => {
  /**
   * US
   *  - https://www.notion.so/incubateurdesterritoires/Ajouter-Je-donne-mon-avis-pour-loop-de-feedback-2b26461eef39449bb3b308e0d774b294?pvs=4
   */

  beforeEach(() => {
    cy.execute('deleteAllData', {})
    cy.intercept('/api/trpc/feedback.send?*').as('sendFeedback')
  })

  it('Acceptation 1 - Je peux donner mon avis', () => {
    cy.visit('/')
    cy.dsfrModalsShouldBeBound()

    cy.get('#header-feedback-control-button').should('be.visible').click()

    cy.findByRole('dialog').within(() => {
      cy.findByRole('button', { name: '9' }).click()
      // Click on first radio button
      cy.findByLabelText('Avez-vous rencontré des difficultés ? *')
        .find('label')
        .last()
        .click()

      cy.findByLabelText(/souhaitez-vous nous en dire davantage ?/i).type(
        'd’avantage',
      )

      cy.findByLabelText(/adresse email de contact */i).type('test@test.com')

      cy.findByRole('button', { name: /envoyer/i }).click()
    })

    cy.wait('@sendFeedback')

    cy.findByRole('dialog').should('not.exist')
    cy.findByRole('status').contains(/questionnaire de satisfaction envoyé/i)

    goToMostRecentEmailReceived({
      subjectInclude: 'Questionnaire de satisfaction',
    })

    cy.contains('Commentaire général : d’avantage')
  })
})
