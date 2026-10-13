import { databasePasswordSecretName } from '@app/config/secrets/databasePasswordSecretName'

describe('databasePasswordSecretName', () => {
  it('keeps the secret name of main', () => {
    expect(databasePasswordSecretName('main')).toEqual('DATABASE_PASSWORD_MAIN')
  })

  it('keeps the secret name of dev', () => {
    expect(databasePasswordSecretName('dev')).toEqual('DATABASE_PASSWORD_DEV')
  })

  it('gives each preview its own secret, named after its namespace', () => {
    expect(databasePasswordSecretName('fix-namespace-preview-lgnpgq')).toEqual(
      'DATABASE_PASSWORD_FIX_NAMESPACE_PREVIEW_LGNPGQ',
    )
  })

  it('names the secret like an environment variable, as dotenv:from-secrets writes it to .env', () => {
    expect(databasePasswordSecretName('feat-a-b-qwerty')).toMatch(
      /^[A-Z][A-Z0-9_]*$/,
    )
  })
})
