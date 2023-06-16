import classNames from 'classnames'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import { ContentProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { getDownloadUrl } from '@app/web/utils/getDownloadUrl'
import styles from './FileDetails.module.css'

const FileDetails = ({
  file: { name, size, key },
  className,
}: {
  file: Pick<
    Exclude<ContentProjectionWithContext['file'], null>,
    'name' | 'size' | 'key'
  >
  className?: string
}) => (
  <div className={classNames(styles.container, className)}>
    <div className={styles.nameAndSize}>
      <span
        className={classNames('fr-icon-file-pdf-line fr-mr-1w', styles.icon)}
      />
      <span
        className={classNames(
          'fr-text--medium fr-text--sm fr-mr-1w fr-mb-0',
          styles.name,
        )}
      >
        {name}
      </span>
      <span className="fr-hint-text">·&nbsp;{formatByteSize(size)}</span>
    </div>
    <div className={styles.actions}>
      {/* Using <a/> element to disable prefetch on files */}
      {/* We have to double the elements because of responsive styles constraints for mobile (icon) and desktop (label) */}
      <a
        className={classNames(
          'fr-hidden-md fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-download-line',
        )}
        href={getDownloadUrl(key, { download: true })}
        title="Télécharger le fichier"
      >
        Télécharger
      </a>
      <a
        className={classNames(
          'fr-hidden fr-unhidden-md fr-btn--icon-right fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-download-line',
        )}
        href={getDownloadUrl(key, { download: true })}
        title="Télécharger le fichier"
      >
        Télécharger
      </a>
      <a
        className={classNames(
          'fr-ml-1w fr-hidden-md fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-eye-line',
          styles.externalLinkWithIcon,
        )}
        href={getDownloadUrl(key)}
        title="Voir le fichier dans un nouvel onglet"
        target="_blank"
      >
        Aperçu
      </a>
      <a
        className={classNames(
          'fr-ml-1w fr-hidden fr-unhidden-md fr-btn--icon-right fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-eye-line',
          styles.externalLinkWithIcon,
        )}
        href={getDownloadUrl(key)}
        title="Voir le fichier dans un nouvel onglet"
        target="_blank"
      >
        Aperçu
      </a>
    </div>
  </div>
)

export default FileDetails
