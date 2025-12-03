// Match with prisma type but without importing prisma type for better typescript compatibility

export const UserSecurityRoles = {
  User: 'User',
  Support: 'Support',
  Admin: 'Admin',
  Moderator: 'Moderator',
} as const

export type UserSecurityRole =
  (typeof UserSecurityRoles)[keyof typeof UserSecurityRoles]
