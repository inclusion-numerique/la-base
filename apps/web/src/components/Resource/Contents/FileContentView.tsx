import ContentMetrics from '@app/web/components/Resource/Contents/ContentMetrics'
import FileContentDetails from '@app/web/components/Resource/Contents/FileContentDetails'
import type { ResourceContent } from '@app/web/server/resources/getResource'
import styles from './FileContentView.module.css'

const FileContentView = ({
  content: { id, title, file, caption, fileDownloadCount, filePreviewCount },
}: {
  content: Pick<ResourceContent, 'id' | 'title' | 'caption'> & {
    file: Exclude<ResourceContent['file'], null>
    fileDownloadCount?: number | null
    filePreviewCount?: number | null
  }
}) => (
  <div data-testid="content-file">
    <h2 data-testid="content-file-title" className="fr-mb-4v fr-h6">
      {title}
    </h2>
    <div className={styles.fileContainer}>
      <FileContentDetails file={file} contentId={id} />
    </div>
    <ContentMetrics
      type="file"
      downloadCount={fileDownloadCount ?? null}
      previewCount={filePreviewCount ?? null}
    />
    {!!caption && <p className="fr-mb-0 fr-mt-4v fr-text--sm">{caption}</p>}
  </div>
)

export default FileContentView
