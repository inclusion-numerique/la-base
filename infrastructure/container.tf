data "scaleway_container_namespace" "containerNamespace" {
  name = var.CONTAINER_NAMESPACE_NAME
}

resource "scaleway_container" "webContainer" {
  name                   = local.container_name
  namespace_id           = data.scaleway_container_namespace.containerNamespace.namespace_id
  image                  = var.WEB_CONTAINER_IMAGE
  min_scale              = local.is_main ? 2 : 0
  max_scale              = local.is_main ? 3 : 1
  cpu_limit              = local.is_main ? 1120 : 560
  memory_limit_bytes     = local.is_main ? 3072000000 : 2048000000
  https_connections_only = true

  environment_variables = {
    NODE_OPTIONS           = local.is_main ? "--max-old-space-size=1536" : "--max-old-space-size=1024"
    BREVO_USERS_LIST_ID    = var.BREVO_USERS_LIST_ID
    EMAIL_FROM_ADDRESS     = local.email_from_address
    EMAIL_FROM_NAME        = local.email_from_name
    STACK_WEB_IMAGE        = var.WEB_CONTAINER_IMAGE
    UPLOADS_BUCKET         = var.UPLOADS_BUCKET
    BASE_URL               = local.hostname
    NEXTAUTH_URL           = "https://${local.hostname}"
    BRANCH                 = var.branch
    NAMESPACE              = var.namespace
    SCW_DEFAULT_REGION     = var.SCW_DEFAULT_REGION
    REPORT_MODERATOR_EMAIL = local.is_main ? var.REPORT_MODERATOR_EMAIL_MAIN : var.REPORT_MODERATOR_EMAIL_PREVIEW
    REPORT_MODERATOR_NAME  = local.is_main ? var.REPORT_MODERATOR_NAME_MAIN : var.REPORT_MODERATOR_NAME_PREVIEW
    SMTP_PORT              = local.is_main ? var.SMTP_PORT : "1025"
  }

  secret_environment_variables = {
    BREVO_API_KEY            = local.is_main ? var.BREVO_API_KEY : ""
    DATABASE_URL             = local.database_url
    PROCONNECT_CLIENT_SECRET = local.is_main ? var.PROCONNECT_MAIN_CLIENT_SECRET : var.PROCONNECT_PREVIEW_CLIENT_SECRET
    FRIENDLY_CAPTCHA_API_KEY = var.FRIENDLY_CAPTCHA_API_KEY
    SMTP_USERNAME            = local.is_main ? var.SMTP_USERNAME : var.SMTP_MAILDEV_USERNAME
    SMTP_PASSWORD            = local.is_main ? var.SMTP_PASSWORD : var.SMTP_MAILDEV_PASSWORD
    SMTP_SERVER              = local.is_main ? var.SMTP_SERVER : "maildev.lesbases.anct.gouv.fr"
  }
}
