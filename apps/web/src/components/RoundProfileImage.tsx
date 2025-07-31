import ProfileInitials from '@app/web/components/ProfileInitials'
import RoundImage, {
  type RoundImageProps,
} from '@app/web/components/RoundImage'

const fontSizeByPictureSize: {
  [size in Exclude<RoundImageProps['size'], undefined>]: number
} = {
  24: 10,
  32: 12,
  48: 18,
  96: 36,
  116: 42,
  128: 48,
}

const RoundProfileImage = ({
  user,
  ...roundImageProps
}: Omit<RoundImageProps, 'image'> & {
  user: {
    firstName: string | null
    lastName: string | null
    image: RoundImageProps['image']
  }
}) => (
  <RoundImage
    {...roundImageProps}
    image={user.image}
    fallback={
      <ProfileInitials
        size={fontSizeByPictureSize[roundImageProps.size ?? 32]}
        firstName={user.firstName}
        lastName={user.lastName}
      />
    }
  />
)

export default RoundProfileImage
