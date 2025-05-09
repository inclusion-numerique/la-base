import { createSlug } from '@app/web/utils/createSlug'
import { v4 } from 'uuid'

export const createTestIdTitleAndSlug = (title: string) => {
  const id = v4()
  const titleData = `${title} - Test ${id}`
  const slug = createSlug(titleData)

  return { id, title: titleData, slug, titleDuplicationCheckSlug: slug }
}
