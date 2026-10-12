resource "scaleway_container_namespace" "webContainers" {
  name        = var.CONTAINER_NAMESPACE_NAME
  description = "Web application containers"

  environment_variables = {
    CHROMATIC_APP_ID          = var.CHROMATIC_APP_ID
    NEXT_TELEMETRY_DISABLED   = var.NEXT_TELEMETRY_DISABLED
    SENTRY_ORG                = var.SENTRY_ORG
    SENTRY_PROJECT            = var.SENTRY_PROJECT
    SENTRY_URL                = var.SENTRY_URL
    COCKPIT_METRICS_URL       = scaleway_cockpit.cockpit.endpoints[0].metrics_url
    COCKPIT_LOGS_URL          = scaleway_cockpit.cockpit.endpoints[0].logs_url
    COCKPIT_ALERT_MANAGER_URL = scaleway_cockpit.cockpit.endpoints[0].alertmanager_url
    COCKPIT_GRAFANA_URL       = scaleway_cockpit.cockpit.endpoints[0].grafana_url
    SMTP_PORT                 = var.SMTP_PORT
    SCW_DEFAULT_REGION        = var.SCW_DEFAULT_REGION
    AWS_DEFAULT_REGION        = var.SCW_DEFAULT_REGION
    S3_HOST                   = var.S3_HOST
    LEGACY_UPLOADS_S3_BUCKET  = var.LEGACY_UPLOADS_S3_BUCKET
    LEGACY_HOSTNAME           = var.LEGACY_HOSTNAME
    NODE_ENV                  = "production"
    TZ                        = "utc"
    DATABASE_INSTANCE_ID      = scaleway_rdb_instance.database.id
  }

  secret_environment_variables = {
    COCKPIT_TOKEN         = scaleway_cockpit_token.cockpitWebToken.secret_key
    NEXTAUTH_SECRET       = var.NEXTAUTH_SECRET
    SCW_ACCESS_KEY        = var.SCW_ACCESS_KEY
    SCW_SECRET_KEY        = var.SCW_SECRET_KEY
    AWS_ACCESS_KEY_ID     = var.SCW_ACCESS_KEY
    AWS_SECRET_ACCESS_KEY = var.SCW_SECRET_KEY
  }
}

resource "scaleway_registry_namespace" "webApp" {
  name        = var.WEB_APP_DOCKER_REGISTRY_NAME
  description = "Built Web App docker images, ready to use in containers"
}
