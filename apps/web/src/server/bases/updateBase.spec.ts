import { expectZodValidationToFail } from '@app/test/zodValidationTest'
import {
  UpdateBaseContactsCommand,
  UpdateBaseContactsCommandValidation,
  UpdateBaseInformationsCommand,
  UpdateBaseInformationsCommandValidation,
  UpdateBaseVisibilityCommand,
  UpdateBaseVisibilityCommandValidation,
} from './updateBase'

describe('UpdateBaseInformationsCommand', () => {
  const validCommand: UpdateBaseInformationsCommand = {
    title: 'mon titre',
  }

  it('allows valid minimum value', () => {
    const result =
      UpdateBaseInformationsCommandValidation.safeParse(validCommand)
    expect(result.success).toEqual(true)
  })

  it('allows valid complete value', () => {
    const result = UpdateBaseInformationsCommandValidation.safeParse({
      ...validCommand,
      department: 'Mon departement',
      description: 'Ma description',
    })
    expect(result.success).toEqual(true)
  })

  it('does not allow empty title', () => {
    expectZodValidationToFail(
      UpdateBaseInformationsCommandValidation,
      validCommand,
      {
        title: undefined,
      },
      [
        {
          path: ['title'],
          message: 'Veuillez renseigner le nom de la base',
        },
      ],
    )
  })

  it('does not allow only space title', () => {
    expectZodValidationToFail(
      UpdateBaseInformationsCommandValidation,
      validCommand,
      {
        title: '   ',
      },
      [
        {
          path: ['title'],
          message: 'Veuillez renseigner le nom de la base',
        },
      ],
    )
  })

  it('does not allow number department', () => {
    expectZodValidationToFail(
      UpdateBaseInformationsCommandValidation,
      validCommand,
      {
        department: 123,
      },
      [
        {
          path: ['department'],
          message: 'Expected string, received number',
        },
      ],
    )
  })

  it('does not allow number description', () => {
    expectZodValidationToFail(
      UpdateBaseInformationsCommandValidation,
      validCommand,
      {
        description: 123,
      },
      [
        {
          path: ['description'],
          message: 'Expected string, received number',
        },
      ],
    )
  })

  it('sanitize description', () => {
    const result = UpdateBaseInformationsCommandValidation.safeParse({
      ...validCommand,
      description: '<body><b>Broken html</b>',
    })
    expect(result.success).toEqual(true)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Success is true
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(result.data.description).toEqual('<b>Broken html</b>')
  })
})

describe('UpdateBaseVisibilityCommand', () => {
  const validCommand: UpdateBaseVisibilityCommand = {
    isPublic: true,
  }

  it('allows valid value', () => {
    const result = UpdateBaseVisibilityCommandValidation.safeParse(validCommand)
    expect(result.success).toEqual(true)
  })

  it('does not allow empty visibility', () => {
    expectZodValidationToFail(
      UpdateBaseVisibilityCommandValidation,
      validCommand,
      {
        isPublic: undefined,
      },
      [
        {
          path: ['isPublic'],
          message: 'Veuillez spécifier la visibilité de la base',
        },
      ],
    )
  })
})

describe('UpdateBaseContactsCommand', () => {
  const validCommand: UpdateBaseContactsCommand = {
    email: 'e@mail.fr',
    emailIsPublic: true,
  }

  it('allows valid minimum value', () => {
    const result = UpdateBaseContactsCommandValidation.safeParse(validCommand)
    expect(result.success).toEqual(true)
  })

  it('allows valid complete value', () => {
    const result = UpdateBaseContactsCommandValidation.safeParse({
      ...validCommand,
      website: 'https://website.fr',
      facebook: 'https://facebook.fr',
      twitter: 'https://twitter.fr',
      linkedin: 'https://linkedin.fr',
    })
    expect(result.success).toEqual(true)
  })

  it('does not allow empty email', () => {
    expectZodValidationToFail(
      UpdateBaseContactsCommandValidation,
      validCommand,
      {
        email: undefined,
      },
      [
        {
          path: ['email'],
          message: 'Veuillez renseigner une adresse e-mail',
        },
      ],
    )
  })

  it('does not allow space email', () => {
    expectZodValidationToFail(
      UpdateBaseContactsCommandValidation,
      validCommand,
      {
        email: '  ',
      },
      [
        {
          path: ['email'],
          message: 'Veuillez renseigner une adresse e-mail',
        },
      ],
    )
  })

  it('does not allow invalid email', () => {
    expectZodValidationToFail(
      UpdateBaseContactsCommandValidation,
      validCommand,
      {
        email: 'mon-email',
      },
      [
        {
          path: ['email'],
          message: 'Veuillez entrer une adresse e-mail valide',
        },
      ],
    )
  })

  it('does not allow empty email visibility', () => {
    expectZodValidationToFail(
      UpdateBaseContactsCommandValidation,
      validCommand,
      {
        emailIsPublic: undefined,
      },
      [
        {
          path: ['emailIsPublic'],
          message: 'Required',
        },
      ],
    )
  })

  it('does not allow empty incorrect website', () => {
    expectZodValidationToFail(
      UpdateBaseContactsCommandValidation,
      validCommand,
      {
        website: 'website',
      },
      [
        {
          path: ['website'],
          message: 'Veuiller renseigner une URL valide',
        },
      ],
    )
  })

  it('does not allow empty incorrect facebook', () => {
    expectZodValidationToFail(
      UpdateBaseContactsCommandValidation,
      validCommand,
      {
        facebook: 'facebook',
      },
      [
        {
          path: ['facebook'],
          message: 'Veuiller renseigner une URL valide',
        },
      ],
    )
  })

  it('does not allow empty incorrect twitter', () => {
    expectZodValidationToFail(
      UpdateBaseContactsCommandValidation,
      validCommand,
      {
        twitter: 'twitter',
      },
      [
        {
          path: ['twitter'],
          message: 'Veuiller renseigner une URL valide',
        },
      ],
    )
  })

  it('does not allow empty incorrect linkedin', () => {
    expectZodValidationToFail(
      UpdateBaseContactsCommandValidation,
      validCommand,
      {
        linkedin: 'linkedin',
      },
      [
        {
          path: ['linkedin'],
          message: 'Veuiller renseigner une URL valide',
        },
      ],
    )
  })
})
