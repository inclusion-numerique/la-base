import FileContentEdition from '@app/web/components/Resource/Contents/FileContentEdition'
import ImageContentEdition from '@app/web/components/Resource/Contents/ImageContentEdition'
import LinkContentEdition from '@app/web/components/Resource/Contents/LinkContentEdition'
import SectionTitleContentEdition from '@app/web/components/Resource/Contents/SectionTitleContentEdition'
import TextContentEdition from '@app/web/components/Resource/Contents/TextContentEdition'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import styles from '@app/web/components/Resource/Edition/ResourceEdition.module.css'
import type { AddContentCommand } from '@app/web/server/resources/feature/AddContent'
import {
  LinkPayload,
  SectionTitlePayload,
} from '@app/web/server/resources/feature/Content'
import { TextPayload } from '@app/web/server/resources/feature/Content'
import {
  type ClientContentPayload,
  ClientContentPayloadCommandValidation,
} from '@app/web/server/resources/feature/Content.client'
import type { EditContentCommand } from '@app/web/server/resources/feature/EditContent'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import type { ContentProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { removeNullAndUndefinedValues } from '@app/web/utils/removeNullAndUndefinedValues'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ContentType } from '@prisma/client'
import React, {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import { type UseFormReturn, useForm } from 'react-hook-form'

const ResourceContentForm = React.forwardRef(
  (
    {
      content,
      setEditing,
      sendCommand,
      resource,
      mode,
      type,
      'data-testid': dataTestId,
      index,
      onDelete,
    }: {
      type: ContentType
      resource: ResourceProjection
      setEditing: Dispatch<SetStateAction<string | null>>
      sendCommand: SendCommand
      'data-testid'?: string
      index: number
      onDelete: () => void | Promise<void>
    } & (
      | { mode: 'add'; content?: undefined }
      | { mode: 'edit'; content: ContentProjectionWithContext }
    ),
    contentFormButtonRef: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    if (mode === 'edit' && !content) {
      throw new Error('Content is required in edit mode')
    }
    const form = useForm<ClientContentPayload>({
      resolver: zodResolver(ClientContentPayloadCommandValidation),
      mode: 'onChange',
      defaultValues: {
        type,
        uploadFile: undefined,
        imageUploadFile: undefined,
        text: type === 'Text' ? '' : undefined,
        ...(content ? removeNullAndUndefinedValues(content) : null),
      },
    })

    const {
      handleSubmit,
      setError,
      formState: { isSubmitting, isDirty },
    } = form

    const onSubmit = async (data: ClientContentPayload) => {
      if (!isDirty) {
        // No change
        setEditing(null)
        return
      }

      const payloadData = { ...data }
      if ('uploadFile' in payloadData) {
        delete payloadData.uploadFile
      }
      if ('imageUploadFile' in payloadData) {
        delete payloadData.imageUploadFile
      }

      const payload: AddContentCommand['payload'] = {
        resourceId: resource.id,
        // index is 0 based while the order in db is 1 based, and we want to increase it by 1, so we need to add 2
        order: index + 2,
        ...payloadData,
      }

      try {
        const command =
          mode === 'add'
            ? ({
                name: 'AddContent',
                payload,
              } satisfies AddContentCommand)
            : ({
                name: 'EditContent',
                payload: { id: content.id, ...payload },
              } satisfies EditContentCommand)

        await sendCommand(command)
        setEditing(null)
      } catch (error) {
        applyZodValidationMutationErrorsToForm(error, setError)
      }
    }

    let formContent: ReactNode

    switch (type) {
      case 'SectionTitle': {
        formContent = (
          <SectionTitleContentEdition
            form={form as UseFormReturn<SectionTitlePayload>}
          />
        )
        break
      }
      case 'Text': {
        formContent = (
          <TextContentEdition form={form as UseFormReturn<TextPayload>} />
        )
        break
      }
      case 'Link': {
        formContent = (
          <LinkContentEdition form={form as UseFormReturn<LinkPayload>} />
        )
        break
      }
      case 'Image': {
        formContent = (
          <ImageContentEdition
            form={
              form as UseFormReturn<ClientContentPayload & { type: 'Image' }>
            }
            content={content}
          />
        )
        break
      }
      case 'File': {
        formContent = (
          <FileContentEdition
            form={
              form as UseFormReturn<ClientContentPayload & { type: 'File' }>
            }
            content={content}
          />
        )
        break
      }
      default: {
        throw new Error(`Invalid content type ${type}`)
      }
    }

    return (
      <form
        className="fr-py-2w"
        onSubmit={handleSubmit(onSubmit)}
        data-testid={dataTestId}
      >
        {formContent}
        <div className={styles.contentAction}>
          <Button
            data-testid={dataTestId && `${dataTestId}__submit`}
            priority="tertiary no outline"
            iconId="fr-icon-check-line"
            type="submit"
            size="small"
            disabled={isSubmitting}
            ref={contentFormButtonRef}
          >
            Valider
          </Button>
          <Button
            data-testid={dataTestId && `${dataTestId}__delete`}
            type="button"
            title="Supprimer le contenu"
            priority="tertiary no outline"
            iconId="fr-icon-delete-line"
            size="small"
            onClick={onDelete}
          />
        </div>
      </form>
    )
  },
)

ResourceContentForm.displayName = 'ResourceContentForm'

export default ResourceContentForm
