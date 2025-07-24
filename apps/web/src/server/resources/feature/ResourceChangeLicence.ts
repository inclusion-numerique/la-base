import { ResourceLicence } from '@prisma/client'
import z from 'zod'

export const ChangeLicenceCommandValidation = z.object({
  name: z.literal('ChangeLicence'),
  payload: z.object({
    resourceId: z.string().uuid(),
    licence: z.nativeEnum(ResourceLicence),
  }),
})

export type ChangeLicenceCommand = z.infer<
  typeof ChangeLicenceCommandValidation
>

type LicenceChangedDataV1 = {
  __version: 1
  licence: ResourceLicence
}

export type LicenceChanged = {
  type: 'LicenceChanged'
  timestamp: Date
  data: LicenceChangedDataV1
}
