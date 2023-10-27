import { v4 } from 'uuid'
import type {
  CreateBaseInput,
  CreateUserInput,
} from '@app/e2e/e2e/authentication/user.tasks'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  createTestBase,
  createTestCollection,
  createTestPublishResourceCommand,
  createTestResourceCommands,
  createTestUser,
} from '../../../support/helpers'

export const cleanUpAndCreateTestResource = (
  publicBase?: boolean,
  additionalSetup?: () => void,
) => {
  cy.execute('deleteAllData', {})
  const user = createTestUser()
  const base = createTestBase(user.id, publicBase)
  const commands = createTestResourceCommands({
    baseId: base.id,
  })

  cy.createUserAndSignin(user)
  cy.createBase(base)
  cy.sendResourceCommands({ user, commands }).then(({ slug }) => {
    additionalSetup?.()
    cy.visit(`/ressources/${slug}/editer`)
  })

  cy.intercept('/api/trpc/resource.mutate?*').as('mutation')
  cy.dsfrShouldBeStarted()
}

export const cleanUpAndCreateTestPublishedResource = (
  publicBase?: boolean,
  publicResource?: boolean,
  additionalSetup?: ({
    user,
    base,
  }: {
    user: Pick<SessionUser, 'id'>
    base: CreateBaseInput
  }) => void,
) => {
  cy.execute('deleteAllData', {})
  const user = createTestUser()
  const base = createTestBase(user.id, publicBase)
  const id = v4()
  const commands = createTestResourceCommands({
    baseId: base.id,
    resourceId: id,
  })
  commands.push(createTestPublishResourceCommand(id, publicResource))

  cy.createUserAndSignin(user)
  cy.createBase(base)
  cy.sendResourceCommands({ user, commands }).then(({ slug }) => {
    additionalSetup?.({ user, base })
    cy.visit(`/ressources/${slug}`)
  })
  cy.dsfrShouldBeStarted()
}

export const cleanUpAndCreateTestPublishedResourceInProfile = (
  userData: Partial<CreateUserInput>,
  publicResource?: boolean,
  additionalSetup?: ({ user }: { user: Pick<SessionUser, 'id'> }) => void,
) => {
  cy.execute('deleteAllData', {})
  const user = createTestUser(userData)
  const id = v4()
  const commands = createTestResourceCommands({ resourceId: id })
  commands.push(createTestPublishResourceCommand(id, publicResource))

  cy.createUserAndSignin(user)
  cy.sendResourceCommands({ user, commands }).then(({ slug }) => {
    additionalSetup?.({ user })
    cy.visit(`/ressources/${slug}`)
  })
  cy.dsfrShouldBeStarted()
}

export const cleanUpAndCreateTestResourceInProfile = (
  publicProfile?: boolean,
  withBase?: boolean,
) => {
  cy.execute('deleteAllData', {})
  const user = createTestUser({ isPublic: publicProfile })
  cy.createUserAndSignin(user)

  if (withBase) {
    const base = createTestBase(user.id)
    cy.createBase(base)
  }

  const commands = createTestResourceCommands({})
  cy.sendResourceCommands({ user, commands }).then(({ slug }) => {
    cy.visit(`/ressources/${slug}/editer`)
  })

  cy.intercept('/api/trpc/resource.mutate?*').as('mutation')
  cy.dsfrShouldBeStarted()
}

export const cleanUp = (userData?: Partial<CreateUserInput>) => {
  cy.execute('deleteAllData', {})
  const user = createTestUser(userData)

  cy.createUserAndSignin(user)
  cy.visit('/')
  cy.dsfrShouldBeStarted()
}

export const cleanUpAndCreateTestBase = (publicBase?: boolean) => {
  cy.execute('deleteAllData', {})
  const user = createTestUser()
  const base = createTestBase(user.id, publicBase)

  cy.createUserAndSignin(user)
  cy.createBase(base)
  cy.visit(`/bases/${base.slug}`)

  cy.dsfrShouldBeStarted()
}

export const cleanUpAndCreateTestBaseAsMember = (publicBase?: boolean) => {
  cy.execute('deleteAllData', {})
  const admin = createTestUser()
  const user = createTestUser()
  const base = createTestBase(admin.id, publicBase, [user.id])

  cy.createUser(admin)
  cy.createUserAndSignin(user)
  cy.createBase(base)

  cy.visit(`/bases/${base.slug}`)

  cy.dsfrShouldBeStarted()
}

