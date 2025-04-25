export type BaseMembersSortType = 'Alphabetique' | 'Role' | 'Recent' | 'Ancien'

export type BaseMembersSearchParams = Promise<{
  tri: BaseMembersSortType | undefined
}>
