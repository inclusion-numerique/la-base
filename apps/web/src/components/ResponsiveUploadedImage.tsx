import React, { ComponentProps } from 'react'
import {
  generateUploadedImageSourceSets,
  GenerateUploadedImageSourceSetsInput,
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
    <picture>
      {sources.map(({ media, srcSet }) => (
        <source key={media} media={media} srcSet={srcSet} />
      ))}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <img srcSet={sources.at(-1)?.srcSet} {...imgProps} />
    </picture>
  )
}

export default ResponsiveUploadedImage
