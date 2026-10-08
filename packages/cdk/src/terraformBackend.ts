import { projectSlug } from '@app/config/config'
import { S3Backend } from 'cdktf'
import { Construct } from 'constructs'

export const terraformBackend = (scope: Construct, stack: string) =>
  new S3Backend(scope, {
    bucket: `${projectSlug}-terraform-state`,
    key: `${projectSlug}-${stack}.tfstate`,
    // Credentials are provided with AWS_*** env variables
    region: 'fr-par',
    endpoints: { s3: 'https://s3.fr-par.scw.cloud' },
    skipCredentialsValidation: true,
    skipRegionValidation: true,
    skipRequestingAccountId: true,
    skipMetadataApiCheck: true,
    skipS3Checksum: true,
  })
