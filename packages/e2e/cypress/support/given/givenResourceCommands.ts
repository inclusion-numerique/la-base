import type { CreateResourceCommand } from '@app/web/server/resources/feature/CreateResource'
import type { PublishCommand } from '@app/web/server/resources/feature/PublishResource'
import type { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import { v4 } from 'uuid'

export const createTestPublishResourceCommand = (
  resourceId: string,
  isPublic?: boolean,
) =>
  ({
    name: 'Publish',
    payload: isPublic
      ? {
          resourceId,
          isPublic: true,
          themes: ['AidesAuxDemarchesAdministratives'],
          supportTypes: ['Article'],
          targetAudiences: ['Particuliers', 'AidantsNumeriques'],
        }
      : { resourceId, isPublic: false },
  }) satisfies PublishCommand

export const createTestResourceCommands = ({
  baseId,
  resourceId: resourceIdParameter,
}: {
  baseId?: string
  resourceId?: string
}): [CreateResourceCommand, ...ResourceMutationCommand[]] => {
  const resourceId = resourceIdParameter || v4()
  return [
    {
      name: 'CreateResource',
      payload: {
        resourceId,
        baseId: baseId || null,
        title:
          'Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes',
        description:
          'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
      },
    },
    {
      name: 'AddContent',
      payload: {
        order: 1,
        resourceId,
        title: 'Mon premier titre de section',
        type: 'SectionTitle',
      },
    },
    {
      name: 'AddContent',
      payload: {
        order: 2,
        resourceId,
        type: 'Text',
        text: '<p>Mon premier paragraphe</p>',
      },
    },
    {
      name: 'AddContent',
      payload: {
        resourceId,
        order: 3,
        type: 'Link',
        title: 'Vous avez vu mon lien',
        url: 'https://www.imdb.com/title/tt0357111/',
        showPreview: false,
        caption: 'Il est beau hein !',
      },
    },
  ] satisfies [CreateResourceCommand, ...ResourceMutationCommand[]]
}
