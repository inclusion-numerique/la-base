'use client'

import CroppedUploadModal from '@app/ui/components/CroppedUpload/CroppedUploadModal'
import { useDsfrModalIsBound } from '@app/ui/hooks/useDsfrModalIsBound'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import type { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { imageUploadHint } from '@app/web/server/rpc/image/imageValidation'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { type Dispatch, type SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import styles from './ResourceImageEdition.module.css'

const ResourceImageEditionModal = createModal({
  id: 'resource-image-edition',
  isOpenedByDefault: false,
})

// Ratio d'image de ressource: 1764/1260 ≈ 1.4
const RESOURCE_IMAGE_RATIO = 1764 / 1260

const ResourceImageEditionValidation = z.object({
  imageId: z.string().uuid().nullable().optional(),
})

type ResourceImageEditionData = z.infer<typeof ResourceImageEditionValidation>

const ResourceImageEdition = ({
  resource,
  sendCommand,
  setEditing,
  editing,
}: {
  resource: Pick<ResourceProjectionWithContext, 'id' | 'image'>
  sendCommand: SendCommand
  editing: string | null
  setEditing: Dispatch<SetStateAction<string | null>>
}) => {
  const { id, image } = resource

  const isEditingAnotherContent = !!editing && editing !== 'image'
  const form = useForm<ResourceImageEditionData>({
    resolver: zodResolver(ResourceImageEditionValidation),
    defaultValues: {
      imageId: image?.id ?? null,
    },
  })

  const modal = useDsfrModalIsBound(ResourceImageEditionModal.id)

  const onChange = async (imageId: string | null) => {
    if (imageId !== image?.id) {
      setEditing('image')
      await sendCommand({
        name: 'EditImage',
        payload: {
          imageId,
          resourceId: id,
        },
      })
      setEditing(null)
    }
    if (modal) {
      ResourceImageEditionModal.close()
    }
  }
  const label = image
    ? "Remplacer l'image de présentation"
    : 'Ajouter une image de présentation pour attirer les visiteurs'

  const fileFieldHint = imageUploadHint({ w: 1764, h: 1260 })
  const title = image
    ? "Modifier l'image de présentation"
    : 'Ajouter une image de présentation'

  return (
    <div className={image ? styles.container : styles.emptyContainer}>
      <CroppedUploadModal
        key={image?.id ?? 'empty'}
        form={form}
        path="imageId"
        title={title}
        modal={ResourceImageEditionModal}
        label="Image de présentation"
        height={180}
        size={{ w: 1764, h: 1260 }}
        ratio={RESOURCE_IMAGE_RATIO}
        round={false}
        onChange={onChange}
        image={image}
        inputTestId="resource-image-file-field"
        deleteTestId="resource-image-delete"
      />

      <div
        className={
          image ? styles.imageContainer : styles.imagePlaceholderContainer
        }
      >
        {image ? (
          <ResponsiveUploadedImage
            id={image.id}
            alt={image.altText ?? ''}
            data-testid="resource-image"
            breakpoints={[
              { media: '(min-width: 768px)', width: 300 },
              { media: '(min-width: 320px)', width: 650 },
              { media: '(max-width: 320px)', width: 300 },
            ]}
          />
        ) : (
          <Image
            src="/images/image-placeholder.svg"
            alt="Image vide"
            data-testid="resource-image-placeholder"
            width={56}
            height={56}
          />
        )}
      </div>

      <div className={styles.inputContainer}>
        <label className="fr-label fr-mb-1v" htmlFor={id}>
          {label}
        </label>
        <span className="fr-hint-text fr-mt-2v">{fileFieldHint}</span>

        <Button
          type="button"
          className="fr-btn fr-btn--secondary fr-mt-2w"
          size="small"
          onClick={ResourceImageEditionModal.open}
          disabled={isEditingAnotherContent}
          data-testid="resource-image-edit-button"
        >
          {title}
        </Button>
      </div>
    </div>
  )
}

export default ResourceImageEdition
