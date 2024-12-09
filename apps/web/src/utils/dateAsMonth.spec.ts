import { dateAsMonth } from '@app/web/utils/dateAsMonth'

describe('dateAsMonth', () => {
  it('formats date', () => {
    expect(dateAsMonth(new Date('2023-02-16T07:48:58'))).toEqual('02/2023')
  })
})
