import { getZodValidationMutationError } from '@app/web/utils/getZodValidationMutationError'
import { TRPCClientError } from '@trpc/client'

describe('getZodValidationMutationError', () => {
  it('returns undefined on a random Error', () => {
    expect(
      getZodValidationMutationError(new Error('random error')),
    ).toBeUndefined()
  })
  it('returns undefined on a non 400 Error', () => {
    const error = new TRPCClientError('Non 400', {
      result: {
        error: {
          data: { code: 'NOT_FOUND', httpStatus: 404 },
        },
      },
    })
    expect(getZodValidationMutationError(error)).toBeUndefined()
  })

  it('returns undefined on a non Zod Error', () => {
    const error = new TRPCClientError('Non Zod error message', {
      result: {
        error: {
          data: { code: 'BAD_REQUEST', httpStatus: 400 },
        },
      },
    })
    expect(getZodValidationMutationError(error)).toBeUndefined()
  })

  it('returns Zod errors on a Zod Error', () => {
    const error = new TRPCClientError(
      JSON.stringify([
        {
          code: 'custom',
          message: 'Un compte avec cet email existe déjà',
          path: ['email'],
        },
      ]),
      {
        result: {
          error: {
            data: { code: 'BAD_REQUEST', httpStatus: 400 },
          },
        },
      },
    )
    expect(getZodValidationMutationError(error)).toEqual([
      {
        code: 'custom',
        message: 'Un compte avec cet email existe déjà',
        path: ['email'],
      },
    ])
  })
})
