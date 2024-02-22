import z from 'zod'

export const UserSignupValidation = z.object({
  email: z
    .string({ required_error: 'Veuillez renseigner votre email' })
    .trim()
    .toLowerCase()
    .email('Merci de renseigner un email valide'),
  firstName: z
    .string({ required_error: 'Veuillez renseigner votre prénom' })
    .trim()
    .min(1, 'Veuillez renseigner votre prénom'),
  lastName: z
    .string({ required_error: 'Veuillez renseigner votre nom' })
    .trim()
    .min(1, 'Veuillez renseigner votre nom'),
  policyAccepted: z
    .boolean({
      required_error: `Veuillez accepter les conditions générales d'utilisation`,
    })
    .refine((value) => value, {
      message: `Veuillez accepter les conditions générales d'utilisation`,
      path: ['policyAccepted'],
    }),
})

export type UserSignup = z.infer<typeof UserSignupValidation>
