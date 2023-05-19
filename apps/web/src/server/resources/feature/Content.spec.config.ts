import { AddContentCommand } from './AddContent'
import { EditContentCommand } from './EditContent'

export const sectionTitleFailUseCases = (
  base: AddContentCommand | EditContentCommand,
) => [
  {
    name: 'fails with no title',
    values: {
      payload: {
        ...base.payload,
        title: undefined,
      },
    },
    errors: [
      {
        path: ['payload', 'title'],
        message: 'Veuillez renseigner le titre',
      },
    ],
  },
  {
    name: 'fails with empty title',
    values: {
      payload: {
        ...base.payload,
        title: ' ',
      },
    },
    errors: [
      {
        path: ['payload', 'title'],
        message: 'Veuillez renseigner le titre',
      },
    ],
  },
  {
    name: 'fails with too long title',
    values: {
      payload: {
        ...base.payload,
        title: Array.from({ length: 101 }, () => 'a').join(''),
      },
    },
    errors: [
      {
        path: ['payload', 'title'],
        message: 'Le titre ne doit pas dépasser 100 caractères',
      },
    ],
  },
]

export const textFailUseCases = (
  base: AddContentCommand | EditContentCommand,
) => [
  {
    name: 'fails with no text',
    values: {
      payload: {
        ...base.payload,
        text: undefined,
      },
    },
    errors: [
      {
        path: ['payload', 'text'],
        message: 'Veuillez renseigner le texte',
      },
    ],
  },
  {
    name: 'fails with empty text',
    values: {
      payload: {
        ...base.payload,
        text: ' ',
      },
    },
    errors: [
      {
        path: ['payload', 'text'],
        message: 'Veuillez renseigner le texte',
      },
    ],
  },
]
