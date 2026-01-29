import type { AccessibleImageProps } from '@app/ui/utils/imageAccessibility'
import {
  type GenerateUploadedImageSourceSetsInput,
  generateUploadedImageSourceSets,
} from '@app/web/utils/responsiveImage'
import { type ComponentProps } from 'react'

const ResponsiveUploadedImage = ({
  id,
  quality,
  breakpoints,
  ...imgProps
}: Omit<ComponentProps<'img'>, 'src' | 'srcSet' | 'alt'> &
  GenerateUploadedImageSourceSetsInput &
  AccessibleImageProps) => {
  const sources = generateUploadedImageSourceSets({ id, quality, breakpoints })

  return (
    <picture className="fr-width-full fr-border-radius--16" key={id}>
      {sources.map(({ media, srcSet }) => (
        <source key={`${id}_${media}`} media={media} srcSet={srcSet} />
      ))}
      <img key={`${id}_img`} srcSet={sources.at(-1)?.srcSet} {...imgProps} />
    </picture>
  )
}

export default ResponsiveUploadedImage
