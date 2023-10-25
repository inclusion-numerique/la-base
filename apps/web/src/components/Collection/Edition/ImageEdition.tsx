'use client'

import React, { useState } from 'react'
import { Control, Controller, Path } from 'react-hook-form'
import RadioButtons from '@codegouvfr/react-dsfr/RadioButtons'
import CroppedUpload from '@app/ui/components/CroppedUpload/CroppedUpload'
import { CroppedImageType } from '@app/ui/components/CroppedUpload/utils'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Images from '../Images'

const collectionImageCropModal = createModal({
  id: 'collection-image-crop-modal',
  isOpenedByDefault: false,
})

const ImageEdition = <T extends { imageId?: string | null }>({
  control,
  disabled,
  onChange,
}: {
  control: Control<T>
  disabled: boolean
  onChange: (data?: CroppedImageType) => void
}) => {
  const [imageType, setImageType] = useState<'resources' | 'image'>('resources')

  return (
    <div>
      <RadioButtons
        disabled={disabled}
        className="fr-mb-2w"
        legend="L’aperçu de votre collection"
        orientation="horizontal"
        options={[
          {
            label: 'Aperçu des ressources',
            nativeInputProps: {
              checked: imageType === 'resources',
              onChange: () => setImageType('resources'),
            },
          },
          {
            label: 'Importer un visuel',
            nativeInputProps: {
              checked: imageType === 'image',
              onChange: () => setImageType('image'),
            },
          },
        ]}
      />
      <Controller
        control={control}
        name={'imageId' as Path<T>}
        render={({ fieldState: { error } }) =>
          imageType === 'image' ? (
            <CroppedUpload
              modal={collectionImageCropModal}
              disabled={disabled}
              ratio={2}
              height={195}
              onChange={onChange}
              error={error?.message}
            />
          ) : (
            <Images />
          )
        }
      />
    </div>
  )
}

export default ImageEdition
