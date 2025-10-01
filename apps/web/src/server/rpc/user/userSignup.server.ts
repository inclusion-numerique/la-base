import { verifyCaptchaResponse } from '@app/web/features/captcha/verifyCaptchaResponse'
import { prismaClient } from '@app/web/prismaClient'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { UserSignupValidation } from '@app/web/server/rpc/user/userSignup'
import z from 'zod'

export const ServerUserSignupValidation = UserSignupValidation.extend({
  email: z
    .string({ required_error: 'Veuillez renseigner votre email' })
    .trim()
    .toLowerCase()
    .email('Merci de renseigner un email valide')
    .refine(async (email) => {
      const existing = await prismaClient.user.findUnique({
        where: { email, signedUpAt: { not: null } },
        select: { id: true },
      })

      return !existing
    }, 'Un compte existe déjà avec cet email'),
  captcha: z
    .string({
      required_error: 'Veuillez vérifier que vous n’êtes pas un robot',
    })
    .refine(async (captcha) => {
      // We disable the captcha check in CI as we don't want to block the e2e tests
      if (ServerWebAppConfig.isCi) {
        return true
      }
      const response = await verifyCaptchaResponse(captcha)
      return response.success
    }, 'Veuillez vérifier que vous n’êtes pas un robot'),
})
