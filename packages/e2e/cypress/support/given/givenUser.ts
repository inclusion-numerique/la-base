import { v4 } from 'uuid'
import { createSlug } from '@app/web/utils/createSlug'
import type { CreateUserInput } from '@app/e2e/tasks/handlers/user.tasks'

// Unique per cypress run
const slugHash = v4().split('-')[0]

// Unique per givenUser
let slugSuffix = 0

export const givenUser = (data?: Partial<CreateUserInput>) => {
  const firstName = data?.firstName || 'Jean'
  const lastName = data?.lastName || 'Biche'
  const name = `${firstName} ${lastName}`
  slugSuffix += 1
  const slug = `${createSlug(name)}-${slugHash}-${slugSuffix}`

  return {
    id: v4(),
    email: `${slug}@lesbases.anct.gouv.fr`,
    firstName,
    lastName,
    name,
    role: 'User',
    // eslint-disable-next-line no-plusplus
    slug,
    emailVerified: new Date('2023-04-01'),
    isPublic: false,
    collections: {
      create: {
        id: v4(),
        title: 'Mes favoris',
        slug: `${slug}-favoris`,
        isFavorites: true,
      },
    },
    ...data,
  } as CreateUserInput & {
    id: string
    email: string
    firstName: string
    lastName: string
    name: string
  } satisfies CreateUserInput
}
