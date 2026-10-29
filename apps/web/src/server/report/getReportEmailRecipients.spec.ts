import { reportEmailRecipientRoles } from '@app/web/server/report/getReportEmailRecipients'

describe('reportEmailRecipientRoles', () => {
  it('includes moderators for a public resource outside any base', () => {
    expect(reportEmailRecipientRoles({ isPublic: true, base: null })).toEqual([
      'Admin',
      'Support',
      'Moderator',
    ])
  })

  it('includes moderators for a public resource in a public base', () => {
    expect(
      reportEmailRecipientRoles({ isPublic: true, base: { isPublic: true } }),
    ).toEqual(['Admin', 'Support', 'Moderator'])
  })

  it('excludes moderators for a public resource in a private base', () => {
    expect(
      reportEmailRecipientRoles({ isPublic: true, base: { isPublic: false } }),
    ).toEqual(['Admin', 'Support'])
  })

  it('excludes moderators for a private resource', () => {
    expect(reportEmailRecipientRoles({ isPublic: false, base: null })).toEqual([
      'Admin',
      'Support',
    ])
  })
})
