locals {
  is_main = var.namespace == "main"

  main_domain    = var.MAIN_SUBDOMAIN == "" ? var.MAIN_ROOT_DOMAIN : "${var.MAIN_SUBDOMAIN}.${var.MAIN_ROOT_DOMAIN}"
  preview_domain = var.PREVIEW_SUBDOMAIN == "" ? var.PREVIEW_ROOT_DOMAIN : "${var.PREVIEW_SUBDOMAIN}.${var.PREVIEW_ROOT_DOMAIN}"

  preview_subdomain = trimsuffix(
    trimsuffix(substr(var.namespace, 0, 63 - 1 - length(local.preview_domain)), "-"),
    "_",
  )

  subdomain = local.is_main ? "" : local.preview_subdomain
  hostname  = local.is_main ? local.main_domain : "${local.preview_subdomain}.${local.preview_domain}"

  database_name = "${var.NEXT_PUBLIC_APP_SLUG}-${var.namespace}"
  database_user = "${var.NEXT_PUBLIC_APP_SLUG}-${var.namespace}"

  container_name = substr(var.namespace, 0, 34)

  email_from_address = local.is_main ? "notifications@${local.main_domain}" : "notifications+${var.namespace}@${local.main_domain}"
  email_from_name    = local.is_main ? var.NEXT_PUBLIC_APP_NAME : "[${var.namespace}] ${var.NEXT_PUBLIC_APP_NAME}"

  database_url = format(
    "postgres://%s:%s@%s:%s/%s?sslmode=require",
    local.database_user,
    var.DATABASE_PASSWORD,
    data.scaleway_rdb_instance.dbInstance.endpoint_ip,
    data.scaleway_rdb_instance.dbInstance.endpoint_port,
    local.database_name,
  )

  main_jobs = {
    "backup-database-hourly" = {
      name     = "backup-${var.namespace}-database-hourly"
      schedule = "0 * * * *"
      body     = jsonencode({ name = "backup-database", payload = { databaseName = local.database_name, type = "hourly" } })
    }
    "backup-database-daily" = {
      name     = "backup-${var.namespace}-database-daily"
      schedule = "0 0 * * *"
      body     = jsonencode({ name = "backup-database", payload = { databaseName = local.database_name, type = "daily" } })
    }
    "backup-database-weekly" = {
      name     = "backup-${var.namespace}-database-weekly"
      schedule = "0 0 * * 0"
      body     = jsonencode({ name = "backup-database", payload = { databaseName = local.database_name, type = "weekly" } })
    }
    "monthly-newsletter-news-feed" = {
      name     = "monthly-newsletter-news-feed"
      schedule = "0 8 1 * *"
      body     = jsonencode({ name = "monthly-newsletter-news-feed" })
    }
    "account-inactivity" = {
      name     = "account-inactivity-${var.namespace}"
      schedule = "0 9 * * *"
      body     = jsonencode({ name = "account-inactivity" })
    }
  }

  jobs = { for key, job in local.main_jobs : key => job if local.is_main }
}
