const oneMB = 1024 * 1024

const formatMemoryUsage = (data: number) =>
  `${Math.round((data / oneMB) * 100) / 100} MB`

export const getMemoryUsage = () => {
  const memoryData = process.memoryUsage()

  return {
    rss: `${formatMemoryUsage(
      memoryData.rss,
    )} -> Resident Set Size - total memory allocated for the process execution`,
    heapTotal: `${formatMemoryUsage(
      memoryData.heapTotal,
    )} -> total size of the allocated heap`,
    heapUsed: `${formatMemoryUsage(
      memoryData.heapUsed,
    )} -> actual memory used during the execution`,
    external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
  }
}

export const outputMemoryUsage = () => {
  // eslint-disable-next-line no-console
  console.log(getMemoryUsage())
}
