/**
 * This data structure is used to avoid processing the same image multiple times
 */
const createImageProcessingQueue = () => {
  const queue = new Map<string, Promise<void>>()

  return {
    add: ({
      processedImageKey,
      processingPromise,
    }: {
      processedImageKey: string
      processingPromise: Promise<void>
    }) => {
      queue.set(processedImageKey, processingPromise)
    },
    remove: ({ processedImageKey }: { processedImageKey: string }) => {
      queue.delete(processedImageKey)
    },
    get: (processedImageKey: string) => queue.get(processedImageKey),
  }
}

export const imageProcessingQueue = createImageProcessingQueue()
