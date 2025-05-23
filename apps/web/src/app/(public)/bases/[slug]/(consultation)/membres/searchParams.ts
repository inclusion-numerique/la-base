export type BaseMembersSortType = 'Alphabetique' | 'Role' | 'Recent' | 'Ancien'

export type BaseMembersSearchParams = {
  tri: BaseMembersSortType | undefined
}
