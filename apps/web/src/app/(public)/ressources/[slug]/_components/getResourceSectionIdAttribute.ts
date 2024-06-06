import { createSlug } from '@app/web/utils/createSlug'

export const getResourceSectionIdAttribute = (
  { title }: { title: string | null },
  index: number,
) => `${(index + 1).toString(10)}${title ? `-${createSlug(title)}` : ''}`
