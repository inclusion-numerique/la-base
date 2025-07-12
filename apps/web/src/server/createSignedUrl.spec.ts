import { createReadStream } from 'node:fs'
import path from 'node:path'
import { getDirname } from '@app/config/dirname'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import {
  createSignedGetUrl,
  createSignedUploadUrl,
} from '@app/web/server/createSignedUrl'
import axios from 'axios'

describe.skip('createSignedUrl', () => {
  describe('createSignedGetUrl', () => {
    it('can createSignedUrl', async () => {
      const key = 'test/small-test-image.png'

      const { url } = await createSignedGetUrl({
        key,
        bucket: ServerWebAppConfig.S3.uploadsBucket,
      })

      expect(url).toBeString()
      expect(url).toStartWith('https://')
      expect(url).toInclude('test/small-test-image.png')
      expect(url).toInclude(ServerWebAppConfig.S3.uploadsBucket)
      expect(url).toInclude(key)

      // Try with system lib, should always work if url is correct
      const { status } = await axios.get(url)
      expect(status).toEqual(200)
    }, 30_000)
  })

  describe('createSignedUploadUrl', () => {
    it('canCreateSignedUrl', async () => {
      const fileName = '2022-11-test.png'
      const mimeType = 'image/png'
      const filePath = path.resolve(
        getDirname(import.meta.url),
        '../../test/small-test-image.png',
      )

      const { url, key } = await createSignedUploadUrl({
        directory: `test/${Date.now()}`,
        bucket: ServerWebAppConfig.S3.uploadsBucket,
        name: fileName,
        mimeType,
        visibility: 'public',
      })

      expect(key).toBeString()
      expect(key).toInclude(fileName)
      expect(url).toBeString()
      expect(url).toStartWith('https://')
      expect(url).toInclude(ServerWebAppConfig.S3.uploadsBucket)
      expect(url).toInclude(fileName)

      const { status } = await axios.put(url, createReadStream(filePath), {
        headers: {
          'Content-Type': mimeType,
          'x-amz-acl': 'public-read',
        },
      })
      expect(status).toEqual(200)
    }, 30_000)
  })
})
