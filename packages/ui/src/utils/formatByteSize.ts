const kilo = 1000
const mega = 1_000_000
const giga = 1_000_000_000

const withUnit = (value: number, unit: string) =>
  // eslint-disable-next-line no-irregular-whitespace
  `${value
    .toFixed(2)
    // Remove trailing zeros
    .replace(/(\d+(\.\d+[1-9])?)(\.?0+$)/, '$1')
    .replace('.', ',')} ${unit}`

export const formatByteSize = (sizeInBytes: number | null): string => {
  if (!sizeInBytes) {
    return '-'
  }
  if (sizeInBytes < kilo) {
    // eslint-disable-next-line no-irregular-whitespace
    return `${sizeInBytes} o`
  }

  if (sizeInBytes < mega) {
    return withUnit(sizeInBytes / kilo, 'ko')
  }

  if (sizeInBytes < giga) {
    return withUnit(sizeInBytes / mega, 'Mo')
  }

  return withUnit(sizeInBytes / giga, 'Go')
}
