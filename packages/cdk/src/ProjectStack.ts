import { TerraformStack } from 'cdktf'
import { Construct } from 'constructs'
import { ProjectCdkOutput } from '@app/cdk/getCdkOutput'
import { environmentVariablesFromList } from '@app/cdk/environmentVariable'
import { createOutput } from '@app/cdk/output'
import { ScalewayProvider } from '@app/scaleway/provider'
import { RdbInstance } from '@app/scaleway/rdb-instance'
import { ContainerNamespace } from '@app/scaleway/container-namespace'
import {
  chromaticAppId,
  cockpitGrafanaEditors,
  cockpitGrafanaViewers,
  containerNamespaceName,
  databaseInstanceName,
  mainDomain,
  mainRootDomain,
  mainSubdomain,
  nextTelemetryDisabled,
  previewDomain,
  previewRootDomain,
  previewSubdomain,
  publicContactEmail,
  publicMatomoHost,
  publicMatomoSiteId,
  publicSentryDsn,
  region,
  sentryOrg,
  sentryProject,
  sentryUrl,
  smtpPort,
} from '@app/config/config'
import { DomainRecord } from '@app/scaleway/domain-record'
import { terraformBackend } from '@app/cdk/terraformBackend'
import { ObjectBucket } from '@app/scaleway/object-bucket'
import { RegistryNamespace } from '@app/scaleway/registry-namespace'
import { Cockpit } from '@app/scaleway/cockpit'
import { DataScalewayDomainZone } from '@app/scaleway/data-scaleway-domain-zone'
import { CockpitGrafanaUser } from '@app/scaleway/cockpit-grafana-user'
import { CockpitToken } from '@app/scaleway/cockpit-token'
import { TemDomain } from '@app/scaleway/tem-domain'

export const projectStackVariables = [
  'SCW_DEFAULT_ORGANIZATION_ID',
  'SCW_PROJECT_ID',
  'EMAIL_FROM_DOMAIN',
  'UPLOADS_BUCKET',
  'WEB_APP_DOCKER_REGISTRY_NAME',
  'S3_HOST',
] as const

export const projectStackSensitiveVariables = [
  'NEXTAUTH_SECRET',
  'SCW_ACCESS_KEY',
  'SCW_SECRET_KEY',
  'SENTRY_AUTH_TOKEN',
  'SMTP_PASSWORD',
  'SMTP_SERVER',
  'SMTP_USERNAME',
] as const

/**
 * This stack represents the resources shared by other project stacks
 * It aims to be deployed only once, and used by other stacks
 */
