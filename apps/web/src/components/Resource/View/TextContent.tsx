import { ResourceContent } from '@app/web/server/resources'
import sanitizeHtml from 'sanitize-html'
import { ContentSeparator } from '@app/web/components/Resource/View/ContentSeparator'

const TextContent = ({
  content: { text },
}: {
  content: Pick<ResourceContent, 'text'>
}) =>
  text ? (
    <>
      {/* TODO Sanitize when creating / updating Text content, not on render !  */}
      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }} />
      <ContentSeparator />
    </>
  ) : null

export default TextContent
