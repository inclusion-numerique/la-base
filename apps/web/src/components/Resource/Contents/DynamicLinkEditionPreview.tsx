import { useState } from 'react'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import type { Metadata } from '@app/web/server/rpc/metadata/getMetadataFromDocument'
import LinkPreview from '@app/web/components/Resource/Contents/LinkPreview'

const DynamicLinkEditionPreview = ({
  url,
  onUpdate,
  imageUrl,
  faviconUrl,
  title,
  description,
}: {
  url: string
  onUpdate: (metadata: Metadata) => void
} & Metadata) => {
  const [metadataError, setMetadataError] = useState<string | null>(null)

  const { isFetching, isError, error } = trpc.metaData.get.useQuery(
    { url },
    {
      enabled: !!url,
      onSuccess: (metadata) => {
        if ('error' in metadata) {
          setMetadataError(
            "Impossible de récupérer l'aperçu du lien, veuillez vérifier que l'url est valide et accessible.",
          )
          return
        }
        setMetadataError(null)
        onUpdate(metadata)
      },
    },
  )
  if (isFetching) {
    return (
      <p className="fr-info-text fr-mt-0 fr-mb-4v">
        Chargement de l&apos;aperçu...
      </p>
    )
  }

  if (!!metadataError || isError) {
    return (
      <p className="fr-error-text fr-mt-0 fr-mb-4v">
        {metadataError ?? error?.message}
      </p>
    )
  }
  return (
    <LinkPreview
      url={url}
      title={title}
      description={description}
      imageUrl={imageUrl}
      faviconUrl={faviconUrl}
    />
  )
}

export default withTrpc(DynamicLinkEditionPreview)
