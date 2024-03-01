import { v4 } from 'uuid'
import {
  createTestPublishResourceCommand,
  createTestResourceCommands,
} from '@app/e2e/support/given/givenResourceCommands'
import { defaultTestBaseSlug } from '@app/e2e/support/given/givenBase'
import {
  cleanUpAndCreateTestBase,
  cleanUpAndCreateTestPublishedResource,
} from '../resource/edition/editionTestUtils'

describe('Utilisateur connecté, je peux modifier ma base', () => {
  /**
   * US
   *  - https://www.notion.so/Board-edd4e7b2a95a4f2facd39c78a1e3a32f?p=ecb4e3fda4e44f66a1ff64e88a54174b&pm=s
   */
  beforeEach(() => {
    cy.intercept('/api/trpc/base.mutate?*').as('mutation')
  })

  describe('Modification des informations', () => {
    beforeEach(() => {
      cleanUpAndCreateTestBase()
      cy.visit(`/bases/${defaultTestBaseSlug}/editer`)

      cy.dsfrShouldBeStarted()
    })

    it('Acceptation 1 - Modification des informations', () => {
      cy.testId('edit-card-button').eq(0).click()

      cy.testId('base-title-input').clear()
      cy.testId('base-title-input').type('La quete')
      cy.testId('base-department-select').select('93')
      cy.testId('base-description-input').clear()
      cy.testId('base-description-input').type(
        "Ce qui compte c'est pas l'arrivée c'est la quete",
      )

      cy.testId('edit-card-save-button').click()
      cy.wait('@mutation')

      cy.testId('base-information-title').should('have.text', 'La quete')
      cy.testId('base-information-department').should(
        'have.text',
        'Seine-Saint-Denis (93)',
      )
      cy.testId('base-information-description').should(
        'have.text',
        "Ce qui compte c'est pas l'arrivée c'est la quete",
      )
    })

    it('Acceptation 2 - Modification des informations avec erreurs', () => {
      cy.testId('edit-card-button').eq(0).click()

      cy.testId('base-title-input').clear()

      cy.testId('edit-card-save-button').click()
      cy.get('[id=input-form-field__title__error]').should(
        'have.text',
        'Veuillez renseigner le nom de la base',
      )
    })

    it('Acceptation 3 - Modification des contacts', () => {
      cy.testId('edit-card-button').eq(1).click()

      cy.testId('base-email-input').clear()
      cy.testId('base-email-input').type('orel@s.an')
      cy.testId('base-website-input').type('https://website.fr')
      cy.testId('base-linkedin-input').type('https://linkedin.fr')
      cy.testId('base-twitter-input').type('https://twitter.fr')
      cy.testId('base-facebook-input').type('https://facebook.fr')

      cy.testId('edit-card-save-button').click()
      cy.wait('@mutation')

      cy.testId('base-contacts-email').should('have.text', 'orel@s.an')
      cy.testId('base-contacts-website').should(
        'have.text',
        'https://website.fr',
      )
      cy.testId('base-contacts-linkedin').should(
        'have.text',
        'https://linkedin.fr',
      )
      cy.testId('base-contacts-twitter').should(
        'have.text',
        'https://twitter.fr',
      )
      cy.testId('base-contacts-facebook').should(
        'have.text',
        'https://facebook.fr',
      )
    })

    it('Acceptation 4 - Modification des contacts avec erreurs', () => {
      cy.testId('edit-card-button').eq(1).click()

      cy.testId('base-email-input').clear()

      cy.testId('edit-card-save-button').click()
      cy.get('[id=input-form-field__email__error]').should(
        'have.text',
        'Veuillez entrer une adresse e-mail valide',
      )
    })
  })

  describe('Modification de la visibilité', () => {
    it('Acceptation 5 - Modification de la visibilité', () => {
      cleanUpAndCreateTestPublishedResource({
        signinAsResourceCreator: true,
        publicBase: true,
        additionalSetup: ({ base, user }) => {
          const id = v4()
          const commands = createTestResourceCommands({
            baseId: base.id,
            resourceId: id,
          })
          commands.push(createTestPublishResourceCommand(id, false))
          cy.sendResourceCommands({ user, commands })
        },
      })

      cy.visit(`/bases/${defaultTestBaseSlug}/editer`)

      cy.dsfrShouldBeStarted()
      cy.testId('visibility').should(
        'have.text',
        'Tout le monde peut vous suivre et visiter votre base pour y retrouver les contenus publics.',
      )

      cy.testId('edit-card-button').eq(2).click()

      cy.testId('visibility-radio-base-private').click({ force: true })
      cy.testId('edit-card-save-button').click()
      cy.wait('@mutation')

      cy.testId('visibility').should(
        'have.text',
        'Les contenus & informations de votre base sont masqués aux visiteurs.',
      )
    })

    it('Acceptation 6 - Modification de la visibilité avec ressource publique', () => {
      cleanUpAndCreateTestPublishedResource({
        signinAsResourceCreator: true,
        publicBase: true,
        publicResource: true,
        visitResourcePage: true,
        additionalSetup: ({ base, user }) => {
          const id = v4()
          const commands = createTestResourceCommands({
            baseId: base.id,
            resourceId: id,
          })
          commands.push(createTestPublishResourceCommand(id, false))
          cy.sendResourceCommands({ user, commands })
        },
      })
      cy.testId('resource-public-state-badge').should(
        'have.text',
        'Ressource publique',
      )

      cy.visit(`/bases/${defaultTestBaseSlug}/editer`)

      cy.dsfrShouldBeStarted()

      cy.testId('visibility').should(
        'have.text',
        'Tout le monde peut vous suivre et visiter votre base pour y retrouver les contenus publics.',
      )

      cy.testId('edit-card-button').eq(2).click()

      cy.testId('visibility-radio-base-private').click({ force: true })
      cy.testId('edit-card-save-button').click()

      cy.testId('visibility-modal-continue-button').click()
      cy.wait('@mutation')

      cy.testId('visibility').should(
        'have.text',
        'Tout le monde peut vous suivre et visiter votre base pour y retrouver les contenus publics.',
      )

      cy.visit(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
      )
      cy.testId('resource-public-state-badge').should(
        'have.text',
        'Ressource privée',
      )
    })
  })
})
