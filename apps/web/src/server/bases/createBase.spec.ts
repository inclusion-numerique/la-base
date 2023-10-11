import { expectZodValidationToFail } from '@app/test/zodValidationTest'
import { CreateBaseCommand, CreateBaseCommandValidation } from './createBase'

const validCommand: CreateBaseCommand = {
  title: 'mon titre',
  isPublic: true,
  email: 'e@mail.fr',
  emailIsPublic: true,
  members: [],
}

describe('CreateBaseCommand', () => {
  it('allows valid minimum value', () => {
    const result = CreateBaseCommandValidation.safeParse(validCommand)
    expect(result.success).toEqual(true)
  })

  it('allows valid complete value', () => {
    const result = CreateBaseCommandValidation.safeParse({
      ...validCommand,
      department: 'Mon departement',
      description: 'Ma description',
      website: 'https://website.fr',
      facebook: 'https://facebook.fr',
      twitter: 'https://twitter.fr',
      linkedin: 'https://linkedin.fr',
      members: ['member-1', 'member-2'],
    })
    expect(result.success).toEqual(true)
  })

  it('does not allow empty title', () => {
    expectZodValidationToFail(
      CreateBaseCommandValidation,
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
      CreateBaseCommandValidation,
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
      CreateBaseCommandValidation,
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
      CreateBaseCommandValidation,
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
    const result = CreateBaseCommandValidation.safeParse({
      ...validCommand,
      description: '<body><b>Broken html</b>',
    })
    expect(result.success).toEqual(true)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Success is true
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(result.data.description).toEqual('<b>Broken html</b>')
  })

  it('does not allow empty visibility', () => {
    expectZodValidationToFail(
      CreateBaseCommandValidation,
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

  it('does not allow empty email', () => {
    expectZodValidationToFail(
      CreateBaseCommandValidation,
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
      CreateBaseCommandValidation,
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
      CreateBaseCommandValidation,
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
      CreateBaseCommandValidation,
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
      CreateBaseCommandValidation,
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
      CreateBaseCommandValidation,
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
      CreateBaseCommandValidation,
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
      CreateBaseCommandValidation,
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
