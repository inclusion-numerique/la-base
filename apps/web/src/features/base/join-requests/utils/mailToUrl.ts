export const getAdminMailToUrl = (
  members: Array<{
    member: { email: string }
    isAdmin: boolean
    accepted: Date | null
  }>,
) => {
  const emails = members
    .filter((member) => member.isAdmin && member.accepted)
    .map((member) => member.member.email)
  return `mailto:${emails.join(',')}?subject=${encodeURIComponent(
    'Demande de rejoindre la base',
  )}`
}
