import { expectZodValidationToFail } from '@app/test/zodValidationTest'
import { AddContentCommand, AddContentCommandValidation } from './AddContent'
import {
  sectionTitleFailUseCases,
  textFailUseCases,
} from './Content.spec.config'

const validSectionTitleCommand: AddContentCommand = {
  name: 'AddContent',
  payload: {
    resourceId: '8e32fcd3-b3fe-496f-8825-a6779393c94a',
    type: 'SectionTitle',
    title: 'Ma liberté',
  },
}

const validTextCommand: AddContentCommand = {
  name: 'AddContent',
  payload: {
    resourceId: '8e32fcd3-b3fe-496f-8825-a6779393c94a',
    type: 'Text',
    text: "Jusqu'au bout des chemins de fortune",
  },
}

describe('AddContentCommandValidation', () => {
  it('fails on other name', () => {
    expectZodValidationToFail(
      AddContentCommandValidation,
      validSectionTitleCommand,
      {
        name: 'AddContents',
      },
      [
        {
          path: ['name'],
          message: 'Invalid literal value, expected "AddContent"',
        },
      ],
    )
  })

  it('fails without payload', () => {
    expectZodValidationToFail(
      AddContentCommandValidation,
      validSectionTitleCommand,
      {
        payload: undefined,
      },
      [
        {
          path: ['payload'],
          message: 'Required',
        },
      ],
    )
  })

  it('fails without resourceId', () => {
    expectZodValidationToFail(
      AddContentCommandValidation,
      validSectionTitleCommand,
      {
        payload: { ...validSectionTitleCommand.payload, resourceId: undefined },
      },
      [
        {
          path: ['payload', 'resourceId'],
          message: 'Required',
        },
      ],
    )
  })

  describe('Section title', () => {
    it('allows valid value', () => {
      const result = AddContentCommandValidation.safeParse(
        validSectionTitleCommand,
      )
      expect(result.success).toEqual(true)
    })

    sectionTitleFailUseCases(validSectionTitleCommand).map(
      ({ name, values, errors }) =>
        it(name, () =>
          expectZodValidationToFail(
            AddContentCommandValidation,
            validSectionTitleCommand,
            values,
            errors,
          ),
        ),
    )
  })

  describe('Text', () => {
    it('allows valid value', () => {
      const result = AddContentCommandValidation.safeParse(validTextCommand)
      expect(result.success).toEqual(true)
    })

    textFailUseCases(validTextCommand).map(({ name, values, errors }) =>
      it(name, () =>
        expectZodValidationToFail(
          AddContentCommandValidation,
          validTextCommand,
          values,
          errors,
        ),
      ),
    )
  })
})
