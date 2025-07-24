import CustomTag, { TagColor } from './CustomTag'

const publicValues = {
  color: TagColor.GREEN,
  icon: 'fr-icon-earth-fill',
}

const privateValues = {
  color: TagColor.GREY,
  icon: 'fr-icon-lock-line',
}

export const ProfilePrivacyTag = ({
  isPublic,
  small,
}: {
  isPublic?: boolean
  small?: boolean
}) =>
  isPublic ? (
    <CustomTag {...publicValues} small={small} label="Profil public" />
  ) : (
    <CustomTag {...privateValues} small={small} label="Profil privé" />
  )

export const BasePrivacyTag = ({
  isPublic,
  small,
}: {
  isPublic?: boolean
  small?: boolean
}) =>
  isPublic ? (
    <CustomTag {...publicValues} small={small} label="Base publique" />
  ) : (
    <CustomTag {...privateValues} small={small} label="Base privée" />
  )

export const CollectionPrivacyTag = ({
  isPublic,
  small,
  className,
}: {
  isPublic?: boolean
  small?: boolean
  className?: string
}) =>
  isPublic ? (
    <CustomTag {...publicValues} small={small} className={className} />
  ) : (
    <CustomTag {...privateValues} small={small} className={className} />
  )

export const PrivacyTag = ({
  className,
  isPublic,
  small,
  label,
}: {
  className?: string
  isPublic?: boolean
  small?: boolean
  label?: string
}) =>
  isPublic ? (
    <CustomTag
      {...publicValues}
      small={small}
      label={label}
      className={className}
    />
  ) : (
    <CustomTag
      {...privateValues}
      small={small}
      label={label}
      className={className}
    />
  )
