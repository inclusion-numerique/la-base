import { createSlug } from '@app/web/utils/createSlug'
import type { Prisma, UserRole } from '@prisma/client'
import { v4 } from 'uuid'

export const givenUser = <T extends Partial<Prisma.UserCreateInput>>(
  data: T,
): Omit<
  T,
  'id' | 'email' | 'firstName' | 'lastName' | 'name' | 'emailVerified' | 'role'
> & {
  id: string
  email: string
  firstName: string
  lastName: string
  name: string
  emailVerified: string | Date
  role: UserRole
} => {
  const { role, email, emailVerified, firstName, lastName, name, id, ...rest } =
    data

  const givenId = id ?? v4()
  const givenFirstName = firstName ?? 'Jean'
  const givenLastName = lastName ?? 'Biche'
  const givenName = name ?? `${givenFirstName} ${givenLastName}`
  const givenSlug = createSlug(givenName)
  const givenRole = role ?? 'User'
  const givenEmailVerified = emailVerified ?? new Date('2024-04-11')
  const givenEmail =
    email ?? `${givenSlug}@coop-mediation-numerique.anct.gouv.fr`

  return {
    id: givenId,
    email: givenEmail,
    firstName: givenFirstName,
    lastName: givenLastName,
    name: givenName,
    role: givenRole,
    emailVerified: givenEmailVerified,
    slug: givenSlug,
    ...rest,
  } satisfies Prisma.UserCreateInput
}
