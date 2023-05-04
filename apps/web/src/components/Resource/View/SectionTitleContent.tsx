import { ResourceContent } from '@app/web/server/resources'
import { createSlug } from '@app/web/utils/createSlug'

const SectionTitleContent = ({
  content: { title },
}: {
  content: ResourceContent
}) => (title ? <h1 id={createSlug(title)}>{title}</h1> : null)

export default SectionTitleContent
