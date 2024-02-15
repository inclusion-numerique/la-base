import { v4 } from 'uuid'
import type {
  CreateBaseInput,
  CreateUserInput,
} from '@app/e2e/e2e/authentication/user.tasks'
import { SessionUser } from '@app/web/auth/sessionUser'
import { givenUser } from '@app/e2e/support/given/givenUser'
import { givenBase } from '@app/e2e/support/given/givenBase'
import {
  createTestPublishResourceCommand,
  createTestResourceCommands,
} from '@app/e2e/support/given/givenResourceCommands'
import { givenCollection } from '@app/e2e/support/given/givenCollection'

export const cleanUpAndCreateTestResource = (
  publicBase?: boolean,
  additionalSetup?: () => void,
) => {
  cy.execute('deleteAllData', {})
  const user = givenUser()
  const base = givenBase({ createdById: user.id, isPublic: !!publicBase })
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

  return { user }
}

export const cleanUpAndCreateTestPublishedResource = ({
  publicBase,
  publicResource,
  visitResourcePage,
  additionalSetup,
  signinAsResourceCreator,
}: {
  visitResourcePage?: boolean
  publicBase?: boolean
  publicResource?: boolean
  signinAsResourceCreator?: boolean
  additionalSetup?: ({
    user,
    base,
  }: {
    user: Pick<SessionUser, 'id'>
    base: CreateBaseInput
  }) => void
}) => {
  cy.execute('deleteAllData', {})
  const user = givenUser()
  const base = givenBase({ createdById: user.id, isPublic: !!publicBase })
  const resourceId = v4()
  const commands = createTestResourceCommands({
    baseId: base.id,
    resourceId,
  })
  commands.push(createTestPublishResourceCommand(resourceId, publicResource))

  if (signinAsResourceCreator) {
    cy.createUserAndSignin(user)
  } else {
    cy.createUser(user)
  }
  cy.createBase(base)
  cy.sendResourceCommands({ user, commands }).then(({ slug }) => {
    additionalSetup?.({ user, base })
    if (visitResourcePage) {
      cy.visit(`/ressources/${slug}`)
      cy.dsfrShouldBeStarted()
    }
  })

  return { user, base, commands, resourceId }
}

export const cleanUpAndCreateTestPublishedResourceInProfile = (
  userData: Partial<CreateUserInput>,
  publicResource?: boolean,
  additionalSetup?: ({ user }: { user: Pick<SessionUser, 'id'> }) => void,
) => {
  cy.execute('deleteAllData', {})
  const user = givenUser(userData)
  const resourceId = v4()
  const commands = createTestResourceCommands({ resourceId })
  commands.push(createTestPublishResourceCommand(resourceId, publicResource))

  cy.createUserAndSignin(user)
  cy.sendResourceCommands({ user, commands }).then(({ slug }) => {
    additionalSetup?.({ user })
    cy.visit(`/ressources/${slug}`)
  })
  cy.dsfrShouldBeStarted()

  return { user, resourceId }
}

export const cleanUpAndCreateTestResourceInProfile = (
  publicProfile?: boolean,
  withBase?: boolean,
) => {
  cy.execute('deleteAllData', {})
  const user = givenUser({ isPublic: publicProfile })
  cy.createUserAndSignin(user)

  let base: CreateBaseInput | undefined
  if (withBase) {
    base = givenBase({ createdById: user.id, isPublic: false })
    cy.createBase(base)
  }

  const commands = createTestResourceCommands({})
  cy.sendResourceCommands({ user, commands }).then(({ slug }) => {
    cy.visit(`/ressources/${slug}/editer`)
  })

  cy.intercept('/api/trpc/resource.mutate?*').as('mutation')
  cy.dsfrShouldBeStarted()

  return { user, base }
}

export const cleanUp = (userData?: Partial<CreateUserInput>) => {
  cy.execute('deleteAllData', {})
  const user = givenUser(userData)

  cy.createUserAndSignin(user)
  cy.visit('/')
  cy.dsfrShouldBeStarted()

  return { user }
}

export const cleanUpAndCreateTestBase = (publicBase?: boolean) => {
  cy.execute('deleteAllData', {})
  const user = givenUser()
  const base = givenBase({ createdById: user.id, isPublic: !!publicBase })

  cy.createUserAndSignin(user)
  cy.createBase(base)
  cy.visit(`/bases/${base.slug}`)

  cy.dsfrShouldBeStarted()

  return { user, base }
}

export const cleanUpAndCreateTestBaseAsMember = (publicBase?: boolean) => {
  cy.execute('deleteAllData', {})
  const admin = givenUser()
  const user = givenUser()
  const base = givenBase(
    { createdById: admin.id, isPublic: !!publicBase },
    { acceptedMemberIds: [user.id] },
  )

  cy.createUser(admin)
  cy.createUserAndSignin(user)
  cy.createBase(base)

  cy.visit(`/bases/${base.slug}`)

  cy.dsfrShouldBeStarted()

  return { admin, user, base }
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
  cy.testId(`content-edition_${contentId}_edit-button`).click({ force: true })
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
  const user = givenUser()
  ids.user = user.id
  const otherUser = givenUser()
  ids.otherUser = otherUser.id
  const collections = []

  cy.createUser(otherUser)
  cy.createUserAndSignin(user)

  if (withBases) {
    const baseWithoutCollection = givenBase({
      title: 'Base sans collections',
      createdById: user.id,
      isPublic: false,
    })

    ids.baseWithoutCollection = baseWithoutCollection.slug
    const baseWithCollection = givenBase(
      {
        title: 'Base avec collections',
        createdById: otherUser.id,
        isPublic: false,
      },
      { acceptedMemberIds: [user.id] },
    )

    baseWithCollection.slug = v4()
    ids.baseWithCollection = baseWithCollection.slug
    const otherBaseWithCollection = givenBase({
      createdById: otherUser.id,
      isPublic: false,
    })
    otherBaseWithCollection.slug = v4()
    ids.otherBaseWithCollection = otherBaseWithCollection.slug

    cy.createBase(baseWithoutCollection)
    cy.createBase(baseWithCollection)
    cy.createBase(otherBaseWithCollection)

    collections.push(
      givenCollection({
        createdById: user.id,
        baseId: baseWithCollection.id,
        isPublic: true,
        title: 'Première collection',
      }),
      givenCollection({
        createdById: user.id,
        baseId: baseWithCollection.id,
        isPublic: true,
        title: 'Seconde collection',
      }),
      givenCollection({
        createdById: otherUser.id,
        baseId: otherBaseWithCollection.id,
        isPublic: true,
        title: 'Collection dans une autre base',
      }),
    )

    ids.collectionInBase1 = collections[0].id
    ids.collectionInBase2 = collections[1].id
    ids.collectionInOtherBase = collections[2].id
  }

  if (withCollection) {
    collections.push(
      givenCollection({
        createdById: user.id,
        isPublic: true,
        title: 'Collection sur mon profil avec un titre long',
      }),
      givenCollection({
        createdById: otherUser.id,
        isPublic: true,
        title: 'Collection sur le profil de quelqu’un d’autre',
      }),
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
  return { ids, user }
}
