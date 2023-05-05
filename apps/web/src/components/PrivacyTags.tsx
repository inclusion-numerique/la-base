import CustomTag, { TagColor } from './CustomTag'

const publicValues = {
  color: TagColor.GREEN,
  icon: 'fr-icon-earth-fill',
}

const privateValues = {
  color: TagColor.GREY,
  icon: 'fr-icon-lock-line',
}

export const ProfilePrivacyTag = ({ isPublic }: { isPublic?: boolean }) =>
  isPublic ? (
    <CustomTag {...publicValues} label="Profil public" />
  ) : (
    <CustomTag {...privateValues} label="Profil privé" />
  )

export const BasePrivacyTag = ({ isPublic }: { isPublic?: boolean }) =>
  isPublic ? (
    <CustomTag {...publicValues} label="Base publique" />
  ) : (
    <CustomTag {...privateValues} label="Base privée" />
  )
