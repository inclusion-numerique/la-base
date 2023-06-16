import { ResourceContent } from '@app/web/server/resources/getResource'
import FileDetails from '@app/web/components/Resource/Contents/FileDetails'
import styles from './FileView.module.css'

const FileView = ({
  content: { title, file, caption },
}: {
  content: Pick<ResourceContent, 'title' | 'caption'> & {
    file: Exclude<ResourceContent['file'], null>
  }
}) => (
  <div data-testid="content-file">
    <h6 data-testid="content-file-title" className="fr-mb-0">
      {title}
    </h6>
    <div className={styles.fileContainer}>
      <FileDetails file={file} />
    </div>
    {!!caption && <p className="fr-mb-0 fr-mt-4v fr-text--sm">{caption}</p>}
  </div>
)

export default FileView
