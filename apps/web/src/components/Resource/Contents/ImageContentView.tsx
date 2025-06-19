import ImageContentDetails from '@app/web/components/Resource/Contents/ImageContentDetails'
import type { ResourceContent } from '@app/web/server/resources/getResource'
import React from 'react'

const ImageContentView = ({
  content: { title, image, caption, imageAltText },
}: {
  content: Pick<ResourceContent, 'title' | 'caption' | 'imageAltText'> & {
    image: Exclude<ResourceContent['image'], null>
  }
}) => (
  <div data-testid="content-image">
    {!!title && (
      <h2 data-testid="content-image-title" className="fr-mb-4v fr-h6">
        {title}
      </h2>
    )}
    <ImageContentDetails image={image} imageAltText={imageAltText} />
    {!!caption && <p className="fr-mb-0 fr-mt-4v fr-text--sm">{caption}</p>}
  </div>
)

export default ImageContentView
