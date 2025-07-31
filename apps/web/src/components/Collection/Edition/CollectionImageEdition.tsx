'use client'

import type { CroppedImageType } from '@app/ui/components/CroppedUpload/utils'
import { createToast } from '@app/ui/toast/createToast'
import EditableCardForm from '@app/web/components/EditableCardForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useImageUpload } from '@app/web/hooks/useImageUpload'
import type { CollectionPageData } from '@app/web/server/collections/getCollection'
import {
  type UpdateCollectionImageCommand,
  UpdateCollectionImageCommandValidation,
} from '@app/web/server/collections/updateCollection'
import { trpc } from '@app/web/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Images from '../Images'
import ImageEdition from './ImageEdition'

const CollectionImageEdition = ({
  collection,
}: {
  collection: CollectionPageData
}) => {
  const form = useForm<UpdateCollectionImageCommand>({
    resolver: zodResolver(UpdateCollectionImageCommandValidation),
    defaultValues: {
      id: collection.id,
      imageId: collection.image?.id,
    },
  })

  const mutate = trpc.collection.updateImage.useMutation()

  const uploadImage = useImageUpload(form)

  const isLoading = form.formState.isSubmitting || mutate.isPending

  const [image, setImage] = useState<CroppedImageType | undefined>(
    collection.image ?? undefined,
  )

  const handleSave = async (data: UpdateCollectionImageCommand) => {
    const imageUploaded = await uploadImage(image, 'imageId')

    await mutate
      .mutateAsync({ ...data, imageId: imageUploaded?.id ?? null })
      .catch(() => {
        createToast({
          priority: 'error',
          message: 'Une erreur est survenue, merci de réessayer ultérieurement',
        })
      })
  }

  return (
    <EditableCardForm
      id="apercu"
      title="Aperçu de la collection"
      form={form}
      onSave={handleSave}
      preview={
        <Images
          resources={collection.resources.map(({ resource }) => resource)}
          image={collection.image}
        />
      }
      editing={
        <ImageEdition
          image={collection.image}
          control={form.control}
          disabled={isLoading}
          onChange={setImage}
          defaultImageType={collection.image ? 'image' : 'resources'}
        />
      }
    />
  )
}

export default withTrpc(CollectionImageEdition)
