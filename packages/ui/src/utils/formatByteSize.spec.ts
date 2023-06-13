import { formatByteSize } from '@app/ui/utils/formatByteSize'

describe('formatByteSize', () => {
  it('should return for empty size', () => {
    expect(formatByteSize(0)).toEqual('-')
  })

  it('should return formatted value', () => {
    expect(formatByteSize(2_230_400_000)).toEqual('2,23 Go')
  })

  it('should remove trailing zeros formatted value', () => {
    expect(formatByteSize(400_000_000)).toEqual('400 Mo')
  })

  it('should remove only last zero', () => {
    expect(formatByteSize(12_400)).toEqual('12,4 ko')
  })
})
