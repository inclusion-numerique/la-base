import { expectZodValidationToFail } from '@app/test/zodValidationTest'
import {
  type EditTitleAndDescriptionCommand,
  EditTitleAndDescriptionCommandValidation,
} from '@app/web/server/resources/feature/EditTitleAndDescription'

const validCommand: EditTitleAndDescriptionCommand = {
  name: 'EditTitleAndDescription',
  payload: {
    resourceId: 'c212854d-b206-4ad0-be8d-ab79c8c12c87',
    title: 'Hello',
    description: 'You',
  },
}

describe('EditTitleAndDescriptionCommand', () => {
  it('allows valid value', () => {
    const result =
      EditTitleAndDescriptionCommandValidation.safeParse(validCommand)
    expect(result.success).toEqual(true)
  })

  it('does not allow empty id', () => {
    expectZodValidationToFail(
      EditTitleAndDescriptionCommandValidation,
      validCommand,
      {
        payload: { ...validCommand.payload, resourceId: undefined },
      },
      [{ path: ['payload', 'resourceId'], message: 'Required' }],
    )
  })

  it('does not allow empty title', () => {
    expectZodValidationToFail(
      EditTitleAndDescriptionCommandValidation,
      validCommand,
      {
        payload: { ...validCommand.payload, title: undefined },
      },
      [{ path: ['payload', 'title'], message: 'Veuillez renseigner le titre' }],
    )
  })

  it('does not allow space only title', () => {
    expectZodValidationToFail(
      EditTitleAndDescriptionCommandValidation,
      validCommand,
      {
        payload: { ...validCommand.payload, title: '   ' },
      },
      [{ path: ['payload', 'title'], message: 'Veuillez renseigner le titre' }],
    )
  })

  it('does not allow long title', () => {
    expectZodValidationToFail(
      EditTitleAndDescriptionCommandValidation,
      validCommand,
      {
        payload: {
          ...validCommand.payload,
          title:
            'This is a very very very long title that should in no case be allowed, i said in no case !!!!!!!!!!!!!',
        },
      },
      [
        {
          path: ['payload', 'title'],
          message: 'Le titre ne doit pas dépasser 100 caractères',
        },
      ],
    )
  })

  it('does not allow empty description', () => {
    expectZodValidationToFail(
      EditTitleAndDescriptionCommandValidation,
      validCommand,
      {
        payload: { ...validCommand.payload, description: undefined },
      },
      [
        {
          path: ['payload', 'description'],
          message: 'Veuillez renseigner une description',
        },
      ],
    )
  })

  it('does not allow space only description', () => {
    expectZodValidationToFail(
      EditTitleAndDescriptionCommandValidation,
      validCommand,
      {
        payload: { ...validCommand.payload, description: '   ' },
      },
      [
        {
          path: ['payload', 'description'],
          message: 'Veuillez renseigner une description',
        },
      ],
    )
  })

  it('does not allow long description', () => {
    expectZodValidationToFail(
      EditTitleAndDescriptionCommandValidation,
      validCommand,
      {
        payload: {
          ...validCommand.payload,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae metus orci. Nam enim nulla, viverra vel ante vitae, tincidunt posuere quam. Donec vel lorem sit amet odio lobortis tincidunt. Praesent tempor arcu et iaculis tincidunt. Aliquam luctus faucibus tellus, vitae porta sem porta sit amet. Nullam nulla diam, aliquam sodales hendrerit ut, lacinia eget leo. Nullam at euismod magna. In hac habitasse platea dictumst. Nullam ullamcorper diam a ornare faucibus. Donec accumsan mollis quam a aliquet. In congue posuere elementum. Cras lorem sapien, finibus ac pulvinar vitae, maximus id lectus. Phasellus vel pharetra metus, in tempus eros. Donec elit enim, dictum vel rhoncus id, dapibus quis libero. Praesent at turpis consequat leo bibendum vestibulum. Nunc viverra purus dolor, eu feugiat lorem imperdiet ut. Quisque id ligula ut ligula tristique volutpat eget cursus est. Morbi nisi nulla, cursus non semper in, pellentesque vitae urna. Vestibulum suscipit velit dapibus massa eleifend interdum eu non justo. In fermentum, arcu eget dignissim dignissim, tellus dolor mollis dolor, sed fermentum massa mi ac risus. Suspendisse pellentesque, lectus eget efficitur aliquam, neque nisl luctus ipsum, et convallis mi sem tempus libero. Curabitur tempor nisi at gravida blandit',
        },
      },
      [
        {
          path: ['payload', 'description'],
          message: 'La description ne doit pas dépasser 560 caractères',
        },
      ],
    )
  })
})
