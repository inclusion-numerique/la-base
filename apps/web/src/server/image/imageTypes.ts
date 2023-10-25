export type ImageMinimalData = {
  id: string
  altText: string | null
}

export type WithMinimalImageData = {
  image: ImageMinimalData | null
}
