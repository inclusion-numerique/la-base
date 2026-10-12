resource "scaleway_object_bucket" "uploads" {
  name          = "${var.NEXT_PUBLIC_APP_SLUG}-uploads-${var.namespace}"
  force_destroy = !local.is_main

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD", "POST", "PUT", "DELETE"]
    allowed_origins = ["https://${local.hostname}"]
    expose_headers  = ["Etag"]
    max_age_seconds = 3000
  }
}
