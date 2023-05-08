import { removeNullAndUndefinedValues } from '@app/web/utils/removeNullAndUndefinedValues'

describe('removeNullAndUndefinedValues', () => {
  it('Removes null and values', () => {
    expect(
      removeNullAndUndefinedValues({
        a: '',
        b: 0,
        c: {},
        d: [],
        e: null,
        f: undefined,
        g: Number.NaN,
      }),
    ).toEqual({ a: '', b: 0, c: {}, d: [], g: Number.NaN })
  })
})
