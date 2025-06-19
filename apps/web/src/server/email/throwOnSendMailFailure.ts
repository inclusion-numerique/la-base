import type SMTPTransport from 'nodemailer/lib/smtp-transport'

export const throwOnSendMailFailure = (info: SMTPTransport.SentMessageInfo) => {
  const failed = [...info.rejected].filter(Boolean)
  if (failed.length > 0) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }

  return true
}
