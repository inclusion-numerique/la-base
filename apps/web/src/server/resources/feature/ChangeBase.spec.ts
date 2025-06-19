import { expectZodValidationToFail } from '@app/test/zodValidationTest'
import {
  type ChangeBaseCommand,
  ChangeBaseCommandValidation,
} from '@app/web/server/resources/feature/ChangeBase'

const validCommand: ChangeBaseCommand = {
  name: 'ChangeBase',
  payload: {
    resourceId: '8e32fcd3-b3fe-496f-8825-a6779393c94a',
    baseId: '1a57a8b6-e591-4650-8b17-3bf5557f092a',
  },
}

describe('ChangeBaseCommandValidation', () => {
  it('allows valid value', () => {
    const result = ChangeBaseCommandValidation.safeParse(validCommand)
    expect(result.success).toEqual(true)
  })

  it('allows empty base', () => {
    const result = ChangeBaseCommandValidation.safeParse({
      ...validCommand,
      baseId: null,
    })
    expect(result.success).toEqual(true)
  })

  it('does not allow empty id', () => {
    expectZodValidationToFail(
      ChangeBaseCommandValidation,
      validCommand,
      {
        payload: { ...validCommand.payload, resourceId: undefined },
      },
      [{ path: ['payload', 'resourceId'], message: 'Required' }],
    )
  })
})
