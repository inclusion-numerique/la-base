import React, { ComponentProps } from 'react'
import {
  GenerateUploadedImageSourceSetsInput,
  generateUploadedImageSourceSets,
} from '@app/web/utils/responsiveImage'

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
      {/* eslint-disable-next-line react/jsx-props-no-spreading, jsx-a11y/alt-text */}
      <img key={`${id}_img`} srcSet={sources.at(-1)?.srcSet} {...imgProps} />
    </picture>
  )
}

export default ResponsiveUploadedImage
