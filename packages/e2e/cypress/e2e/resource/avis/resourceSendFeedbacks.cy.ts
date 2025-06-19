import { givenUser } from '@app/e2e/support/given/givenUser'
import { appUrl } from '@app/e2e/support/helpers'
import { cleanUpAndCreateTestPublishedResource } from '../edition/editionTestUtils'

describe("Ajout d'un avis sur une ressource", () => {
  it('Acceptation 1 - Utilisateur non connecté, je suis redirigé vers la connexion au clic sur un smiley', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
    )

    cy.contains('Oui').click()

    cy.url().should(
      'contain',
      appUrl(
        '/connexion?suivant=/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avi',
      ),
    )
  })

  it('Acceptation 2 - Utilisateur non connecté, je suis redirigé vers la connexion au clic sur la zone de texte', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
    )

    cy.get('textarea').first().click()

    cy.url().should(
      'contain',
      appUrl(
        '/connexion?suivant=/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avi',
      ),
    )
  })

  it('Acceptation 3 - Utilisateur connecté, j’obtiens un message d’erreur lorsque j’essaie de publier l’avis sans compléter le niveau de satisfaction', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
    })

    const user = givenUser({ firstName: 'Pierre', lastName: 'Laubet' })
    cy.createUserAndSignin(user)

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
    )

    cy.contains('Partager mon avis').click()

    cy.get('.fr-message.fr-message--error').contains(
      'Veuillez renseigner le niveau de satisfaction',
    )
  })

  it('Acceptation 4 - Utilisateur connecté, lorsque je complète le formulaire et que je clique sur annuler le formulaire est vide', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
    })

    const user = givenUser({ firstName: 'Pierre', lastName: 'Laubet' })
    cy.createUserAndSignin(user)

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
    )

    cy.contains('Oui').click()
    cy.get('textarea').first().type('hello')

    cy.contains('Annuler').click()

    cy.get('textarea').should('have.value', '')
  })

  it('Acceptation 5 - Utilisateur connecté, lorsque je complète le formulaire et que je le valide je vois mon avis dans la liste', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
    })

    const user = givenUser({ firstName: 'Pierre', lastName: 'Laubet' })
    cy.createUserAndSignin(user)

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
    )

    cy.contains('Oui').click()
    cy.get('textarea').first().type('hello')

    cy.contains('Partager mon avis').click()

    cy.get('article').contains('Pierre Laubet')
    cy.get('article').contains('Recommandée')
    cy.get('article').contains('hello')
    cy.getToast('Avis partagé')
  })

  it("Acceptation 6 - Utilisateur connecté, je peux modifié l'avis que j'ai partagé", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
    })

    const user = givenUser({ firstName: 'Pierre', lastName: 'Laubet' })
    cy.createUserAndSignin(user)

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
    )

    cy.contains('Oui').click()
    cy.get('textarea').first().type('hello')
    cy.contains('Partager mon avis').click()

    cy.testId('update-feedback').filter(':visible').first().click()
    cy.get('textarea').first().type(' world')
    cy.contains('Partager mon avis').click()

    cy.get('article').contains('Pierre Laubet')
    cy.get('article').contains('Recommandée')
    cy.get('article').contains('hello world')
    cy.getToast('Avis mis à jour')
  })

  it("Acceptation 7 - Utilisateur connecté, je peux supprimer l'avis que j'ai partagé", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
    })

    const user = givenUser({ firstName: 'Pierre', lastName: 'Laubet' })
    cy.createUserAndSignin(user)

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
    )

    cy.contains('Oui').click()
    cy.get('textarea').first().type('hello')
    cy.contains('Partager mon avis').click()

    cy.testId('delete-feedback').filter(':visible').first().click()
    cy.get('dialog').get('button').contains('Supprimer').click()

    cy.getToast('Avis supprimé')
  })
})
