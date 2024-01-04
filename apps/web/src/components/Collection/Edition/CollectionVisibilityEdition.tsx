'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import EditableCardForm from '@app/web/components/EditableCardForm'
import CustomTag, { TagColor } from '@app/web/components/CustomTag'
import VisibilityField from '@app/web/components/VisibilityField'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import {
  UpdateCollectionVisibilityCommand,
  UpdateCollectionVisibilityCommandValidation,
} from '@app/web/server/collections/updateCollection'
import { trpc } from '@app/web/trpc'

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
        collection.isPublic ? (
          <>
            <p>
              Votre collection est publique. Vous pouvez passer votre collection
              en privé si vous le souhaitez.
            </p>
            <CustomTag
              color={TagColor.GREEN}
              icon="fr-icon-earth-fill"
              label="Collection publique"
            />
          </>
        ) : (
          <>
            <p>
              Votre collection est privée. Vous pouvez passer votre collection
              en publique si vous le souhaitez.
            </p>
            <CustomTag
              color={TagColor.GREY}
              icon="fr-icon-lock-line"
              label="Collection privée"
            />
          </>
        )
      }
      editing={
        <VisibilityField
          model="collection"
          control={form.control}
          disabled={isLoading}
          publicTitle="Collection publique"
          privateTitle="Collection privée"
        />
      }
    />
  )
}

export default withTrpc(CollectionVisibilityEdition)
