import z from 'zod'

export const AssistantValidation = z.object({
  prompt: z.string().trim(),
})

export type AssistantData = z.infer<typeof AssistantValidation>
