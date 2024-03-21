import React from 'react'
import { Upload } from '@codegouvfr/react-dsfr/Upload'
import {
  imageAllowedMimeTypes,
  imageUploadHint,
} from '@app/web/server/rpc/image/imageValidation'
import { ImageWithName } from '@app/ui/components/CroppedUpload/utils'

const UploadImage = ({
  label,
  disabled,
  error,
  imageToUpload,
  onRemove,
  onUpload,
  size,
}: {
  label?: string
  disabled?: boolean
  error?: string
  imageToUpload: ImageWithName | null
  onRemove: () => void
  onUpload: (file: ImageWithName) => void
  size?: { w: number; h: number }
}) => (
  <>
    <Upload
      disabled={disabled}
      state={error ? 'error' : 'default'}
      stateRelatedMessage={error}
      label={label}
      hint={imageUploadHint(size)}
      nativeInputProps={{
        value: imageToUpload ? imageToUpload.filename : '',
        accept: imageAllowedMimeTypes.join(','),
        onChange: (event) => {
          const { files, value } = event.target
          if (!files) {
            onRemove()
            return
          }
          const file = files[0] as ImageWithName
          if (file) {
            file.filename = value
          }
          onUpload(file)
        },
      }}
    />
  </>
)

export default UploadImage
