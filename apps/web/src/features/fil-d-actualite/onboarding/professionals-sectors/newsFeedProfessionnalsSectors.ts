import { ProfessionalSector } from '@prisma/client'
import z from 'zod'

export const UpdateNewsFeedSectorsProfessionnalsValidation = z.object({
  professionalSectors: z.array(z.nativeEnum(ProfessionalSector)),
})

export type UpdateNewsFeedSectorsProfessionnalsCommand = z.infer<
  typeof UpdateNewsFeedSectorsProfessionnalsValidation
>
