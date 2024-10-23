import { formDataToObject } from '@app/web/utils/formDataToObject'

describe('formDataToObject', () => {
  it('converts FormData to a plain object with primitive values', () => {
    const formData = new FormData()
    formData.append('id', '123')
    formData.append('name', 'John Doe')

    const result = formDataToObject(formData)
    const expected = {
      id: '123',
      name: 'John Doe',
    }

    expect(result).toEqual(expected)
  })

  it('handles multiple values for the same key', () => {
    const formData = new FormData()
    formData.append('key', 'value1')
    formData.append('key', 'value2')

    const result = formDataToObject(formData)
    // Note: FormData does not handle multiple values per key without specific handling,
    // this test checks the last value assigned (default behavior without specific implementations)
    const expected = {
      key: 'value2',
    }

    expect(result).toEqual(expected)
  })

  it('handles non-string values', () => {
    const formData = new FormData()
    const blob = new Blob(['content'], { type: 'text/plain' })
    formData.append('file', blob)

    const result = formDataToObject(formData)

    expect(result.file).toBeInstanceOf(Blob)
    expect((result.file as Record<string, unknown>).size).toBe(blob.size)
    expect((result.file as Record<string, unknown>).type).toBe(blob.type)
  })

  it('returns an empty object when FormData is empty', () => {
    const formData = new FormData()
    const result = formDataToObject(formData)

    expect(result).toEqual({})
  })
})
