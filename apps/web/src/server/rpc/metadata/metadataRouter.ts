import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { getMetadataFromDocument } from '@app/web/server/rpc/metadata/getMetadataFromDocument'
import axios, { AxiosError } from 'axios'
import z from 'zod'

const GetMetaDataValidation = z.object({
  url: z.string().url(),
})

export const metadataRouter = router({
  get: protectedProcedure
    .input(GetMetaDataValidation)
    .query(async ({ input: { url } }) => {
      try {
        const urlObject = new URL(url)

        const [document, hasDefaultFavicon] = await Promise.all([
          axios.get<string>(url),
          axios
            .head(`${urlObject.protocol}//${urlObject.origin}/favicon.ico`)
            .then(() => true)
            .catch(() => false),
        ])
        return getMetadataFromDocument(document.data, {
          url: urlObject,
          hasDefaultFavicon,
        })
      } catch (error) {
        if (!(error instanceof AxiosError)) {
          throw error
        }
        return { error: error.message, status: error.status }
      }
    }),
})
