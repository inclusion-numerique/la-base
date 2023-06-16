import React from 'react'
import { ResourceContent } from '@app/web/server/resources/getResource'
import ImageDetails from '@app/web/components/Resource/Contents/ImageDetails'

const ImageView = ({
  content: { title, image, caption, imageAltText },
}: {
  content: Pick<ResourceContent, 'title' | 'caption' | 'imageAltText'> & {
    image: Exclude<ResourceContent['image'], null>
  }
}) => (
  <div data-testid="content-image">
    <h6 data-testid="content-image-title" className="fr-mb-0">
      {title}
    </h6>
    <ImageDetails
      className="fr-mt-4v"
      image={image}
      imageAltText={imageAltText}
    />
    {!!caption && <p className="fr-mb-0 fr-mt-4v fr-text--sm">{caption}</p>}
  </div>
)

export default ImageView
