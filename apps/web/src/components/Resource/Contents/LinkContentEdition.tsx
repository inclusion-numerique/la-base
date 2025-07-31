'use client'

import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import DynamicLinkContentEditionPreview from '@app/web/components/Resource/Contents/DynamicLinkContentEditionPreview'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { LinkPayload } from '@app/web/server/resources/feature/Content'
import type { Metadata } from '@app/web/server/rpc/metadata/getMetadataFromDocument'
import {
  contentCaptionMaxLength,
  contentTitleMaxLength,
} from '@app/web/server/rpc/resource/utils'
import type { UseFormReturn } from 'react-hook-form'

const titleInfo = (title?: string | null) =>
  `${title?.length ?? 0}/${contentTitleMaxLength} caractères`

const captionInfo = (caption?: string | null) =>
  `${caption?.length ?? 0}/${contentCaptionMaxLength} caractères`

const LinkContentEdition = ({
  form: { watch, setValue, getFieldState, control },
}: {
  form: UseFormReturn<LinkPayload>
}) => {
  const showPreview = watch('showPreview')
  const url = watch('url')
  const linkTitle = watch('linkTitle')
  const linkDescription = watch('linkDescription')
  const linkImageUrl = watch('linkImageUrl')
  const linkFaviconUrl = watch('linkFaviconUrl')
  const urlValid = !!url && !getFieldState('url').invalid

  const onMetadataUpdate = (metadata: Metadata) => {
    setValue('linkDescription', metadata.description, {
      shouldDirty: true,
    })
    setValue('linkTitle', metadata.title, {
      shouldDirty: true,
    })
    setValue('linkImageUrl', metadata.imageUrl, {
      shouldDirty: true,
    })
    setValue('linkFaviconUrl', metadata.faviconUrl, {
      shouldDirty: true,
    })
  }

  return (
    <>
      <InputFormField
        data-testid="link-title-input"
        control={control}
        path="title"
        label="Titre du lien"
        info={titleInfo}
      />
      <InputFormField
        data-testid="link-url-input"
        control={control}
        path="url"
        label="Copiez le lien de l'URL ici"
        placeholder="https://"
      />
      <CheckboxFormField
        data-testid="link-show-preview-checkbox"
        control={control}
        path="showPreview"
        disabled={!urlValid}
        label="Afficher un aperçu visuel du lien"
      />
      {showPreview && urlValid && (
        <DynamicLinkContentEditionPreview
          url={url}
          onUpdate={onMetadataUpdate}
          title={linkTitle ?? null}
          description={linkDescription ?? null}
          imageUrl={linkImageUrl ?? null}
          faviconUrl={linkFaviconUrl ?? null}
        />
      )}
      <InputFormField
        className="fr-mt-4v"
        type="textarea"
        data-testid="link-caption-input"
        control={control}
        path="caption"
        label="Légende"
        info={captionInfo}
      />
    </>
  )
}

export default withTrpc(LinkContentEdition)
