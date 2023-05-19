import z from 'zod'
import { ContentAdded } from '@app/web/server/resources/feature/AddContent'
import { ResourceCreated } from '@app/web/server/resources/feature/CreateResource'
import {
  ResourceCommandSecurityRule,
  ResourceCreationCommandHandler,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import { resourceEditionValues } from '@app/web/server/rpc/resource/utils'

export const MigrateResourceCommandValidation = z.object({
  name: z.literal('MigrateResource'),
  payload: z.object({
    resourceId: z.string().uuid(),
    slug: z.string(),
    title: resourceEditionValues.title,
    description: resourceEditionValues.description,
    baseId: resourceEditionValues.baseId,
  }),
})

export type MigrateResourceCommand = z.infer<
  typeof MigrateResourceCommandValidation
>

export const handleMigrateResource: ResourceCreationCommandHandler<
  MigrateResourceCommand,
  ResourceCreated | ContentAdded
> = ({ payload }, { user }) => {
  const { resourceId, ...rest } = payload

  const timestamp = new Date()

  return [
    {
      // TODO 'Migrated' type event with legacyId and all contents, so 1 event only
      type: 'Created',
      timestamp,
      data: {
        __version: 1,
        id: resourceId,
        byId: user.id,
        titleDuplicationCheckSlug: rest.slug,
        ...rest,
      },
    },
    // TODO Add ContentAdded events
    // TODO Add Published event if needed
  ]
}

export const migrateResourceSecurityRules: ResourceCommandSecurityRule<
  MigrateResourceCommand
> = () => false
