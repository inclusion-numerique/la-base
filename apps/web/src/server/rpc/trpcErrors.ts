import { TRPCError } from '@trpc/server'

export const forbiddenError = (message?: string) =>
  new TRPCError({
    code: 'FORBIDDEN',
    message:
      message ?? 'Vous n’avez pas l’authorisation d’effectuer cette opération.',
  })

export const notFoundError = (message?: string) =>
  new TRPCError({
    code: 'NOT_FOUND',
    message: message ?? 'Introuvable. Veuillez réessayer ultérieurement.',
  })

export const invalidError = (message?: string) =>
  new TRPCError({
    code: 'BAD_REQUEST',
    message:
      message ?? 'Opération invalide. Veuillez réessayer ultérieurement.',
  })

export const authorizeOrThrow = (authorized: boolean, message?: string) => {
  if (!authorized) {
    throw forbiddenError(message)
  }
}
