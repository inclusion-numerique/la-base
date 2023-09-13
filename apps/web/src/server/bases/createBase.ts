import z from 'zod'
import {
  departmentValidation,
  descriptionValidation,
  isPublicValidation,
  titleValidation,
  emailValidation,
  emailIsPublicValidation,
  siteValidation,
} from './updateBase'

export const CreateBaseCommandValidation = z.object({
  title: titleValidation,
  department: departmentValidation,
  description: descriptionValidation,
  isPublic: isPublicValidation,
  email: emailValidation,
  emailIsPublic: emailIsPublicValidation,
  website: siteValidation,
  facebook: siteValidation,
  twitter: siteValidation,
  linkedin: siteValidation,
})

export type CreateBaseCommand = z.infer<typeof CreateBaseCommandValidation>
