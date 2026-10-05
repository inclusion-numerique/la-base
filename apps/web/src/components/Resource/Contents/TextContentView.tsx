import { addUserContentRelToLinks } from '@app/ui/utils/userContentLinks'
import type { ResourceContent } from '@app/web/server/resources/getResource'
import styles from './TextContentView.module.css'

const TextContentView = ({
  content: { text },
}: {
  content: Pick<ResourceContent, 'text'>
}) =>
  text ? (
    <div
      className={styles.text}
      dangerouslySetInnerHTML={{ __html: addUserContentRelToLinks(text) }}
    />
  ) : null

export default TextContentView
