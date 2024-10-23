import { chunk } from 'lodash-es'
import { runPromisesSequentially } from '@app/web/utils/runPromisesSequentially'

export const runPromisesInChunks = async <T>(
  promises: ArrayLike<T | PromiseLike<T>>,
  chunkSize: number,
  onChunk?: (
    chunkResult: Awaited<T>[],
    chunkIndex: number,
  ) => void | Promise<void>,
): Promise<Awaited<T>[]> => {
  const chunked = chunk(promises, chunkSize)

  const chunkedResults = await runPromisesSequentially(
    chunked.map((promisesChunk, chunkIndex) =>
      Promise.all(promisesChunk).then(async (chunkResult) => {
        if (onChunk) {
          await onChunk(chunkResult, chunkIndex)
        }
        return chunkResult
      }),
    ),
  )

  return chunkedResults.flat()
}
