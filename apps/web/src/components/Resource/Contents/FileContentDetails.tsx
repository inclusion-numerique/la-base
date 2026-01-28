'use client'

import { formatByteSize } from '@app/ui/utils/formatByteSize'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { getStorageUrl } from '@app/web/features/uploads/storage/getStorageUrl'
import { mimeTypesDisplayableInBrowser } from '@app/web/features/uploads/storage/mimeTypesDisplayableInBrowser'
import type { ContentProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { trpc } from '@app/web/trpc'
import classNames from 'classnames'
import styles from './FileContentDetails.module.css'

const FileContentDetails = ({
  file: { name, size, key, mimeType },
  className,
  contentId,
}: {
  file: Pick<
    Exclude<ContentProjectionWithContext['file'], null>,
    'name' | 'size' | 'key' | 'mimeType'
  >
  className?: string
  contentId?: string
  fileDownloadCount?: number | null
  filePreviewCount?: number | null
}) => {
  const trackEvent = trpc.content.trackEvent.useMutation()

  const handleDownloadClick = () => {
    if (contentId) {
      trackEvent.mutate({ contentId, type: 'fileDownload' })
    }
  }

  const handlePreviewClick = () => {
    if (contentId) {
      trackEvent.mutate({ contentId, type: 'filePreview' })
    }
  }

  return (
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
          title={name}
        >
          {name}
        </span>
        <span className="fr-hint-text">·&nbsp;{formatByteSize(size)}</span>
      </div>
      <div className={styles.actions}>
        <a
          className={classNames(
            'fr-hidden-md fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-download-line',
          )}
          href={getStorageUrl({ key })}
          title="Télécharger le fichier"
          download={name}
          target="_blank"
          rel="noreferrer"
          onClick={handleDownloadClick}
        >
          Télécharger
        </a>
        <a
          className={classNames(
            'fr-hidden fr-unhidden-md fr-btn--icon-right fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-download-line',
          )}
          href={getStorageUrl({ key })}
          title="Télécharger le fichier"
          download={name}
          target="_blank"
          rel="noreferrer"
          onClick={handleDownloadClick}
        >
          Télécharger
        </a>
        {mimeTypesDisplayableInBrowser.has(mimeType) && (
          <>
            <a
              className={classNames(
                'fr-ml-1w fr-hidden-md fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-eye-line',
                styles.externalLinkWithIcon,
              )}
              href={getStorageUrl({ key })}
              title="Voir le fichier dans un nouvel onglet"
              target="_blank"
              rel="noreferrer"
              onClick={handlePreviewClick}
            >
              Aperçu
            </a>
            <a
              className={classNames(
                'fr-ml-1w fr-hidden fr-unhidden-md fr-btn--icon-right fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-eye-line',
                styles.externalLinkWithIcon,
              )}
              href={getStorageUrl({ key })}
              title="Voir le fichier dans un nouvel onglet"
              target="_blank"
              rel="noreferrer"
              onClick={handlePreviewClick}
            >
              Aperçu
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default withTrpc(FileContentDetails)
