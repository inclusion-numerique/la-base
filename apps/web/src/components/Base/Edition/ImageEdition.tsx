'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CroppedUploadModal from '@app/ui/components/CroppedUpload/CroppedUploadModal'
import { useRouter } from 'next/navigation'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { BasePageData } from '@app/web/server/bases/getBase'
import {
  UpdateBaseImageCmmand,
  UpdateBaseImageCommandValidation,
} from '@app/web/server/bases/updateBase'
import EditImageButton from '../../EditImageButton'
import styles from './ImageEdition.module.css'

const params = {
  image: {
    ratio: 1,
    height: 128,
    round: true,
    buttonClassName: styles.editImage,
    label: 'de la base',
    title: 'Modifier la photo de la base',
    modal: createModal({
      id: 'baseImageEdition',
      isOpenedByDefault: false,
    }),
  },
  coverImage: {
    ratio: 4.8,
    height: 100,
    round: false,
    buttonClassName: styles.editCoverImage,
    label: 'de la couverture',
    title: 'Modifier la photo de couverture',
    modal: createModal({
      id: 'baseCoverImageEdition',
      isOpenedByDefault: false,
    }),
  },
}

const ImageEdition = ({
  base,
  type,
}: {
  base: BasePageData
  type: 'image' | 'coverImage'
}) => {
  const router = useRouter()

  const form = useForm<UpdateBaseImageCmmand>({
    resolver: zodResolver(UpdateBaseImageCommandValidation),
    defaultValues: {
      [`${type}Id`]: base[type]?.id,
    },
  })

  const mutate = trpc.base.updateImage.useMutation()
  const { title, modal, height, ratio, round, label, buttonClassName } =
    params[type]

  const image = base[type]

  // TODO use image to initialize crop parameters
  console.log('IMAGE', image)

  return (
    <>
      <CroppedUploadModal
        title={title}
        modal={modal}
        form={form}
        path={`${type}Id`}
        label={label}
        height={height}
        ratio={ratio}
        round={round}
        onChange={async (imageId) => {
          if (imageId !== base[type]?.id) {
            await mutate.mutateAsync({
              id: base.id,
              [`${type}Id`]: imageId || null,
            } as UpdateBaseImageCmmand)
          }
          router.refresh()
          modal.close()
        }}
        initialImageId={base[type]?.id || ''}
      />
      <EditImageButton
        onClick={modal.open}
        title={title}
        className={buttonClassName}
      />
    </>
  )
}

export default withTrpc(ImageEdition)
