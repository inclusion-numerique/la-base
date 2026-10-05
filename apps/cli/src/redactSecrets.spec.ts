import { redactSecrets } from './redactSecrets'

describe('redactSecrets', () => {
  it('should redact the password of a connection url', () => {
    expect(
      redactSecrets(
        'pg_restore -d postgres://user:s3cr)t&p@ss@db.example.com:5432/app?sslmode=require dump.sql',
      ),
    ).toBe(
      'pg_restore -d postgres://user:***@db.example.com:5432/app?sslmode=require dump.sql',
    )
  })

  it('should redact the signature and credential of a presigned url', () => {
    expect(
      redactSecrets(
        'https://s3.example.com/bucket/file?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=KEY%2F20261005&X-Amz-Date=20261005T083306Z&X-Amz-Signature=abc123',
      ),
    ).toBe(
      'https://s3.example.com/bucket/file?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=***&X-Amz-Date=20261005T083306Z&X-Amz-Signature=***',
    )
  })

  it('should leave text without secrets untouched', () => {
    const text =
      'Restored database to db.example.com/app for "user" role, see https://example.com/path?page=2'

    expect(redactSecrets(text)).toBe(text)
  })

  it('should redact every occurrence', () => {
    expect(
      redactSecrets('postgres://a:one@host/db and postgres://b:two@host/db'),
    ).toBe('postgres://a:***@host/db and postgres://b:***@host/db')
  })
})
