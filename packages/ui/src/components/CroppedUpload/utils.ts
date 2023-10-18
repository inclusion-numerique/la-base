export const DEFAULT_CROP = 0.8
export type ImageWithName = File & { filename: string }

export type CroppedImageType = {
  file: File
  cropHeight?: number
  cropWidth?: number
  cropTop?: number
  cropLeft?: number
}

export const getDefaultCropping = (ratio: number) => ({
  cropHeight: DEFAULT_CROP / ratio,
  cropWidth: DEFAULT_CROP,
  cropTop: 0.5 - DEFAULT_CROP / ratio / 2,
  cropLeft: 0.1,
})
