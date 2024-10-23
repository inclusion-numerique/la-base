import type { ResourceReportReason } from '@prisma/client'
import z from 'zod'
import { labelsToOptions } from '@app/ui/components/Form/utils/options'

export const resourceReportReasonLabels: {
  [key in ResourceReportReason]: string
} = {
  Inappropriate: 'Le contenu est inapproprié',
  Outdated: 'Le contenu est obsolète',
  Errors: 'Il y a des erreurs',
  Duplicate: 'C’est le doublon d’une autre ressource',
}

const resourceReportReasons = Object.keys(resourceReportReasonLabels) as [
  keyof typeof resourceReportReasonLabels,
]

export const resourceReportReasonOptions = labelsToOptions(
  resourceReportReasonLabels,
)

export const ResourceReportValidation = z.object({
  resourceId: z.string().uuid(),
  reason: z.enum(resourceReportReasons, {
    required_error: 'Veuillez renseigner un motif',
  }),
  comment: z.string().min(1, 'Veuillez renseigner une description'),
})

export type ResourceReportData = z.infer<typeof ResourceReportValidation>
