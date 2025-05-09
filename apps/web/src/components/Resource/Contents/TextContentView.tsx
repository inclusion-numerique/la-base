import type { ResourceContent } from '@app/web/server/resources/getResource'
import styles from './TextContentView.module.css'

const TextContentView = ({
  content: { text },
}: {
  content: Pick<ResourceContent, 'text'>
}) =>
  text ? (
    // eslint-disable-next-line react/no-danger
    <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
  ) : null

export default TextContentView
