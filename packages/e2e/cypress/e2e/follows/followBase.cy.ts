import { givenBase } from '@app/e2e/support/given/givenBase'
import { givenUser } from '@app/e2e/support/given/givenUser'

describe('Utilisateur connecté, je peux suivre une base', () => {
  /**
   * US
   *  - https://www.notion.so/Utilisateur-je-peux-suivre-arreter-de-suivre-une-base-ou-un-profil-depuis-une-carte-base-profil-30ca7dfb9c4041f99dc0ae8e6cebda7e?pvs=4
   */
  beforeEach(() => {
    cy.deleteAllData()
    cy.intercept('/api/trpc/follow.followBase?*').as('followBase')
    cy.intercept('/api/trpc/follow.unfollowBase?*').as('unfollowBase')
  })

  it('Acceptation 1 : je suis redirigé vers la connexion si je ne suis pas connecté', () => {
    const creator = givenUser()
    const base = givenBase({ isPublic: true, createdById: creator.id })
    cy.createUser(creator)
    cy.createBase(base)

    cy.visit(`/bases/${base.slug}`)

    cy.findByRole('link', { name: /suivre/i }).click()

    cy.appUrlShouldBe('/connexion?intention=suivre-une-base-ou-un-profil')
    cy.contains('Connectez vous pour suivre une base ou un profil')
  })

  it('Acceptation 2 : je peux suivre une base depuis la page d’une base puis ne plus la suivre', () => {
    const creator = givenUser()
    const base = givenBase({ isPublic: true, createdById: creator.id })
    const visitor = givenUser({ firstName: 'Yves', lastName: 'Visiteur' })
    cy.createUser(creator)
    cy.createBase(base)
    cy.createUserAndSignin(visitor)

    cy.visit(`/bases/${base.slug}`)

    cy.findByRole('button', { name: /suivre/i }).click()

    cy.wait('@followBase')

    cy.getToast(new RegExp(`Vous suivez la base ${base.title}`, 'i')).should(
      'exist',
    )

    cy.findByRole('button', { name: /ne plus suivre/i }).should('exist')

    cy.visit(`/profils/${visitor.slug}`)

    cy.log('Visitor should see that it has one followed base')
    cy.visit(`/profils/${visitor.slug}`)
    cy.findByRole('link', { name: /mes suivis · 1/i }).click()
    cy.contains(/1 base/i)
    cy.contains(base.title)

    cy.log('Visitor should be able to unfollow')
    cy.visit(`/bases/${base.slug}`)
    cy.findByRole('button', { name: /ne plus suivre/i }).click()
    cy.wait('@unfollowBase')
    cy.getToast(
      new RegExp(`Vous ne suivez plus la base ${base.title}`, 'i'),
    ).should('exist')
    cy.findByRole('button', { name: /suivre/i }).should('exist')

    cy.log('Visitor should see that it has no followed base')
    cy.visit(`/profils/${visitor.slug}`)
    cy.findByRole('link', { name: /mes suivis · 0/i }).click()
    cy.contains(base.title).should('not.exist')
  })

  it('Acceptation 3 : je peux suivre une base depuis la carte d’une base puis ne plus la suivre', () => {
    const creator = givenUser()
    const base = givenBase({ isPublic: true, createdById: creator.id })
    const visitor = givenUser({ firstName: 'Yves', lastName: 'Visiteur' })
    cy.createUser(creator)
    cy.createBase(base)
    cy.createUserAndSignin(visitor)

    cy.visit(`/rechercher/tout/bases`)

    cy.findByRole('button', { name: /suivre/i }).click()

    cy.wait('@followBase')

    cy.getToast(new RegExp(`Vous suivez la base ${base.title}`, 'i')).should(
      'exist',
    )

    cy.findByRole('button', { name: /ne plus suivre/i }).should('exist')

    cy.visit(`/profils/${visitor.slug}`)

    cy.log('Visitor should see that it has one followed base')
    cy.visit(`/profils/${visitor.slug}`)
    cy.findByRole('link', { name: /mes suivis · 1/i }).click()
    cy.contains(/1 base/i)
    cy.contains(base.title)

    cy.log('Visitor should be able to unfollow')
    cy.visit(`/rechercher/tout/bases`)
    cy.findByRole('button', { name: /ne plus suivre/i }).click()
    cy.wait('@unfollowBase')
    cy.getToast(
      new RegExp(`Vous ne suivez plus la base ${base.title}`, 'i'),
    ).should('exist')
    cy.findByRole('button', { name: /suivre/i }).should('exist')

    cy.log('Visitor should see that it has no followed base')
    cy.visit(`/profils/${visitor.slug}`)
    cy.findByRole('link', { name: /mes suivis · 0/i }).click()
    cy.contains(base.title).should('not.exist')
  })
})
