import { expectZodValidationToFail } from '@app/test/zodValidationTest'
import {
  linkFailUseCases,
  sectionTitleFailUseCases,
  textFailUseCases,
} from './Content.spec.config'
import {
  type EditContentCommand,
  EditContentCommandValidation,
} from './EditContent'

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

const validLinkCommand: EditContentCommand = {
  name: 'EditContent',
  payload: {
    resourceId: '8e32fcd3-b3fe-496f-8825-a6779393c94a',
    id: 'e9940b76-2f6b-4e51-929e-b419bb10de97',
    type: 'Link',
    title: 'Obsolète',
    url: 'https://www.youtube.com/watch?v=DMDVaaVrAMo',
    caption:
      "Naguère les concierges étaient en vogue Désormais on les a remplacées par des digicodes Dans ma ville il n'y avait pas de parcmètres Je voyais des ouvriers manger des sandwiches à l'omelette",
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

    it('sanitize text', () => {
      const result = EditContentCommandValidation.safeParse({
        ...validTextCommand,
        payload: {
          ...validTextCommand.payload,
          text: '<body><b>Broken html</b>',
        },
      })
      expect(result.success).toEqual(true)

      // @ts-ignore: Success is true

      expect(result.data.payload.text).toEqual('<b>Broken html</b>')
    })

    it('sanitize text with js', () => {
      const result = EditContentCommandValidation.safeParse({
        ...validTextCommand,
        payload: {
          ...validTextCommand.payload,
          text: `
          <html>
            <head>
              <script src="scripts/main.js"></script>
              <script>prompt('You got hacked');</script>
            </head>
            <body>
              <script src="scripts/main.js"></script>
              <script>prompt('You got hacked');</script>
              <b>Risky business</b>
              <button onClick={()=>prompt('You got hacked')}>Click me</button>
            </body>
          </html>
          `,
        },
      })
      expect(result.success).toEqual(true)

      // @ts-ignore: Success is true

      expect(result.data.payload.text).toEqual(`
            
              
              
            
            
              
              
              <b>Risky business</b>
              prompt('You got hacked')}&gt;Click me
            
          `)
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

  describe('Link', () => {
    it('allows valid value', () => {
      const result = EditContentCommandValidation.safeParse(validLinkCommand)
      expect(result.success).toEqual(true)
    })

    it('allows link with preview without data', () => {
      const result = EditContentCommandValidation.safeParse({
        ...validLinkCommand,
        showPreview: true,
      })
      expect(result.success).toEqual(true)
    })

    it('allows link with preview with data', () => {
      const result = EditContentCommandValidation.safeParse({
        ...validLinkCommand,
        showPreview: true,
        linkTitle: 'Mc Solaar',
        linkDescription: 'Best chanson ever',
      })
      expect(result.success).toEqual(true)
    })

    it('allows link without preview with data', () => {
      const result = EditContentCommandValidation.safeParse({
        ...validLinkCommand,
        showPreview: false,
        linkTitle: 'Mc Solaar',
        linkDescription: 'Best chanson ever',
      })
      expect(result.success).toEqual(true)
    })

    linkFailUseCases(validLinkCommand).map(({ name, values, errors }) =>
      it(name, () =>
        expectZodValidationToFail(
          EditContentCommandValidation,
          validLinkCommand,
          values,
          errors,
        ),
      ),
    )
  })
})
