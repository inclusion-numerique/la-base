import slugify from 'slugify'

slugify.extend({
  '&': 'et',
  "'": '-',
  '’': '-',
  ' : ': '-',
  ':': '-',
  '"': '',
  '.': '-',
  '❝': '',
  '❞': '',
  '“': '',
  '”': '',
  '«': '',
  '»': '',
  '(': '',
  ')': '',
  '[': '',
  ']': '',
  '{': '',
  '}': '',
  '¿': '',
  '?': '',
  '!': '',
  '/': '',
  '\\': '',
  ',': '-',
  ';': '-',
  '<': '',
  '>': '',
  '@': '-',
  '*': '',
  '+': ' plus ',
})

export const createSlug = (title: string) => slugify(title, { lower: true })
