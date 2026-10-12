variable "branch" {
  type = string
}

variable "namespace" {
  type = string
}

variable "BREVO_USERS_LIST_ID" {
  type = string
}

variable "SCW_PROJECT_ID" {
  type = string
}

variable "WEB_CONTAINER_IMAGE" {
  type = string
}

variable "NEXT_PUBLIC_APP_SLUG" {
  type = string
}

variable "NEXT_PUBLIC_APP_NAME" {
  type = string
}

variable "DATABASE_INSTANCE_NAME" {
  type = string
}

variable "CONTAINER_NAMESPACE_NAME" {
  type = string
}

variable "SCW_DEFAULT_REGION" {
  type = string
}

variable "MAIN_ROOT_DOMAIN" {
  type = string
}

variable "PREVIEW_ROOT_DOMAIN" {
  type = string
}

variable "SMTP_PORT" {
  type = string
}

variable "UPLOADS_BUCKET" {
  type = string
}

variable "REPORT_MODERATOR_EMAIL_MAIN" {
  type = string
}

variable "REPORT_MODERATOR_EMAIL_PREVIEW" {
  type = string
}

variable "REPORT_MODERATOR_NAME_MAIN" {
  type = string
}

variable "REPORT_MODERATOR_NAME_PREVIEW" {
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

variable "BREVO_API_KEY" {
  type      = string
  sensitive = true
}

variable "DATABASE_PASSWORD" {
  type      = string
  sensitive = true
}

variable "FRIENDLY_CAPTCHA_API_KEY" {
  type      = string
  sensitive = true
}

variable "PROCONNECT_PREVIEW_CLIENT_SECRET" {
  type      = string
  sensitive = true
}

variable "PROCONNECT_MAIN_CLIENT_SECRET" {
  type      = string
  sensitive = true
}

variable "SMTP_PASSWORD" {
  type      = string
  sensitive = true
}

variable "SMTP_SERVER" {
  type      = string
  sensitive = true
}

variable "SMTP_USERNAME" {
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
