terraform {
  required_version = "~> 1.13.0"

  required_providers {
    scaleway = {
      source  = "scaleway/scaleway"
      version = "2.83.1"
    }
  }

  backend "s3" {
    bucket                      = "la-base-terraform-state"
    region                      = "fr-par"
    endpoints                   = { s3 = "https://s3.fr-par.scw.cloud" }
    skip_credentials_validation = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_metadata_api_check     = true
    skip_s3_checksum            = true
  }
}

provider "scaleway" {
  project_id = var.SCW_PROJECT_ID
}
