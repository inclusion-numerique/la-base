import { ResourceContent } from '@app/web/server/resources'

const SectionTitleContent = ({
  content: { title },
}: {
  content: ResourceContent
}) => <h1>{title}</h1>

export default SectionTitleContent
