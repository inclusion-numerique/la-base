export const createStopwatch = () => {
  const started = new Date()

  return {
    started,
    current: () => {
      return Date.now() - started.getTime()
    },
    stop: () => {
      const ended = new Date()
      const duration = ended.getTime() - started.getTime()

      return {
        duration,
        started,
        ended,
      }
    },
  }
}
