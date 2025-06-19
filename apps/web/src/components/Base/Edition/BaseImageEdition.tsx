'use client'

import CroppedUploadModal from '@app/ui/components/CroppedUpload/CroppedUploadModal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { BasePageData } from '@app/web/server/bases/getBase'
import {
  type UpdateBaseImageCommand,
  UpdateBaseImageCommandValidation,
} from '@app/web/server/bases/updateBase'
import { trpc } from '@app/web/trpc'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import EditImageButton from '../../EditImageButton'
import styles from './BaseImageEdition.module.css'

const params = {
  image: {
    ratio: 1,
    height: 128,
    size: { w: 384, h: 384 },
    round: 'quarter' as const,
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
    size: { w: 2400, h: 500 },
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

const BaseImageEdition = ({
  base,
  type,
}: {
  base: BasePageData
  type: 'image' | 'coverImage'
}) => {
  const router = useRouter()
  const {
    title,
    modal,
    path,
    height,
    ratio,
    round,
    label,
    buttonClassName,
    size,
  } = params[type]

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
        key={image?.id ?? 'empty'}
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
        size={size}
      />
      <EditImageButton
        onClick={modal.open}
        title={title}
        className={buttonClassName}
      />
    </>
  )
}

export default withTrpc(BaseImageEdition)
