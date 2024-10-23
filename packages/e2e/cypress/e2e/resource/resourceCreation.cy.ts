import { v4 } from 'uuid'
import { createSlug } from '@app/web/utils/createSlug'
import { givenUser } from '@app/e2e/support/given/givenUser'
import {
  cleanUpAndCreateTestBaseAsMember,
  createTestBaseAsMember,
} from '@app/e2e/e2e/resource/edition/editionTestUtils'

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
    cy.findByRole('dialog').as('modal')
    cy.get('@modal')
      .should('be.visible')
      .contains('Créer une nouvelle ressource')
    cy.get('@modal').find('button').contains('Fermer').click()
    cy.appUrlShouldBe('/')

    cy.log('Can close with cancel button')
    cy.visit('/?creer-une-ressource')
    cy.log('Can close with close button')
    cy.findByRole('dialog').as('modal')
    cy.get('@modal')
      .should('be.visible')
      .contains('Créer une nouvelle ressource')
    cy.get('@modal').find('button').contains('Annuler').click()
    cy.appUrlShouldBe('/?creer-une-ressource')
    cy.get('@modal').should('not.exist')
  })

  it('Acceptation 1 - Utilisateur membre d’aucune base avec profil public', () => {
    const titre = `Test - ${v4()}`
    cy.createUserAndSignin({ ...givenUser(), isPublic: true })
    cy.visit('/?creer-une-ressource')
    cy.findByRole('dialog').as('modal')
    cy.get('@modal').contains('Créer une nouvelle ressource')
    cy.get('@modal')
      .findByLabelText(/^Titre/)
      .type(titre)
    cy.get('@modal')
      .findByLabelText(/^Description/)
      .type('Une description')
    cy.get('@modal').find('button').contains('Continuer').click()
    cy.get('@modal').contains('profil')
    cy.get('@modal').find('button').contains('compris').click()
    cy.appUrlShouldBe(`/ressources/${createSlug(titre)}/editer`)
    cy.contains(titre)
    cy.get('@modal').should('not.exist')
  })

  it('Acceptation 2 - Utilisateur membre d’aucune base avec profil privé', () => {
    const titre = `Test - ${v4()}`
    cy.createUserAndSignin(givenUser({ isPublic: false }))
    cy.visit('/?creer-une-ressource')
    cy.findByRole('dialog').as('modal')
    cy.get('@modal').contains('Créer une nouvelle ressource')
    cy.get('@modal')
      .findByLabelText(/^Titre/)
      .type(titre)
    cy.get('@modal')
      .findByLabelText(/^Description/)
      .type('Une description')
    cy.get('@modal').find('button').contains('Continuer').click()
    cy.get('@modal').contains('profil')
    cy.get('@modal').find('button').contains('compris').click()
    cy.appUrlShouldBe(`/ressources/${createSlug(titre)}/editer`)
    cy.contains(titre)
    cy.get('@modal').should('not.exist')
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

    cy.get('@modal').find('label').eq(1).contains(publicBase.title)
    cy.get('@modal').find('label').eq(1).contains('Base publique')

    cy.get('@modal').find('label').eq(2).contains(privateBase.title)
    cy.get('@modal').find('label').eq(2).contains('Base privée')
    cy.get('@modal').find('label').eq(2).click()

    cy.get('@modal').find('button').contains('Commencer').click()

    cy.appUrlShouldBe(`/ressources/${createSlug(titre)}/editer`)
    cy.contains(titre)
    cy.contains(privateBase.title)
    cy.get('@modal').should('not.exist')
  })

  it('Acceptation 4 - Si je créé une ressource depuis une page de base dont je suis membre, elle est créée dans la base par défault', () => {
    const title = 'Titre de ressource'
    const { base } = cleanUpAndCreateTestBaseAsMember(false)
    cy.dsfrModalsShouldBeBound()

    cy.testId('create-resource-in-base-button').click()
    cy.findByRole('dialog').as('modal')
    cy.get('@modal').contains('Créer une nouvelle ressource')
    cy.get('@modal')
      .findByLabelText(/^Titre/)
      .type(title)
    cy.get('@modal')
      .findByLabelText(/^Description/)
      .type('Une description')
    cy.get('@modal').find('button').contains('Continuer').click()
    cy.get('@modal').contains('ajouter cette ressource')
    cy.get('@modal').find('label').first().contains('mon profil')
    cy.get('@modal').find('label').first().contains('Profil privé')

    cy.get('@modal').find('label').eq(1).contains(base.title)

    cy.get('@modal').find('button').contains('Commencer').click()

    cy.appUrlShouldBe(`/ressources/${createSlug(title)}/editer`)

    cy.getToast(/bien été créée/i)

    cy.get('@modal').should('not.exist')
    cy.contains(title)
    cy.contains(`Créée dans la base ${base.title}`)
  })
})
