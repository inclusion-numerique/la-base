import { v4 } from 'uuid'
import { createSlug } from '@app/web/utils/createSlug'
import { appUrl, createTestUser } from '../../support/helpers'

describe('Utilisateur connecté, lorsque je créé une ressource, je peux renseigner le titre, description', () => {
  /**
   * US
   *  - https://www.notion.so/Utilisateur-connect-lorsque-je-cr-une-ressource-je-peux-renseigner-le-titre-description-39d1666ec8344cc98369eb63e76dfbc1?pvs=4
   *  - https://www.notion.so/Utilisateur-connect-qui-cr-une-ressource-lorsque-j-ai-renseign-titre-description-je-peux-la-ra-d1439df643b948aea8c6653a9762705d?pvs=4
   * Parcours
   *  - https://www.figma.com/proto/Rk4NNQVYRBE0bJZ6i5mrfU/La-Base---V.2?node-id=617-99265&scaling=min-zoom&page-id=566%3A89449&starting-point-node-id=617%3A99265
   */

  beforeEach(() => {
    cy.execute('deleteAllData', undefined)
  })

  it('Acceptation 0 - Fermeture modale', () => {
    cy.createUserAndSignin(createTestUser())
    cy.visit('/')
    cy.get('header').contains('Créer une ressource').click()
    cy.log('Can close with close button')
    cy.findByRole('dialog').as('modal')
    cy.get('@modal')
      .should('be.visible')
      .contains('Créer une nouvelle ressource')
    cy.get('@modal').find('button').contains('Fermer').click()
    cy.url().should('equal', appUrl('/'))

    cy.log('Can close with cancel button')
    cy.visit('/creer-une-ressource')
    cy.log('Can close with close button')
    cy.findByRole('dialog').as('modal')
    cy.get('@modal')
      .should('be.visible')
      .contains('Créer une nouvelle ressource')
    cy.get('@modal').find('button').contains('Annuler').click()
    cy.url().should('equal', appUrl('/'))
    cy.get('@modal').should('not.exist')
  })

  it('Acceptation 1 - Utilisateur membre d’aucune base avec profil public', () => {
    const titre = `Test - ${v4()}`
    cy.createUserAndSignin({ ...createTestUser(), isPublic: true })
    cy.visit('/creer-une-ressource')
    cy.findByRole('dialog').as('modal')
    cy.get('@modal').contains('Créer une nouvelle ressource')
    cy.get('@modal')
      .findByLabelText(/^Titre/)
      .type(titre)
    cy.get('@modal')
      .findByLabelText(/^Description/)
      .type('Une description')
    cy.get('@modal').find('button').contains('Commencer').click()
    cy.url().should('equal', appUrl(`/ressources/${createSlug(titre)}/editer`))
    cy.contains(titre)
    cy.get('@modal').should('not.exist')
  })

  it('Acceptation 2 - Utilisateur membre d’aucune base avec profil privé', () => {
    const titre = `Test - ${v4()}`
    cy.createUserAndSignin({ ...createTestUser(), isPublic: false })
    cy.visit('/creer-une-ressource')
    cy.findByRole('dialog').as('modal')
    cy.get('@modal').contains('Créer une nouvelle ressource')
    cy.get('@modal')
      .findByLabelText(/^Titre/)
      .type(titre)
    cy.get('@modal')
      .findByLabelText(/^Description/)
      .type('Une description')
    cy.get('@modal').find('button').contains('Commencer').click()
    cy.url().should('equal', appUrl(`/ressources/${createSlug(titre)}/editer`))
    cy.contains(titre)
    cy.get('@modal').should('not.exist')
  })

  it('Acceptation 3 - Utilisateur membre d’une base publique et d’une base privée', () => {
    const titre = `Test - ${v4()}`
    const base1Title = `Test - ${v4()}`
    const base2Title = `Test - ${v4()}`
    cy.createUserAndSignin({
      ...createTestUser(),
      isPublic: false,
      ownedBases: {
        createMany: {
          data: [
            {
              id: v4(),
              title: base1Title,
              slug: createSlug(base1Title),
              titleDuplicationCheckSlug: createSlug(base1Title),
              isPublic: true,
            },
            {
              id: v4(),
              title: base2Title,
              slug: createSlug(base2Title),
              titleDuplicationCheckSlug: createSlug(base2Title),
              isPublic: false,
            },
          ],
        },
      },
    })
    cy.visit('/creer-une-ressource')
    cy.findByRole('dialog').as('modal')
    cy.get('@modal').contains('Créer une nouvelle ressource')
    cy.get('@modal')
      .findByLabelText(/^Titre/)
      .type(titre)
    cy.get('@modal')
      .findByLabelText(/^Description/)
      .type('Une description')
    cy.get('@modal').find('button').contains('Continuer').click()
    cy.get('@modal').contains('ajouter cette ressource')
    cy.get('@modal').find('label').first().contains('mon profil')
    cy.get('@modal').find('label').first().contains('Profil privé')

    cy.get('@modal').find('label').eq(1).contains(base1Title)
    cy.get('@modal').find('label').eq(1).contains('Base publique')

    cy.get('@modal').find('label').eq(2).contains(base2Title)
    cy.get('@modal').find('label').eq(2).contains('Base privée')
    cy.get('@modal').find('label').eq(2).click()

    cy.get('@modal').find('button').contains('Commencer').click()

    cy.url().should('equal', appUrl(`/ressources/${createSlug(titre)}/editer`))
    cy.contains(titre)
    cy.get('@modal').should('not.exist')
  })
})
