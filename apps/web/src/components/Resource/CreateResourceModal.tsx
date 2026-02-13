'use client'

import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'

export const CreateResourceDynamicModal = createDynamicModal({
  id: 'create-resource',
  isOpenedByDefault: false,
  initialState: {
    baseId: null as string | null,
  },
})

export const createResourceModalId =
  CreateResourceDynamicModal.buttonProps['aria-controls']

export const CreateResourceButton = ({
  className,
  titleClassName,
  baseId,
  'data-testid': dataTestid,
}: {
  className?: string
  titleClassName?: string
  baseId: string | null
  'data-testid'?: string
}) => {
  const open = CreateResourceDynamicModal.useOpen()
  const setState = CreateResourceDynamicModal.useSetState()

  return (
    <>
      {/* Desktop (lg+) — onClick ouvre la modale directement */}
      <div className="fr-hidden fr-unhidden-lg">
        <Button
          type="button"
          className={className}
          data-testid={dataTestid}
          onClick={() => open({ baseId })}
        >
          <span
            className={classNames(
              'ri-edit-box-line fr-mr-1w',
              'fr-hidden-lg',
              titleClassName,
            )}
            aria-hidden
          />
          Créer une ressource
          <span
            className={classNames(
              'ri-edit-box-line fr-ml-1w',
              'fr-hidden fr-unhidden-lg',
              titleClassName,
            )}
            aria-hidden
          />
        </Button>
      </div>
      {/* Mobile (< lg) — aria-controls laisse DSFR gérer la transition modale */}
      <button
        type="button"
        className={classNames('fr-btn fr-hidden-lg', className)}
        data-testid={dataTestid}
        data-fr-opened="false"
        aria-controls={createResourceModalId}
        onClick={() => setState({ baseId })}
      >
        <span
          className={classNames(
            'ri-edit-box-line fr-mr-1w',
            'fr-hidden-lg',
            titleClassName,
          )}
          aria-hidden
        />
        Créer une ressource
        <span
          className={classNames(
            'ri-edit-box-line fr-ml-1w',
            'fr-hidden fr-unhidden-lg',
            titleClassName,
          )}
          aria-hidden
        />
      </button>
    </>
  )
}
