export type ImageWithName = File & { filename: string }

export type CroppedImageType = {
  file: File
  cropHeight?: number
  cropWidth?: number
  cropTop?: number
  cropLeft?: number
}
