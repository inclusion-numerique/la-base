import { chunk } from 'lodash'
import { runPromisesSequentially } from '@app/web/utils/runPromisesSequentially'

export const runPromisesInChunks = async <T>(
  promises: ArrayLike<T | PromiseLike<T>>,
  chunkSize: number,
): Promise<Awaited<T>[]> => {
  const chunked = chunk(promises, chunkSize)

  const chunkedResults = await runPromisesSequentially(
    chunked.map((promisesChunk) => Promise.all(promisesChunk)),
  )

  return chunkedResults.flat()
}
