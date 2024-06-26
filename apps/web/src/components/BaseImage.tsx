import React from 'react'
import RoundImage, { RoundImageProps } from '@app/web/components/RoundImage'
import BaseAvatar from '@app/web/components/BaseAvatar'

const avatarSizeByPictureSize: {
  [size in Exclude<RoundImageProps['size'], undefined>]: number
} = {
  24: 16,
  32: 18,
  48: 24,
  96: 48,
  116: 58,
  128: 64,
}

const BaseImage = ({
  base,
  ...roundImageProps
}: Omit<RoundImageProps, 'image'> & {
  base: {
    id: string
    image: RoundImageProps['image']
  }
}) => (
  <RoundImage
    {...roundImageProps}
    image={base.image}
    radius="quarter"
    fallback={
      <BaseAvatar
        base={base}
        size={avatarSizeByPictureSize[roundImageProps.size ?? 32]}
      />
    }
  />
)

export default BaseImage
