const connectionUrlPassword = /(:\/\/[^\s:/@]+:)\S+@/g

const presignedUrlSecrets =
  /(X-Amz-(?:Credential|Signature|Security-Token)=)[^&\s]+/gi

export const redactSecrets = (text: string) =>
  text
    .replace(connectionUrlPassword, '$1***@')
    .replace(presignedUrlSecrets, '$1***')
