import LinkContentPreview from '@app/web/components/Resource/Contents/LinkContentPreview'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { Metadata } from '@app/web/server/rpc/metadata/getMetadataFromDocument'
import { trpc } from '@app/web/trpc'
import { useEffect, useState } from 'react'

const DynamicLinkContentEditionPreview = ({
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

  const { isFetching, isError, data, error } = trpc.metaData.get.useQuery(
    { url },
    {
      // queryKey: ['metaData.get', { url }],
      enabled: !!url,
    },
  )
  // biome-ignore lint/correctness/useExhaustiveDependencies: only needed to run when data changes
  useEffect(() => {
    if (!data) {
      return
    }

    if ('error' in data) {
      setMetadataError(
        "Impossible de récupérer l'aperçu du lien, veuillez vérifier que l'url est valide et accessible.",
      )
      return
    }
    setMetadataError(null)
    onUpdate(data)
  }, [data])

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
    <LinkContentPreview
      url={url}
      title={title}
      description={description}
      imageUrl={imageUrl}
      faviconUrl={faviconUrl}
    />
  )
}

export default withTrpc(DynamicLinkContentEditionPreview)