export const expectActionBarStatusWithDraftEdits = () => {
  cy.testId('resource-published-state').should('have.text', 'Brouillon')
  cy.testId('resource-edition-state').should('have.text', 'Enregistrée')
  cy.testId('publish-resource-button')
    .should('not.be.disabled')
    .should('have.text', 'Publier la ressource')
}

export const startContentEdition = (contentId: string) => {
  cy.testId(`content-edition_${contentId}`).should('exist')
  cy.testId(`content-edition_${contentId}`).scrollIntoView({ duration: 0 })
  cy.testId(`content-edition_${contentId}_form`).should('not.exist')

  cy.testId(`content-edition_${contentId}_edit-button`).should('not.be.visible')

  // TODO Firefox does NOT support realHover() event. Start edition with keyboard navigation (accessibility feature)
  cy.testId(`content-edition_${contentId}`).realHover()
  cy.testId(`content-edition_${contentId}_edit-button`).should('be.visible')
  cy.testId(`content-edition_${contentId}_edit-button`).click()
  cy.removeHover()
  cy.testId(`content-edition_${contentId}_form`).should('exist')
}

export const submitValidContentEdition = (contentId: string) => {
  cy.testId(`content-edition_${contentId}_form__submit`).click()

  cy.wait('@mutation')
  cy.testId(`resource-edition-state`).should('have.text', 'Enregistrée')
  cy.testId(`resource-published-state`).should('have.text', 'Brouillon')

  cy.testId(`content-edition_${contentId}_edit-button`).should('not.be.visible')
  cy.testId(`content-edition_${contentId}_form`).should('not.exist')
  cy.testId(`content-edition_${contentId}`).should('exist')
}

type CleanUpAndCreateTestCollectionAndResourceIds = {
  user: string
  otherUser: string
  baseWithoutCollection: string
  baseWithCollection: string
  otherBaseWithCollection: string
  collectionInBase1?: string
  collectionInBase2?: string
  collectionInOtherBase?: string
  collection1?: string
  collection2?: string
}
export const cleanUpAndCreateTestCollectionAndResource = (
  withCollection?: boolean,
  withBases?: boolean,
) => {
  const ids: Partial<CleanUpAndCreateTestCollectionAndResourceIds> = {}
  cy.execute('deleteAllData', {})
  const user = createTestUser()
  ids.user = user.id
  const otherUser = createTestUser()
  ids.otherUser = otherUser.id
  const collections = []

  cy.createUser(otherUser)
  cy.createUserAndSignin(user)

  if (withBases) {
    const baseWithoutCollection = createTestBase(user.id)
    ids.baseWithoutCollection = baseWithoutCollection.slug
    const baseWithCollection = createTestBase(otherUser.id, true, [user.id])
    baseWithCollection.slug = v4()
    ids.baseWithCollection = baseWithCollection.slug
    const otherBaseWithCollection = createTestBase(otherUser.id)
    otherBaseWithCollection.slug = v4()
    ids.otherBaseWithCollection = otherBaseWithCollection.slug

    cy.createBase(baseWithoutCollection)
    cy.createBase(baseWithCollection)
    cy.createBase(otherBaseWithCollection)

    collections.push(
      createTestCollection(user.id, baseWithCollection.id),
      createTestCollection(user.id, baseWithCollection.id),
      createTestCollection(otherUser.id, otherBaseWithCollection.id),
    )

    ids.collectionInBase1 = collections[0].id
    ids.collectionInBase2 = collections[1].id
    ids.collectionInOtherBase = collections[2].id
  }

  if (withCollection) {
    collections.push(
      createTestCollection(user.id),
      createTestCollection(otherUser.id),
    )

    ids.collection1 = collections.at(-2)?.id
    ids.collection2 = collections.at(-1)?.id
  }

  for (const collection of collections) {
    cy.createCollection(collection)
  }

  const id = v4()
  const commands = createTestResourceCommands({
    resourceId: id,
  })
  commands.push(createTestPublishResourceCommand(id, true))
  cy.sendResourceCommands({ user, commands }).then(({ slug }) => {
    cy.visit(`/ressources/${slug}`)
  })
  cy.dsfrShouldBeStarted()
  return ids
}
