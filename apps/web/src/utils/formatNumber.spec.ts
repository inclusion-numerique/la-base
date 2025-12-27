import { numberToPercentage } from '@app/web/utils/formatNumber'

describe('formatNumber', () => {
  describe('numberToPercentage', () => {
    const cases = [
      { value: 0, expected: '0 %' },
      { value: 12.34, expected: '12,3 %' },
      { value: 12.342_543_24, expected: '12,3 %' },
      { value: 12.55, expected: '12,6 %' },
      { value: 43.000_123_425_432_4, expected: '43 %' },
      { value: 353.423, expected: '353,4 %' },
    ]

    test.each(cases)('should format $value to $expected', ({
      value,
      expected,
    }) => {
      expect(numberToPercentage(value)).toEqual(expected)
    })
  })
})
