export const runPromisesSequentially = async <T>(
  promises: Iterable<T | PromiseLike<T>>,
): Promise<Awaited<T>[]> => {
  const result: Awaited<T>[] = []

  for (const promise of promises) {
    result.push(await promise)
  }

  return result
}
