import z from 'zod'
import { optionalFileValidation } from '@app/ui/components/Form/utils/fileValidation.client'
import {
  FilePayloadCommandValidation,
  ImagePayloadCommandValidation,
  LinkPayloadCommandValidation,
  SectionTitlePayloadCommandValidation,
  TextPayloadCommandValidation,
} from '@app/web/server/resources/feature/Content'
import { imageFileValidationOptions } from '@app/web/server/rpc/image/imageValidation'

export const ClientImagePayloadCommandValidation =
  ImagePayloadCommandValidation.extend({
    imageUploadFile: optionalFileValidation({
      ...imageFileValidationOptions,
    }),
  })

export const ClientFilePayloadCommandValidation =
  FilePayloadCommandValidation.extend({
    uploadFile: optionalFileValidation({}),
  })

export const ClientContentPayloadCommandValidation = z.discriminatedUnion(
  'type',
  [
    SectionTitlePayloadCommandValidation,
    TextPayloadCommandValidation,
    ClientImagePayloadCommandValidation,
    LinkPayloadCommandValidation,
    ClientFilePayloadCommandValidation,
  ],
)
export type ClientContentPayload = z.infer<
  typeof ClientContentPayloadCommandValidation
>
