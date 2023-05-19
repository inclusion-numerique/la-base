import { expectZodValidationToFail } from '@app/test/zodValidationTest'
import {
  sectionTitleFailUseCases,
  textFailUseCases,
} from './Content.spec.config'
import { EditContentCommand, EditContentCommandValidation } from './EditContent'

const validSectionTitleCommand: EditContentCommand = {
  name: 'EditContent',
  payload: {
    resourceId: '8e32fcd3-b3fe-496f-8825-a6779393c94a',
    id: 'e9940b76-2f6b-4e51-929e-b419bb10de97',
    type: 'SectionTitle',
    title: 'Ma liberté',
  },
}

const validTextCommand: EditContentCommand = {
  name: 'EditContent',
  payload: {
    resourceId: '8e32fcd3-b3fe-496f-8825-a6779393c94a',
    id: 'e9940b76-2f6b-4e51-929e-b419bb10de97',
    type: 'Text',
    text: "Jusqu'au bout des chemins de fortune",
  },
}

describe('EditContentCommandValidation', () => {
  it('fails on other name', () => {
    expectZodValidationToFail(
      EditContentCommandValidation,
      validSectionTitleCommand,
      {
        name: 'EditContents',
      },
      [
        {
          path: ['name'],
          message: 'Invalid literal value, expected "EditContent"',
        },
      ],
    )
  })

  it('fails without payload', () => {
    expectZodValidationToFail(
      EditContentCommandValidation,
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
      EditContentCommandValidation,
      validSectionTitleCommand,
      {
        payload: {
          ...validSectionTitleCommand.payload,
          resourceId: undefined,
        },
      },
      [
        {
          path: ['payload', 'resourceId'],
          message: 'Required',
        },
      ],
    )
  })

  it('fails without id', () => {
    expectZodValidationToFail(
      EditContentCommandValidation,
      validSectionTitleCommand,
      {
        payload: { ...validSectionTitleCommand.payload, id: undefined },
      },
      [
        {
          path: ['payload', 'id'],
          message: 'Required',
        },
      ],
    )
  })

  describe('Section title', () => {
    it('allows valid value', () => {
      const result = EditContentCommandValidation.safeParse(
        validSectionTitleCommand,
      )
      expect(result.success).toEqual(true)
    })

    sectionTitleFailUseCases(validSectionTitleCommand).map(
      ({ name, values, errors }) =>
        it(name, () =>
          expectZodValidationToFail(
            EditContentCommandValidation,
            validSectionTitleCommand,
            values,
            errors,
          ),
        ),
    )
  })

  describe('Text', () => {
    it('allows valid value', () => {
      const result = EditContentCommandValidation.safeParse(validTextCommand)
      expect(result.success).toEqual(true)
    })

    textFailUseCases(validTextCommand).map(({ name, values, errors }) =>
      it(name, () =>
        expectZodValidationToFail(
          EditContentCommandValidation,
          validTextCommand,
          values,
          errors,
        ),
      ),
    )
  })
})
