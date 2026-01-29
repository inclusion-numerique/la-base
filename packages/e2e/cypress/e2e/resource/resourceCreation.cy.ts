import {
  cleanUpAndCreateTestBaseAsMember,
  createTestBaseAsMember,
} from '@app/e2e/e2e/resource/edition/editionTestUtils'
import { givenUser } from '@app/e2e/support/given/givenUser'
import { createSlug } from '@app/web/utils/createSlug'
import { v4 } from 'uuid'

describe('Utilisateur connecté, lorsque je créé une ressource, je peux renseigner le titre, description', () => {
  /**
   * US
   *  - https://www.notion.so/Utilisateur-connect-lorsque-je-cr-une-ressource-je-peux-renseigner-le-titre-description-39d1666ec8344cc98369eb63e76dfbc1?pvs=4
   *  - https://www.notion.so/Utilisateur-connect-qui-cr-une-ressource-lorsque-j-ai-renseign-titre-description-je-peux-la-ra-d1439df643b948aea8c6653a9762705d?pvs=4
   * Parcours
   *  - https://www.figma.com/proto/Rk4NNQVYRBE0bJZ6i5mrfU/La-Base---V.2?node-id=617-99265&scaling=min-zoom&page-id=566%3A89449&starting-point-node-id=617%3A99265
   */

  beforeEach(() => {
    cy.execute('deleteAllData', {})
  })

  it('Acceptation 0 - Fermeture modale', () => {
    cy.createUserAndSignin(givenUser())
    cy.visit('/')
    cy.dsfrShouldBeStarted()
    cy.get('header').contains('Créer une ressource').click()
    cy.log('Can close with close button')
    cy.get('#create-resource').should('have.attr', 'open')
    cy.get('#create-resource').contains('Créer une nouvelle ressource')
    cy.get('#create-resource').find('button').contains('Fermer').click()
    cy.appUrlShouldBe('/')

    cy.log('Can close with cancel button')
    cy.visit('/?creer-une-ressource')
    cy.log('Can close with close button')
    cy.get('#create-resource').should('have.attr', 'open')
    cy.get('#create-resource').contains('Créer une nouvelle ressource')
    cy.get('#create-resource').find('button').contains('Annuler').click()
    cy.appUrlShouldBe('/?creer-une-ressource')
    cy.get('#create-resource').should('not.have.attr', 'open')
  })

  it('Acceptation 1 - Utilisateur membre d’aucune base avec profil public', () => {
    const titre = `Test - ${v4()}`
    cy.createUserAndSignin({ ...givenUser(), isPublic: true })
    cy.visit('/?creer-une-ressource')
    cy.get('#create-resource').should('have.attr', 'open')
    cy.get('#create-resource').contains('Créer une nouvelle ressource')
    cy.get('#create-resource')
      .findByLabelText(/^Titre/)
      .type(titre)
    cy.get('#create-resource')
      .findByLabelText(/^Description/)
      .type('Une description')
    cy.get('#create-resource').find('button').contains('Continuer').click()
    cy.get('#create-resource').contains('profil')
    cy.get('#create-resource').find('button').contains('compris').click()
    cy.appUrlShouldBe(`/ressources/${createSlug(titre)}/editer`)
    cy.contains(titre)
    cy.get('#create-resource').should('not.have.attr', 'open')
  })

  it("Acceptation 2 - Utilisateur membre d'aucune base avec profil privé", () => {
    const titre = `Test - ${v4()}`
    cy.createUserAndSignin(givenUser({ isPublic: false }))
    cy.visit('/?creer-une-ressource')
    cy.get('#create-resource').should('have.attr', 'open')
    cy.get('#create-resource').contains('Créer une nouvelle ressource')
    cy.get('#create-resource')
      .findByLabelText(/^Titre/)
      .type(titre)
    cy.get('#create-resource')
      .findByLabelText(/^Description/)
      .type('Une description')
    cy.get('#create-resource').find('button').contains('Continuer').click()
    cy.get('#create-resource').contains('profil')
    cy.get('#create-resource').find('button').contains('compris').click()
    cy.appUrlShouldBe(`/ressources/${createSlug(titre)}/editer`)
    cy.contains(titre)
    cy.get('#create-resource').should('not.have.attr', 'open')
  })

  it('Acceptation 3 - Utilisateur membre d’une base publique et d’une base privée, ajoute une ressource à une base privée', () => {
    const user = givenUser({
      isPublic: false,
    })

    cy.createUserAndSignin(user)

    const { base: publicBase } = createTestBaseAsMember(
      user,
      true,
      `Test - A ${v4()}`,
    )
    const { base: privateBase } = createTestBaseAsMember(
      user,
      false,
      `Test - B ${v4()}`,
    )

    const titre = `Test - ${v4()}`

    cy.visit('/?creer-une-ressource')
    cy.get('#create-resource').should('have.attr', 'open')
    cy.get('#create-resource').contains('Créer une nouvelle ressource')
    cy.get('#create-resource')
      .findByLabelText(/^Titre/)
      .type(titre)
    cy.get('#create-resource')
      .findByLabelText(/^Description/)
      .type('Une description')
    cy.get('#create-resource').find('button').contains('Continuer').click()
    cy.get('#create-resource').contains('ajouter cette ressource')
    cy.get('#create-resource').find('label').first().contains('mon profil')
    cy.get('#create-resource').find('label').first().contains('Profil privé')

    cy.get('#create-resource').find('label').eq(1).contains(publicBase.title)
    cy.get('#create-resource').find('label').eq(1).contains('Base publique')

    cy.get('#create-resource').find('label').eq(2).contains(privateBase.title)
    cy.get('#create-resource').find('label').eq(2).contains('Base privée')
    cy.get('#create-resource').find('label').eq(2).click()

    cy.get('#create-resource').find('button').contains('Commencer').click()

    cy.appUrlShouldBe(`/ressources/${createSlug(titre)}/editer`)
    cy.contains(titre)
    cy.contains(privateBase.title)
    cy.get('#create-resource').should('not.have.attr', 'open')
  })

  it('Acceptation 4 - Si je créé une ressource depuis une page de base dont je suis membre, elle est créée dans la base par défault', () => {
    const title = 'Titre de ressource'
    const { base } = cleanUpAndCreateTestBaseAsMember(false)
    cy.dsfrModalsShouldBeBound()

    cy.visit(`/bases/${base.slug}/ressources`)
    cy.testId('create-resource-in-base-button').eq(0).click()
    cy.get('#create-resource').should('have.attr', 'open')
    cy.get('#create-resource').contains('Créer une nouvelle ressource')
    cy.get('#create-resource')
      .findByLabelText(/^Titre/)
      .type(title)
    cy.get('#create-resource')
      .findByLabelText(/^Description/)
      .type('Une description')
    cy.get('#create-resource')
      .find('button')
      .contains('Commencer l’édition')
      .click()

    cy.appUrlShouldBe(`/ressources/${createSlug(title)}/editer`)

    cy.getToast(/bien été créée/i)

    cy.get('#create-resource').should('not.have.attr', 'open')
    cy.contains(title)
    cy.contains(`Créée dans la base ${base.title}`)
  })
})
