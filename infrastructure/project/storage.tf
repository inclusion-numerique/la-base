resource "scaleway_object_bucket" "uploads" {
  name          = var.UPLOADS_BUCKET
  force_destroy = false

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD", "POST", "PUT", "DELETE"]
    allowed_origins = ["*"]
    expose_headers  = ["Etag"]
    max_age_seconds = 3000
  }
}

resource "scaleway_object_bucket" "legacyUploads" {
  name          = var.LEGACY_UPLOADS_S3_BUCKET
  force_destroy = false

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD", "POST", "PUT", "DELETE"]
    allowed_origins = ["*"]
    expose_headers  = ["Etag"]
    max_age_seconds = 3000
  }
}

resource "scaleway_object_bucket" "backupsBucket" {
  name          = var.BACKUPS_BUCKET
  force_destroy = false

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD", "POST", "PUT", "DELETE"]
    allowed_origins = ["http://localhost:3000", "http://localhost"]
    expose_headers  = ["Etag"]
    max_age_seconds = 3000
  }
}
