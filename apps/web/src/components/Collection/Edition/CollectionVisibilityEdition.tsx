'use client'

import EditableCardForm from '@app/web/components/EditableCardForm'
import Visibility from '@app/web/components/Visibility'
import VisibilityField from '@app/web/components/VisibilityField'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { CollectionPageData } from '@app/web/server/collections/getCollection'
import {
  type UpdateCollectionVisibilityCommand,
  UpdateCollectionVisibilityCommandValidation,
} from '@app/web/server/collections/updateCollection'
import { trpc } from '@app/web/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const visibilityTexts = (base: { id: string } | null) => ({
  publicTitle: 'Collection publique',
  privateTitle: 'Collection privée',
  publicHint: 'Visible par tous les visiteurs.',
  privateHint: base
    ? 'Visible uniquement par les membres de votre base.'
    : 'Visible uniquement par vous.',
})

const CollectionVisibilityEdition = ({
  collection,
}: {
  collection: CollectionPageData
}) => {
  const form = useForm<UpdateCollectionVisibilityCommand>({
    resolver: zodResolver(UpdateCollectionVisibilityCommandValidation),
    defaultValues: {
      id: collection.id,
      isPublic: collection.isPublic,
    },
  })

  const mutate = trpc.collection.updateVisibility.useMutation()

  const isLoading = form.formState.isSubmitting || mutate.isPending

  const handleSave = async (data: UpdateCollectionVisibilityCommand) => {
    await mutate.mutateAsync(data)
  }

  return (
    <EditableCardForm
      id="visibilite"
      title="Visibilité de la collection"
      subtitle="Choisissez la visibilité de votre collection."
      form={form}
      onSave={handleSave}
      preview={
        <Visibility
          isPublic={collection.isPublic}
          {...visibilityTexts(collection.base)}
        />
      }
      editing={
        <VisibilityField
          model="collection"
          path="isPublic"
          control={form.control}
          disabled={isLoading}
          {...visibilityTexts(collection.base)}
        />
      }
    />
  )
}

export default withTrpc(CollectionVisibilityEdition)
