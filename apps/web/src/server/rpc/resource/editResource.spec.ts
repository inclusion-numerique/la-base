import { expectZodValidationToFail } from '@app/test/zodValidationTest'
import {
  EditResourceBase,
  EditResourceTitle,
  editResourceBaseValidation,
  editResourceTitleValidation,
} from './editResource'

const validTitleEdition: EditResourceTitle = {
  id: 'uuid',
  title: 'Hello',
  description: 'You',
}

const validBaseEdition: EditResourceBase = {
  id: 'uuid',
  baseId: 'uuid-base',
}

describe('editResourceTitleValidation', () => {
  it('allows valid value', () => {
    const result = editResourceTitleValidation.safeParse(validTitleEdition)
    expect(result.success).toEqual(true)
  })

  it('does not allow empty id', () => {
    expectZodValidationToFail(
      editResourceTitleValidation,
      validTitleEdition,
      { id: undefined },
      [{ path: ['id'], message: 'Required' }],
    )
  })

  it('does not allow empty title', () => {
    expectZodValidationToFail(
      editResourceTitleValidation,
      validTitleEdition,
      { title: undefined },
      [{ path: ['title'], message: 'Veuillez renseigner le titre' }],
    )
  })

  it('does not allow space only title', () => {
    expectZodValidationToFail(
      editResourceTitleValidation,
      validTitleEdition,
      { title: '   ' },
      [{ path: ['title'], message: 'Veuillez renseigner le titre' }],
    )
  })

  it('does not allow long title', () => {
    expectZodValidationToFail(
      editResourceTitleValidation,
      validTitleEdition,
      {
        title:
          'This is a very very very long title that should in no case be allowed, i said in no case !!!!!!!!!!!!!',
      },
      [
        {
          path: ['title'],
          message: 'Le titre ne doit pas dépasser 100 caractères',
        },
      ],
    )
  })

  it('does not allow empty description', () => {
    expectZodValidationToFail(
      editResourceTitleValidation,
      validTitleEdition,
      { description: undefined },
      [
        {
          path: ['description'],
          message: 'Veuillez renseigner une description',
        },
      ],
    )
  })

  it('does not allow space only description', () => {
    expectZodValidationToFail(
      editResourceTitleValidation,
      validTitleEdition,
      { description: '   ' },
      [
        {
          path: ['description'],
          message: 'Veuillez renseigner une description',
        },
      ],
    )
  })

  it('does not allow long description', () => {
    expectZodValidationToFail(
      editResourceTitleValidation,
      validTitleEdition,
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae metus orci. Nam enim nulla, viverra vel ante vitae, tincidunt posuere quam. Donec vel lorem sit amet odio lobortis tincidunt. Praesent tempor arcu et iaculis tincidunt. Aliquam luctus faucibus tellus, vitae porta sem porta sit amet. Nullam nulla diam, aliquam sodales hendrerit ut, lacinia eget leo. Nullam at euismod magna. In hac habitasse platea dictumst. Nullam ullamcorper diam a ornare faucibus. Donec accumsan mollis quam a aliquet. In congue posuere elementum. Cras lorem sapien, finibus ac pulvinar vitae, maximus id lectus. Phasellus vel pharetra metus, in tempus eros. Donec elit enim, dictum vel rhoncus id, dapibus quis libero. Praesent at turpis consequat leo bibendum vestibulum. Nunc viverra purus dolor, eu feugiat lorem imperdiet ut. Quisque id ligula ut ligula tristique volutpat eget cursus est. Morbi nisi nulla, cursus non semper in, pellentesque vitae urna. Vestibulum suscipit velit dapibus massa eleifend interdum eu non justo. In fermentum, arcu eget dignissim dignissim, tellus dolor mollis dolor, sed fermentum massa mi ac risus. Suspendisse pellentesque, lectus eget efficitur aliquam, neque nisl luctus ipsum, et convallis mi sem tempus libero. Curabitur tempor nisi at gravida blandit',
      },
      [
        {
          path: ['description'],
          message: 'La description ne doit pas dépasser 560 caractères',
        },
      ],
    )
  })
})

describe('editResourceBaseValidation', () => {
  it('allows valid value', () => {
    const result = editResourceBaseValidation.safeParse(validBaseEdition)
    expect(result.success).toEqual(true)
  })

  it('allows empty base', () => {
    const result = editResourceBaseValidation.safeParse({
      ...validBaseEdition,
      baseId: null,
    })
    expect(result.success).toEqual(true)
  })

  it('does not allow empty id', () => {
    expectZodValidationToFail(
      editResourceBaseValidation,
      validBaseEdition,
      { id: undefined },
      [{ path: ['id'], message: 'Required' }],
    )
  })
})