export class ProjectStack extends TerraformStack {
  constructor(scope: Construct) {
    super(scope, 'project')

    // ⚠️ When calling this function, do not forget to update typings in src/getCdkOutput.ts
    const output = createOutput<ProjectCdkOutput>(this)

    const environmentVariables = environmentVariablesFromList(
      this,
      projectStackVariables,
      { sensitive: false },
    )

    const sensitiveEnvironmentVariables = environmentVariablesFromList(
      this,
      projectStackSensitiveVariables,
      { sensitive: true },
    )

    // Configuring provider that will be used for the rest of the stack
    new ScalewayProvider(this, 'provider', {
      region,
      accessKey: sensitiveEnvironmentVariables.SCW_ACCESS_KEY.value,
      secretKey: sensitiveEnvironmentVariables.SCW_SECRET_KEY.value,
      organizationId: environmentVariables.SCW_DEFAULT_ORGANIZATION_ID.value,
      projectId: environmentVariables.SCW_PROJECT_ID.value,
    })

    terraformBackend(this, 'project')

    const mainDomainZone = new DataScalewayDomainZone(this, 'mainDomainZone', {
      domain: mainRootDomain,
      subdomain: mainSubdomain,
    })

    const previewDomainZone =
      mainDomain === previewDomain
        ? mainDomainZone
        : new DataScalewayDomainZone(this, 'previewDomainZone', {
            domain: previewRootDomain,
            subdomain: previewSubdomain,
          })

    // If email domain differ, create different zone
    const emailDomainZone = mainDomainZone

    const transactionalEmailDomain = new TemDomain(
      this,
      'transactionalEmailDomain',
      {
        acceptTos: true,
        name: environmentVariables.EMAIL_FROM_DOMAIN.value,
      },
    )

    // Uploads bucket for usage in integration testing and dev environments
    new ObjectBucket(this, 'devUploads', {
      name: environmentVariables.UPLOADS_BUCKET.value,
      corsRule: [
        {
          allowedHeaders: ['*'],
          allowedMethods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
          maxAgeSeconds: 3000,
          exposeHeaders: ['Etag'],
          allowedOrigins: ['http://localhost:3000', 'http://localhost'],
        },
      ],
    })

    // https://registry.terraform.io/providers/scaleway/scaleway/latest/docs/resources/rdb_instance
    const database = new RdbInstance(this, 'database', {
      name: databaseInstanceName,
      engine: 'PostgreSQL-14',
      isHaCluster: true,
      nodeType: 'db-dev-m',
      disableBackup: false,
      backupSameRegion: false,
      backupScheduleFrequency: 24,
      backupScheduleRetention: 14,
      volumeType: 'bssd', // Block storage
      volumeSizeInGb: 15,
      settings: {
        // Custom max connections
        max_connections: '500',

        // Default values (if we define settings the are deleted)
        effective_cache_size: '2700',
        maintenance_work_mem: '300',
        max_parallel_workers: '1',
        max_parallel_workers_per_gather: '0',
        work_mem: '8',
      },
    })

    const cockpit = new Cockpit(this, 'cockpit', {})
    const cockpitEndpoints = cockpit.endpoints.get(0)

    // https://registry.terraform.io/providers/scaleway/scaleway/latest/docs/resources/cockpit_grafana_user

    for (const [index, login] of cockpitGrafanaEditors.entries()) {
      const user = new CockpitGrafanaUser(this, `grafanaEditor${index}`, {
        role: 'editor',
        login,
      })

      output(
        `grafanaEditorPassword_${index}` as keyof ProjectCdkOutput,
        user.password,
        'sensitive',
      )
    }

    for (const [index, login] of cockpitGrafanaViewers.entries()) {
      const user = new CockpitGrafanaUser(this, `grafanaViewer${index}`, {
        role: 'viewer',
        login,
      })
      output(
        `grafanaViewerPassword_${index}` as keyof ProjectCdkOutput,
        user.password,
        'sensitive',
      )
    }

    // Create cockpit token for web app containers
    // https://registry.terraform.io/providers/scaleway/scaleway/latest/docs/resources/cockpit_token
    const cockpitToken = new CockpitToken(this, 'cockpitWebToken', {
      name: 'web-app',
      scopes: {
        queryLogs: true,
        queryMetrics: true,
        setupAlerts: false,
        setupLogsRules: false,
        setupMetricsRules: false,
        writeLogs: true,
        writeMetrics: true,
      },
    })

    const webContainers = new ContainerNamespace(this, 'webContainers', {
      name: containerNamespaceName,
      description: 'Web application containers',
      environmentVariables: {
        CHROMATIC_APP_ID: chromaticAppId,
        NEXT_PUBLIC_CONTACT_EMAIL: publicContactEmail,
        NEXT_PUBLIC_SENTRY_DSN: publicSentryDsn,
        NEXT_PUBLIC_MATOMO_HOST: publicMatomoHost,
        NEXT_PUBLIC_MATOMO_SITE_ID: publicMatomoSiteId,
        NEXT_TELEMETRY_DISABLED: nextTelemetryDisabled,
        SENTRY_ORG: sentryOrg,
        SENTRY_PROJECT: sentryProject,
        SENTRY_URL: sentryUrl,
        COCKPIT_METRICS_URL: cockpitEndpoints.metricsUrl,
        COCKPIT_LOGS_URL: cockpitEndpoints.logsUrl,
        COCKPIT_ALERT_MANAGER_URL: cockpitEndpoints.alertmanagerUrl,
        COCKPIT_GRAFANA_URL: cockpitEndpoints.grafanaUrl,
        SMTP_PORT: smtpPort,
        SCW_DEFAULT_REGION: region,
        AWS_DEFAULT_REGION: region,
        S3_HOST: environmentVariables.S3_HOST.value,
        NODE_ENV: 'production',
        TZ: 'utc',
      },
      secretEnvironmentVariables: {
        COCKPIT_TOKEN: cockpitToken.secretKey,
        NEXTAUTH_SECRET: sensitiveEnvironmentVariables.NEXTAUTH_SECRET.value,
        SCW_ACCESS_KEY: sensitiveEnvironmentVariables.SCW_ACCESS_KEY.value,
        SCW_SECRET_KEY: sensitiveEnvironmentVariables.SCW_SECRET_KEY.value,
        AWS_ACCESS_KEY_ID: sensitiveEnvironmentVariables.SCW_ACCESS_KEY.value,
        AWS_SECRET_ACCESS_KEY:
          sensitiveEnvironmentVariables.SCW_SECRET_KEY.value,
        SENTRY_AUTH_TOKEN:
          sensitiveEnvironmentVariables.SENTRY_AUTH_TOKEN.value,
        SMTP_PASSWORD: sensitiveEnvironmentVariables.SMTP_PASSWORD.value,
        SMTP_SERVER: sensitiveEnvironmentVariables.SMTP_SERVER.value,
        SMTP_USERNAME: sensitiveEnvironmentVariables.SMTP_USERNAME.value,
      },
    })

    new RegistryNamespace(this, 'webApp', {
      name: environmentVariables.WEB_APP_DOCKER_REGISTRY_NAME.value,
      description: 'Built Web App docker images, ready to use in containers',
    })

    // Main domain DNS Records
    new DomainRecord(this, 'main_ns0', {
      dnsZone: mainDomainZone.id,
      type: 'NS',
      name: '',
      data: 'ns0.dom.scw.cloud.',
      ttl: 1800,
    })
    new DomainRecord(this, 'main_ns1', {
      dnsZone: mainDomainZone.id,
      type: 'NS',
      name: '',
      data: 'ns1.dom.scw.cloud.',
      ttl: 1800,
    })
    // Preview domain DNS Records
    if (previewDomain !== mainDomain) {
      new DomainRecord(this, 'preview_ns0', {
        dnsZone: previewDomainZone.id,
        type: 'NS',
        name: '',
        data: 'ns0.dom.scw.cloud.',
        ttl: 1800,
      })
      new DomainRecord(this, 'preview_ns1', {
        dnsZone: previewDomainZone.id,
        type: 'NS',
        name: '',
        data: 'ns1.dom.scw.cloud.',
        ttl: 1800,
      })
    }

    // Email domain DNS Records
    new DomainRecord(this, 'spf', {
      dnsZone: emailDomainZone.id,
      type: 'TXT',
      name: '',
      data: `v=spf1 ${transactionalEmailDomain.spfConfig} -all`,
      ttl: 3600,
    })
    // MX is recommended for improved deverability
    new DomainRecord(this, 'mx', {
      dnsZone: emailDomainZone.id,
      type: 'MX',
      name: '',
      data: '1 incubateur.anct.gouv.fr.',
      ttl: 3600,
    })
    new DomainRecord(this, 'dkim', {
      dnsZone: emailDomainZone.id,
      type: 'TXT',
      name: `${transactionalEmailDomain.projectId}._domainkey`,
      data: transactionalEmailDomain.dkimConfig,
      ttl: 3600,
    })

    output('cockpitId', cockpit.id)
    output('mainDomainZoneId', mainDomainZone.id)
    output('transactionalEmailDomainStatus', transactionalEmailDomain.status)
    output('webContainersId', webContainers.id)
    output('databaseInstanceId', database.id)
    output('databaseEndpointIp', database.endpointIp)
    output('databaseEndpointPort', database.endpointPort)
  }
}
