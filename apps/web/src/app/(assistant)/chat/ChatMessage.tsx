import type { AssistantChatMessage } from '@prisma/client'
import { CSSProperties } from 'react'
import classNames from 'classnames'
import styles from './ChatSession.module.css'
import { renderMarkdown } from '@app/web/app/(assistant)/chat/markdownRenderer'

const ChatMessage = ({
  message: { content, role },
  contentRef,
  style,
}: {
  message: Pick<AssistantChatMessage, 'content' | 'role'>
  contentRef?: React.RefObject<HTMLDivElement>
  style?: CSSProperties
}) => (
  <div className={styles.message} style={style}>
    <div className={classNames('fr-mb-2v fr-text--bold')}>
      {role === 'Assistant' ? 'Assistant' : 'Vous'}
    </div>
    <div
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  </div>
)

export default ChatMessage
