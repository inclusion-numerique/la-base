import slugify from 'slugify'

slugify.extend({ '&': 'et', "'": '-', '’': '-' })

export const createSlug = (title: string) => slugify(title, { lower: true })
