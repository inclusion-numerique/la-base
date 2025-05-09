import FileContentDetails from '@app/web/components/Resource/Contents/FileContentDetails'
import type { ResourceContent } from '@app/web/server/resources/getResource'
import styles from './FileContentView.module.css'

const FileContentView = ({
  content: { title, file, caption },
}: {
  content: Pick<ResourceContent, 'title' | 'caption'> & {
    file: Exclude<ResourceContent['file'], null>
  }
}) => (
  <div data-testid="content-file">
    <h2 data-testid="content-file-title" className="fr-mb-4v fr-h6">
      {title}
    </h2>
    <div className={styles.fileContainer}>
      <FileContentDetails file={file} />
    </div>
    {!!caption && <p className="fr-mb-0 fr-mt-4v fr-text--sm">{caption}</p>}
  </div>
)

export default FileContentView
