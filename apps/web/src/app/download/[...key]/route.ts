import { GetObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest } from 'next/server'
import { prismaClient } from '@app/web/prismaClient'
import { legacyS3Client } from '@app/web/server/s3/legacyS3'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { s3 } from '@app/web/server/s3/s3'
import { resourceAuthorizationTargetSelect } from '@app/web/authorization/models/resourceAuthorizationTargetSelect'
import { authorizeOrThrow } from '@app/web/server/rpc/trpcErrors'
import {
  resourceAuthorization,
  ResourcePermissions,
} from '@app/web/authorization/models/resourceAuthorization'
import { sessionTokenFromRequestCookies } from '@app/web/security/authentication'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { escapeHeaderFilename } from '@app/web/app/download/escapeHeaderFilename'

const notFoundResponse = () =>
  new Response('', {
    status: 404,
  })
export const GET = async (request: NextRequest) => {
  // Key is the path without first directory name "/download/"
  const key = decodeURIComponent(
    request.nextUrl.pathname.replace(/^\/download\//, ''),
  )
  const download = request.nextUrl.searchParams.has('download')

  if (!key) {
    return notFoundResponse()
  }
  const upload = await prismaClient.upload.findUnique({
    where: { key },
    select: {
      key: true,
      legacyKey: true,
      mimeType: true,
      name: true,
      uploadedById: true,
      content: {
        select: {
          resource: {
            select: {
              ...resourceAuthorizationTargetSelect,
            },
          },
        },
      },
    },
  })

  if (!upload) {
    return notFoundResponse()
  }

  // If upload is in a resource content, we check if the user can access the resource
  if (upload.content?.resource) {
    const sessionToken = sessionTokenFromRequestCookies(request.cookies)
    const user = sessionToken
      ? await getSessionUserFromSessionToken(sessionToken)
      : null
    authorizeOrThrow(
      upload.content.resource
        ? resourceAuthorization(upload.content.resource, user).hasPermission(
            ResourcePermissions.ReadResourceContent,
          )
        : true,
    )
  }

  // TODO download header for attachment
  // Content-Disposition: attachment; filename="filename.pdf"
  const object = upload.legacyKey
    ? await legacyS3Client.send(
        new GetObjectCommand({
          Bucket: ServerWebAppConfig.LegacyS3.uploadsBucket,
          Key: upload.legacyKey,
        }),
      )
    : await s3.send(
        new GetObjectCommand({
          Bucket: ServerWebAppConfig.S3.uploadsBucket,
          Key: upload.key,
        }),
      )

  if (!object.Body) {
    throw new Error('Image not found')
  }

  const dispositionHeaderValue = `${
    download ? 'attachment' : 'inline'
  }; filename="${escapeHeaderFilename(upload.name)}"`

  return new Response(object.Body.transformToWebStream(), {
    status: 200,
    headers: {
      'Content-Type': upload.mimeType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Disposition': dispositionHeaderValue,
    },
  })
}
