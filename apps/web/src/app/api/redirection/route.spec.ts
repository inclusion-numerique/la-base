import { mapLegacyPath } from '@app/web/legacyRedirection/legacyRedirection'
import { NextResponse } from 'next/server'
import { GET } from './route'

jest.mock('@app/web/legacyRedirection/legacyRedirection')

const mockedMapLegacyPath = mapLegacyPath as jest.MockedFunction<
  typeof mapLegacyPath
>

describe('Redirection Route', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
    mockedMapLegacyPath.mockClear()
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('redirects to migrated path with https and status 301 for full URL origin', async () => {
    process.env.BASE_URL = 'lesbases.test'
    mockedMapLegacyPath.mockResolvedValue('/migrated-path')

    const request = new Request(
      'https://lesbases.test/api/redirection-v1?origin=https%3A%2F%2Flabase.anct.gouv.fr%2Fbase%2F589%3Ftags%3D%26page%3D0',
    )
    const response = await GET(request)

    const mockedCalledWith = mockedMapLegacyPath.mock.calls[0][0]

    expect(mockedCalledWith.toString()).toEqual(
      'https://labase.anct.gouv.fr/base/589?tags=&page=0',
    )
    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toBe(
      'https://lesbases.test/migrated-path',
    )
  })

  it('respond with 400 error for invalid URL', async () => {
    process.env.BASE_URL = 'lesbases.test'
    mockedMapLegacyPath.mockResolvedValue('/migrated-path')

    const request = new Request(
      'https://lesbases.test/api/redirection-v1?origin=%2Fresource%2F42',
    )
    const response = await GET(request)

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: '"origin" query parameter must be a valid URL',
    })
  })
})
