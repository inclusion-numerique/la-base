const computeInitials = (firstName: string | null, lastName: string | null) => {
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }
  if (firstName) {
    return firstName.charAt(0)
  }
  if (lastName) {
    return lastName.charAt(0)
  }
  return ''
}

const ProfileInitials = ({
  firstName,
  lastName,
  size,
}: {
  firstName: string | null
  lastName: string | null
  size: number
}) => (
  <span
    className="fr-flex fr-align-items-center fr-justify-content-center fr-text-label--blue-ecume fr-width-full fr-height-full"
    style={{ fontSize: size, backgroundColor: 'var(--blue-ecume-850-200)' }}
  >
    {computeInitials(firstName, lastName)}
  </span>
)

export default ProfileInitials
