import z from 'zod'
import {
  departmentValidation,
  descriptionValidation,
  emailIsPublicValidation,
  emailValidation,
  isPublicValidation,
  siteValidation,
  titleValidation,
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
  members: z.array(z.string()),
  imageId: z.string().uuid().optional(),
  coverImageId: z.string().uuid().optional(),
})

export type CreateBaseCommand = z.infer<typeof CreateBaseCommandValidation>
