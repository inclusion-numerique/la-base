import z from 'zod'
import { resourceEditionValues } from '../rpc/resource/utils'
import { indexationCommand } from './feature/PublishResource'

export const UpdateResourcePublicationCommandValidation = z.object({
  baseId: resourceEditionValues.baseId,
})

export const UpdateResourceVisibilityCommandValidation = z.object({
  isPublic: z.boolean(),
})

export const UpdateResourceIndexationCommandValidation = z.object({
  ...indexationCommand,
})

export const UpdateResourceCommandValidation = z.object({
  id: z.string({ required_error: "Veuillez renseigner l'id de la resource" }),
  data: z.union([
    UpdateResourcePublicationCommandValidation,
    UpdateResourceVisibilityCommandValidation,
    UpdateResourceIndexationCommandValidation,
  ]),
})

export type UpdateResourcePublicationCommand = z.infer<
  typeof UpdateResourcePublicationCommandValidation
>

export type UpdateResourceVisibilityCommand = z.infer<
  typeof UpdateResourceVisibilityCommandValidation
>

export type UpdateResourceIndexationCommand = z.infer<
  typeof UpdateResourceIndexationCommandValidation
>

export type UpdateResourceCommand =
  | UpdateResourcePublicationCommand
  | UpdateResourceVisibilityCommand
  | UpdateResourceIndexationCommand
