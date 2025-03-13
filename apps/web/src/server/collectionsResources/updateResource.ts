import { z } from 'zod'

export const UpdateCollectionResourcesOrdersCommandValidation = z.object({
  resources: z.array(
    z.object({
      id: z
        .string({
          required_error:
            "Veuillez renseigner l'id de la ressource de collection",
        })
        .uuid(),
      resourceId: z
        .string({
          required_error: "Veuillez renseigner l'id de la ressource",
        })
        .uuid(),
      order: z.number(),
    }),
  ),
})
