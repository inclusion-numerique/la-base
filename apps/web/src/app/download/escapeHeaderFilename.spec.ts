import { escapeHeaderFilename } from '@app/web/app/download/escapeHeaderFilename'

describe('escapeHeaderFilename', () => {
  it('should correctly escape a complex filename string', () => {
    const complexFilename = `test"file\\name/with:special*chars<>|and'quotes\0control Çcharacters"`
    const expectedEscapedFilename = `test\\"file\\\\name/with:special*chars<>|and'quotes_control Ccharacters\\"`

    const result = escapeHeaderFilename(complexFilename)

    expect(result).toBe(expectedEscapedFilename)
  })
})
