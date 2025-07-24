'use client'

import CroppedUpload from '@app/ui/components/CroppedUpload/CroppedUpload'
import type { CroppedImageType } from '@app/ui/components/CroppedUpload/utils'
import type { ImageForForm } from '@app/web/server/image/imageTypes'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import RadioButtons from '@codegouvfr/react-dsfr/RadioButtons'
import { useState } from 'react'
import { type Control, Controller, type Path } from 'react-hook-form'
import Images from '../Images'

const collectionImageCropModal = createModal({
  id: 'collection-image-crop-modal',
  isOpenedByDefault: false,
})

const ImageEdition = <T extends { imageId?: string | null }>({
  control,
  disabled,
  onChange,
  defaultImageType = 'resources',
  image,
}: {
  control: Control<T>
  disabled: boolean
  onChange: (data?: CroppedImageType) => void
  defaultImageType?: 'image' | 'resources'
  image?: ImageForForm | null
}) => {
  const [imageType, setImageType] = useState<'resources' | 'image'>(
    defaultImageType,
  )

  return (
    <div>
      <Controller
        control={control}
        name={'imageId' as Path<T>}
        render={({ fieldState: { error } }) =>
          imageType === 'image' ? (
            <CroppedUpload
              image={image}
              modal={collectionImageCropModal}
              disabled={disabled}
              ratio={1.66}
              height={195}
              size={{ w: 1764, h: 1060 }}
              onChange={onChange}
              error={error?.message}
            />
          ) : (
            <Images resources={[]} />
          )
        }
      />
      <RadioButtons
        disabled={disabled}
        className="fr-mt-3w"
        legend="L’aperçu de votre collection"
        orientation="horizontal"
        options={[
          {
            label: 'Aperçu des ressources',
            nativeInputProps: {
              checked: imageType === 'resources',
              onChange: () => {
                onChange({ id: undefined })
                setImageType('resources')
              },
            },
          },
          {
            label: 'Importer un visuel',
            nativeInputProps: {
              checked: imageType === 'image',
              onChange: () => {
                setImageType('image')
              },
            },
          },
        ]}
      />
    </div>
  )
}

export default ImageEdition
