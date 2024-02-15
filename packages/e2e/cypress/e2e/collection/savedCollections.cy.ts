import { givenUser } from '@app/e2e/support/given/givenUser'
import { givenCollection } from '@app/e2e/support/given/givenCollection'
import {
  defaultTestBaseTitle,
  givenBase,
} from '@app/e2e/support/given/givenBase'

describe('Utilisateur connecté, je peux ajouter une ressource à une collection', () => {
  /**
   * US
   *  - https://www.notion.so/Utilisateur-lorsque-je-consulte-une-collection-je-peux-l-enregistrer-dans-Collections-enregistr-e-a50b43e5b5be44e385acfb8c1ae4a805?pvs=4
   */
  beforeEach(() => {
    cy.deleteAllData()
    cy.intercept('/api/trpc/collection.save?*').as('saveCollection')
    cy.intercept('/api/trpc/collection.unsave?*').as('unsaveCollection')
  })

  it('Acceptation 1 : ouverture de la modale d’enregistrement depuis une carte collection et impossibilité d’enregistrer sa propre collection sans base', () => {
    const user = givenUser()
    const collection = givenCollection({
      createdById: user.id,
      isPublic: true,
      title: 'Collection sur mon profil avec un titre long',
    })

    cy.createUserAndSignin(user)
    cy.createCollection(collection)

    cy.visit(`/profils/${user.slug}/collections`)
    cy.dsfrModalsShouldBeBound()

    cy.findAllByTitle(/enregistrer la collection/i)
      .first()
      .click()
    cy.findByRole('dialog').within(() => {
      cy.contains(
        'Vous pourrez enregistrer vos collections dans une base lorsque vous aurez créé ou serez membre d’une base',
      )
      cy.findByRole('button', { name: /fermer/i }).click()
    })
    cy.findByRole('dialog').should('not.exist')
  })

  it(
    'Acceptation 2 : ouverture de la modale d’enregistrement depuis une page collection et enregistrement dans le profil sans base' +
      '/ Acceptation 6 : retirer une collection enregistrée dans mon profil',
    () => {
      const creator = givenUser({
        firstName: 'Michel',
        lastName: 'Dupont',
      })
      const visitor = givenUser()
      const collection = givenCollection({
        createdById: creator.id,
        isPublic: true,
        title: 'Collection sur mon profil avec un titre long',
      })
      cy.createUser(creator)
      cy.createUserAndSignin(visitor)
      cy.createCollection(collection)

      cy.log('Visitor should see that it has no saved collections')
      cy.visit(`/profils/${visitor.slug}/collections`)
      cy.contains('Collections enregistrées · 0')
      cy.findByRole('tab', { name: /collections enregistrées/i }).click()
      cy.contains('Vous n’avez pas enregistré de collections')

      cy.log('Visitor should be able to save a collection')
      cy.visit(`/collections/${collection.slug}`)
      cy.dsfrModalsShouldBeBound()

      cy.findAllByTitle(/enregistrer la collection/i)
        .first()
        .click()
      cy.findByRole('dialog').within(() => {
        cy.contains('Jean Biche - Mes collections')
        cy.findByRole('button', { name: /enregistrer/i }).click()
        cy.wait('@saveCollection')
      })
      cy.findByRole('dialog').should('not.exist')
      cy.getToast(/enregistrée dans votre profil/i)

      cy.log('Visitor should see that it has one saved collection')
      cy.visit(`/profils/${visitor.slug}/collections`)
      cy.contains('Collections enregistrées · 1')
      cy.findByRole('tab', { name: /collections enregistrées/i }).click()
      cy.contains('Collection sur mon profil avec un titre long')

      cy.log('Visitor should be able to unsave a collection')
      cy.visit(`/collections/${collection.slug}`)
      cy.dsfrModalsShouldBeBound()
      cy.findAllByTitle(/enregistrer la collection/i)
        .first()
        .click()
      cy.findByRole('dialog').within(() => {
        cy.findByRole('button', { name: /déjà enregistrée/i }).click()
        cy.wait('@unsaveCollection')
      })
      cy.findByRole('dialog').should('not.exist')
      cy.getToast(
        /la collection a bien été retirée des collections enregistrées/i,
      )

      cy.log('Visitor should see that it has no saved collections')
      cy.visit(`/profils/${visitor.slug}/collections`)
      cy.contains('Collections enregistrées · 0')
      cy.findByRole('tab', { name: /collections enregistrées/i }).click()
      cy.contains('Vous n’avez pas enregistré de collections')
    },
  )

  it('Acceptation 3 : enregistrement d’une collection dans une base par un profil qui a créé la collection', () => {
    const creator = givenUser({
      firstName: 'Michel',
      lastName: 'Dupont',
    })
    const collection = givenCollection({
      createdById: creator.id,
      isPublic: true,
      title: 'Collection sur mon profil avec un titre long',
    })
    const base = givenBase({
      createdById: creator.id,
      isPublic: false,
    })
    cy.createUserAndSignin(creator)
    cy.createCollection(collection)
    cy.createBase(base)

    cy.log('Visitor should be able to save a collection in its base')
    cy.visit(`/collections/${collection.slug}`)
    cy.dsfrModalsShouldBeBound()

    cy.findAllByTitle(/enregistrer la collection/i)
      .first()
      .click()
    cy.findByRole('dialog').within(() => {
      cy.log('Visitor should not see his profile for a collection he created')
      cy.contains('Jean Biche - Mes collections').should('not.exist')
      cy.contains(defaultTestBaseTitle)
      cy.findByRole('button', { name: /enregistrer/i }).click()
      cy.wait('@saveCollection')
    })
    cy.findByRole('dialog').should('not.exist')
    cy.getToast(
      new RegExp(`Enregistrée dans la base ${defaultTestBaseTitle}`, 'i'),
    )

    cy.log('Visitor should not see the saved collection in his profile')
    cy.visit(`/profils/${creator.slug}/collections`)
    cy.contains('Collections enregistrées · 0')
    cy.findByRole('tab', { name: /collections enregistrées/i }).click()
    cy.contains('Vous n’avez pas enregistré de collections')

    cy.log('Visitor should see the saved collection in its base')
    cy.visit(`/bases/${base.slug}`)
    cy.contains('Collections · 1')
    cy.findByRole('link', { name: /collections/i }).click()

    cy.contains('Collections enregistrées · 1')
    cy.findByRole('tab', { name: /collections enregistrées/i }).click()

    cy.contains('Collection sur mon profil avec un titre long')
  })

  it('Acceptation 4 : enregistrement d’une collection dans une base par un profil qui n’a pas créé la collection', () => {
    const creator = givenUser()
    const visitor = givenUser({
      firstName: 'Michel',
      lastName: 'Dupont',
    })
    const collection = givenCollection({
      createdById: creator.id,
      isPublic: true,
    })
    const base = givenBase({ createdById: visitor.id, isPublic: false })

    cy.createUser(creator)
    cy.createUserAndSignin(visitor)
    cy.createCollection(collection)
    cy.createBase(base)

    cy.visit(`/collections/${collection.slug}`)
    cy.dsfrModalsShouldBeBound()

    cy.findAllByTitle(/enregistrer la collection/i)
      .first()
      .click()
    cy.findByRole('dialog').within(() => {
      cy.contains(base.title)
      cy.findAllByRole('button', { name: /enregistrer/i })
        .eq(1)
        .click()
      cy.wait('@saveCollection')
    })
    cy.findByRole('dialog').should('not.exist')
    cy.getToast(new RegExp(`Enregistrée dans la base ${base.title}`, 'i'))

    cy.visit(`/bases/${base.slug}`)
    cy.contains('Collections · 1')
    cy.findByRole('link', { name: /collections/i }).click()

    cy.contains('Collections enregistrées · 1')
    cy.findByRole('tab', { name: /collections enregistrées/i }).click()

    cy.contains(collection.title)
  })

  it('Acceptation 5 : retirer une collection enregistrée dans une base dont je suis membre', () => {
    const creator = givenUser()
    const visitor = givenUser({
      firstName: 'Michel',
      lastName: 'Dupont',
    })
    const collection = givenCollection({
      createdById: creator.id,
      isPublic: true,
    })
    const base = givenBase(
      {
        createdById: creator.id,
        isPublic: false,
        savedCollections: {
          create: {
            savedById: creator.id,
            collectionId: collection.id,
          },
        },
      },
      { acceptedMemberIds: [visitor.id] },
    )

    cy.createUser(creator)
    cy.createUserAndSignin(visitor)
    cy.createCollection(collection)
    cy.createBase(base)
    cy.visit(`/bases/${base.slug}`)
    cy.dsfrModalsShouldBeBound()

    cy.findByRole('link', { name: /collections/i }).click()
    cy.contains('Collections enregistrées · 1')
    cy.findByRole('tab', { name: /collections enregistrées/i }).click()
    cy.contains(collection.title)
    cy.findByTestId('collection-card').should('be.visible')
    cy.findByRole('button', { name: /enregistrer la collection/i })
      .filter(':visible')
      .click()

    cy.findByRole('dialog').within(() => {
      cy.findByRole('button', { name: /déjà enregistrée/i }).click()
      cy.wait('@unsaveCollection')
    })
    cy.findByRole('dialog').should('not.exist')
    cy.getToast(
      /la collection a bien été retirée des collections enregistrées/i,
    )
    cy.contains('Collections enregistrées · 0')
    cy.findByRole('tab', { name: /collections enregistrées/i }).should(
      'have.attr',
      'aria-selected',
      'true',
    )
    cy.contains(collection.title).should('not.exist')
  })
})
