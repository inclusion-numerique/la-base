import {
  type GenerateUploadedImageSourceSetsInput,
  generateUploadedImageSourceSets,
} from '@app/web/utils/responsiveImage'
import React, { type ComponentProps } from 'react'

const ResponsiveUploadedImage = ({
  id,
  quality,
  breakpoints,
  ...imgProps
}: Omit<ComponentProps<'img'>, 'src' | 'srcSet'> &
  GenerateUploadedImageSourceSetsInput) => {
  const sources = generateUploadedImageSourceSets({ id, quality, breakpoints })

  return (
    <picture className="fr-width-full" key={id}>
      {sources.map(({ media, srcSet }) => (
        <source key={`${id}_${media}`} media={media} srcSet={srcSet} />
      ))}
      <img key={`${id}_img`} srcSet={sources.at(-1)?.srcSet} {...imgProps} />
    </picture>
  )
}

export default ResponsiveUploadedImage
