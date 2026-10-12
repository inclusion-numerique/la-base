variable "SCW_PROJECT_ID" {
  type = string
}

variable "SCW_DEFAULT_REGION" {
  type = string
}

variable "DATABASE_INSTANCE_NAME" {
  type = string
}

variable "CONTAINER_NAMESPACE_NAME" {
  type = string
}

variable "MAIN_ROOT_DOMAIN" {
  type = string
}

variable "PREVIEW_ROOT_DOMAIN" {
  type = string
}

variable "EMAIL_FROM_DOMAIN" {
  type = string
}

variable "UPLOADS_BUCKET" {
  type = string
}

variable "BACKUPS_BUCKET" {
  type = string
}

variable "LEGACY_UPLOADS_S3_BUCKET" {
  type = string
}

variable "WEB_APP_DOCKER_REGISTRY_NAME" {
  type = string
}

variable "S3_HOST" {
  type = string
}

variable "LEGACY_HOSTNAME" {
  type = string
}

variable "SMTP_PORT" {
  type = string
}

variable "MAIN_SUBDOMAIN" {
  type    = string
  default = ""
}

variable "PREVIEW_SUBDOMAIN" {
  type    = string
  default = ""
}

variable "CHROMATIC_APP_ID" {
  type    = string
  default = ""
}

variable "NEXT_TELEMETRY_DISABLED" {
  type    = string
  default = ""
}

variable "SENTRY_ORG" {
  type    = string
  default = ""
}

variable "SENTRY_PROJECT" {
  type    = string
  default = ""
}

variable "SENTRY_URL" {
  type    = string
  default = ""
}

variable "NEXTAUTH_SECRET" {
  type      = string
  sensitive = true
}

variable "SCW_ACCESS_KEY" {
  type      = string
  sensitive = true
}

variable "SCW_SECRET_KEY" {
  type      = string
  sensitive = true
}

variable "SMTP_MAILDEV_USERNAME" {
  type      = string
  sensitive = true
}

variable "SMTP_MAILDEV_PASSWORD" {
  type      = string
  sensitive = true
}
