import { formatByteSize } from '@app/ui/utils/formatByteSize'
import classNames from 'classnames'
import { ResourceContent } from '@app/web/server/resources/getResource'
import DownloadFileButton from '@app/web/components/Resource/Contents/DownloadFileButton'
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
      <span
        className={classNames('fr-icon-file-pdf-line fr-mr-1w', styles.icon)}
      />
      <span
        className={classNames(
          'fr-text--medium fr-text--sm fr-mr-1w fr-mb-0',
          styles.name,
        )}
      >
        {file.name}
      </span>
      <span className="fr-hint-text">·&nbsp;{formatByteSize(file.size)}</span>
      <span style={{ flexGrow: 1 }} />

      <DownloadFileButton
        fileKey={file.key}
        filename={file.name}
        size="small"
        type="button"
        iconId="fr-icon-download-line"
        priority="tertiary no outline"
        title="Télécharger le fichier"
        className="fr-hidden-lg"
      />
      <DownloadFileButton
        fileKey={file.key}
        filename={file.name}
        size="small"
        type="button"
        iconId="fr-icon-download-line"
        iconPosition="right"
        priority="tertiary no outline"
        className="fr-hidden fr-unhidden-lg"
      >
        Télécharger
      </DownloadFileButton>
    </div>
    {!!caption && <p className="fr-mb-0 fr-mt-4v fr-text--sm">{caption}</p>}
  </div>
)

export default FileView
