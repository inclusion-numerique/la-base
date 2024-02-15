import { v4 } from 'uuid'
import { CreateCollectionInput } from '@app/e2e/e2e/authentication/user.tasks'
import { createSlug } from '@app/web/utils/createSlug'

export const defaultTestCollectionTitle =
  '10 ressources qui vont changer votre vie'
export const defaultTestCollectionDescription =
  "<p>Vous êtes fatigué de naviguer sur Internet sans but ?</p><p>Vous vous sentez submergé par le déluge constant d'informations numériques? Ne cherchez plus! Notre liste de ressources sur le numérique est la panacée que vous attendiez tous ! Préparez-vous à une transformation totale de votre vie grâce à ces ressources inestimables.</p>"

export const givenCollection = (
  data: Partial<CreateCollectionInput> & {
    createdById: string
    isPublic: boolean
  },
) =>
  ({
    id: data.id ?? v4(),
    title: data.title ?? defaultTestCollectionTitle,
    slug: createSlug(data.title ?? defaultTestCollectionTitle),
    description: data.description ?? defaultTestCollectionDescription,
    ...data,
  }) satisfies CreateCollectionInput
