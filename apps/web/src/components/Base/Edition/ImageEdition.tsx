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
  UpdateBaseImageCommand,
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
    label: 'Image de la base',
    title: 'Modifier l’image de la base',
    path: 'imageId' as const,
    modal: createModal({
      id: 'base-image-edition',
      isOpenedByDefault: false,
    }),
  },
  coverImage: {
    ratio: 4.8,
    height: 100,
    round: false,
    buttonClassName: styles.editCoverImage,
    label: 'Image de couverture',
    title: 'Modifier l’image de couverture',
    path: 'coverImageId' as const,
    modal: createModal({
      id: 'base-cover-image-edition',
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
  const { title, modal, path, height, ratio, round, label, buttonClassName } =
    params[type]

  const image = base[type]

  const form = useForm<UpdateBaseImageCommand>({
    resolver: zodResolver(UpdateBaseImageCommandValidation),
    defaultValues: {
      id: base.id,
      [path]: base[type]?.id,
    },
  })

  const mutate = trpc.base.updateImage.useMutation()

  const onChange = async (imageId: string | null) => {
    if (imageId !== base[type]?.id) {
      await mutate.mutateAsync({
        id: base.id,
        [path]: imageId || null,
      } as UpdateBaseImageCommand)
    }
    modal.close()
    router.refresh()
  }

  return (
    <>
      <CroppedUploadModal
        title={title}
        modal={modal}
        form={form}
        path={path}
        label={label}
        height={height}
        ratio={ratio}
        round={round}
        image={image}
        onChange={onChange}
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
