'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import RichInputFormField from '@app/ui/components/Form/RichInputFormField'
import EditableCardForm from '@app/web/components/EditableCardForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  collectionDescriptionMaxLength,
  collectionTitleMaxLength,
} from '@app/web/server/collections/collectionConstraints'
import type { CollectionPageData } from '@app/web/server/collections/getCollection'
import {
  type UpdateCollectionInformationsCommand,
  UpdateCollectionInformationsCommandValidation,
} from '@app/web/server/collections/updateCollection'
import { trpc } from '@app/web/trpc'
import { LabelAndValue } from '@app/web/ui/LabelAndValue'
import { htmlToText } from '@app/web/utils/htmlToText'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const titleInfo = (title?: string | null) =>
  `${title?.length ?? 0}/${collectionTitleMaxLength} caractères`

const descriptionInfo = (description?: string | null) =>
  `${
    description ? htmlToText(description).length : 0
  }/${collectionDescriptionMaxLength} caractères`

const CollectionInformationsEdition = ({
  collection,
}: {
  collection: CollectionPageData
}) => {
  const form = useForm<UpdateCollectionInformationsCommand>({
    resolver: zodResolver(UpdateCollectionInformationsCommandValidation),
    defaultValues: {
      id: collection.id,
      title: collection.title,
      description: collection.description ?? undefined,
    },
  })

  const mutate = trpc.collection.updateInformations.useMutation()
  const router = useRouter()

  const handleSave = async (data: UpdateCollectionInformationsCommand) => {
    const updated = await mutate.mutateAsync(data)
    router.push(`/collections/${updated.slug}/modifier`)
  }

  return (
    <EditableCardForm
      id="informations"
      title="Informations de la collection"
      form={form}
      onSave={handleSave}
      preview={
        <>
          <LabelAndValue
            className="fr-mb-2w"
            value={collection.title}
            inline={false}
            as="div"
          >
            Nom de la collection
          </LabelAndValue>
          <LabelAndValue value={collection.description} inline={false} as="div">
            Description
          </LabelAndValue>
        </>
      }
      editing={
        <>
          <InputFormField
            data-testid="collection-title-input"
            control={form.control}
            path="title"
            label="Nom de la collection"
            disabled={form.formState.isSubmitting}
            asterisk
            info={titleInfo}
          />
          <RichInputFormField
            menuBar={false}
            data-testid="collection-description-input"
            disabled={form.formState.isSubmitting}
            label="Description"
            hint="Text de description additionnel"
            form={form}
            path="description"
            info={descriptionInfo}
            size="small"
            allowHeadings={false}
          />
        </>
      }
    />
  )
}

export default withTrpc(CollectionInformationsEdition)
