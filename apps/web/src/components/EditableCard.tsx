'use client'

import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import Card from '@app/web/components/Card'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import styles from './EditCard.module.css'

const EditableCard = ({
  id,
  title,
  titleAs: CardTitle = 'h3',
  subtitle,
  preview,
  className,
  noBorder = true,
  editing,
  editModeState,
  disabled,
}: {
  id: string
  title: ReactNode
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  subtitle?: ReactNode
  preview: ReactNode
  className?: string
  noBorder?: boolean
  editing: ReactNode
  editModeState: [boolean, Dispatch<SetStateAction<boolean>>]
  disabled: boolean
}) => {
  const [isEditMode, setEditMode] = editModeState

  const toggleEditMode = () => setEditMode(!isEditMode)

  return (
    <Card
      id={id}
      className={classNames(className, 'fr-border-radius--8 fr-border')}
      noBorder={noBorder}
      title={
        <div className="fr-flex fr-direction-column fr-direction-sm-row fr-justify-content-space-between fr-align-items-sm-center fr-flex-gap-3v">
          <CardTitle className="fr-mb-0 fr-h5 fr-text-label--blue-france">
            {title}
          </CardTitle>
          <div className="fr-hidden fr-unhidden-sm">
            {!isEditMode && (
              <Button
                data-testid={`${id}-edit-card-button`}
                className="fr-text--sm fr-text--medium fr-p-1v"
                size="small"
                priority="tertiary no outline"
                onClick={toggleEditMode}
              >
                Modifier
                <span className="fr-icon-edit-line fr-ml-1w fr-icon--sm" />
              </Button>
            )}
          </div>
        </div>
      }
      description={
        <>
          {subtitle}
          <div className="fr-hidden-sm fr-unhidden">
            <div className="fr-flex fr-justify-content-sm-center fr-justify-content-end">
              {!isEditMode && (
                <Button
                  data-testid={`${id}-edit-card-button`}
                  className="fr-text--sm fr-text--medium"
                  size="small"
                  priority="tertiary no outline"
                  onClick={toggleEditMode}
                >
                  Modifier
                  <span className="fr-icon-edit-line fr-ml-1w fr-icon--sm" />
                </Button>
              )}
            </div>
          </div>
        </>
      }
      titleAs="div"
      contentSeparator
    >
      {isEditMode && editing && <>{editing}</>}
      {!isEditMode && preview && <>{preview}</>}
      {isEditMode && (
        <div className="fr-card__footer">
          <div className="fr-flex fr-direction-column-reverse fr-direction-sm-row fr-justify-content-end fr-flex-gap-4v">
            <Button
              priority="secondary"
              className={classNames(
                styles.button,
                buttonLoadingClassname(disabled),
              )}
              disabled={disabled}
              onClick={() => setEditMode(false)}
            >
              Annuler
            </Button>
            <Button
              priority="primary"
              className={classNames(
                styles.button,
                buttonLoadingClassname(disabled),
              )}
              type="submit"
              disabled={disabled}
              nativeButtonProps={{
                'data-testid': 'editable-card-form-save-button',
                form: `${id}-form`,
              }}
            >
              Enregistrer
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

export default EditableCard
