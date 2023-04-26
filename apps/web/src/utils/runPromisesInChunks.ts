import { chunk } from 'lodash'
import { runPromisesSequentially } from '@app/web/utils/runPromisesSequentially'

export const runPromisesInChunks = async <T>(
  promises: Iterable<T | PromiseLike<T>>,
  chunkSize: number,
): Promise<Awaited<T>[]> => {
  const chunked = chunk(
    Array.isArray(promises) ? promises : [...promises],
    chunkSize,
  )

  const chunkedResults = await runPromisesSequentially(
    chunked.map((promisesChunk) => Promise.all(promisesChunk)),
  )

  return chunkedResults.flat()
}
