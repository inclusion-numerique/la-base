import { z } from 'zod'

export const UpdateCollectionResourcesOrdersCommandValidation = z.object({
  resources: z.array(
    z.object({
      id: z
        .string({
          error: "Veuillez renseigner l'id de la ressource de collection",
        })
        .uuid(),
      resourceId: z
        .string({
          error: "Veuillez renseigner l'id de la ressource",
        })
        .uuid(),
      order: z.number(),
    }),
  ),
})
