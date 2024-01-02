import sanitizeHtml from 'sanitize-html'
import { ResourceContent } from '@app/web/server/resources/getResource'
import styles from './TextContentView.module.css'

const TextContentView = ({
  content: { text },
}: {
  content: Pick<ResourceContent, 'text'>
}) =>
  text ? (
    <div
      className={styles.text}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
    />
  ) : null

export default TextContentView
