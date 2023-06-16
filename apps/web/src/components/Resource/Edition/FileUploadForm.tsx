import FileFormField from '@app/ui/components/Form/FileFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import React, { useEffect } from 'react'
import { Control, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import classNames from 'classnames'
import { UseFileUploadReturn } from '@app/web/hooks/useFileUpload'
import ProgressBar from '@app/web/ui/ProgressBar'
import styles from './FileUploadForm.module.css'

const FileUploadForm = <T extends FieldValues>({
  className,
  label,
  onDelete,
  deleteButtonTitle,
  deleteButtonTestId,
  fileUpload: { uploading, progressEmitter, abort },
  disabled,
  fileFieldHint,
  canDelete,
  control,
  error: errorProp,
  path,
}: {
  label: string
  onDelete?: () => void
  fileUpload: UseFileUploadReturn
  deleteButtonTitle?: string
  fileFieldHint?: string
  deleteButtonTestId?: string
  className?: string
  disabled?: boolean
  canDelete?: boolean
  error?: string
  control: Control<T>
  path: FieldPath<T>
}) => {
  const [progress, setProgress] = React.useState<number | null>(null)

  useEffect(() => {
    const callback = (progressEvent: number) => {
      setProgress(progressEvent)
    }

    progressEmitter.addListener('progress', callback)

    return () => {
      progressEmitter.removeListener('progress', callback)
    }
  }, [progressEmitter])

  return (
    <div className={className}>
      <div
        className={classNames(
          styles.progressSection,
          !uploading && 'fr-hidden',
        )}
      >
        <p className="fr-label">
          Chargement en cours...
          <span className="fr-hint-text fr-mt-2v">{fileFieldHint}</span>
        </p>
        <div className={styles.progressContainer}>
          <ProgressBar progress={progress} />
          <div className={styles.progressFooter}>
            <p className="fr-text--sm">{progress || 24}%</p>
            <Button
              iconId="fr-icon-close-circle-line"
              size="small"
              type="button"
              iconPosition="right"
              priority="tertiary no outline"
              onClick={abort}
            >
              Annuler
            </Button>
          </div>
        </div>
      </div>
      {/* We have to keep the input field even when uploading to avoid losing the file input value */}
      <div
        className={classNames(styles.inputSection, uploading && 'fr-hidden')}
      >
        <FileFormField
          label={label}
          hint={fileFieldHint}
          data-testid="resource-image-file-field"
          control={control}
          path={path}
          disabled={disabled}
          error={errorProp}
        />
        {canDelete && (
          <Button
            iconId="fr-icon-delete-bin-line"
            type="button"
            size="small"
            title={deleteButtonTitle ?? 'Supprimer le fichier'}
            priority="tertiary no outline"
            onClick={onDelete}
            disabled={disabled}
            nativeButtonProps={{
              'data-testid': deleteButtonTestId,
            }}
          />
        )}
      </div>
    </div>
  )
}

export default FileUploadForm
