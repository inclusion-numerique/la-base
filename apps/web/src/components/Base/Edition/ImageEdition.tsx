'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CroppedUploadModal from '@app/ui/components/CroppedUpload/CroppedUploadModal'
import { useRouter } from 'next/navigation'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { FilteredBase } from '@app/web/server/bases/authorization'
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
    className: styles.editImage,
    label: 'de la base',
    title: 'Modifier la photo de la base',
  },
  coverImage: {
    ratio: 4.8,
    height: 100,
    round: false,
    className: styles.editCoverImage,
    label: 'de la couverture',
    title: 'Modifier la photo de couverture',
  },
}

const ImageEdition = ({
  base,
  type,
}: {
  base: BasePageData | FilteredBase
  type: 'image' | 'coverImage'
}) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const form = useForm<UpdateBaseImageCmmand>({
    resolver: zodResolver(UpdateBaseImageCommandValidation),
    defaultValues: {
      [`${type}Id`]: base[type]?.id,
    },
  })

  const mutate = trpc.base.updateImage.useMutation()
  const param = params[type]
  return (
    <>
      <CroppedUploadModal
        form={form}
        path={`${type}Id`}
        open={open}
        onClose={() => setOpen(false)}
        label={param.label}
        height={param.height}
        ratio={param.ratio}
        round={param.round}
        onChange={async (imageId) => {
          if (imageId !== base[type]?.id) {
            await mutate.mutateAsync({
              id: base.id,
              [`${type}Id`]: imageId || null,
            } as UpdateBaseImageCmmand)
          }
          router.refresh()
          setOpen(false)
        }}
        initialImageId={base[type]?.id || ''}
      />
      <EditImageButton
        onClick={() => setOpen(true)}
        title={param.title}
        className={param.className}
      />
    </>
  )
}

export default withTrpc(ImageEdition)
