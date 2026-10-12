resource "scaleway_rdb_instance" "database" {
  name                      = var.DATABASE_INSTANCE_NAME
  engine                    = "PostgreSQL-17"
  is_ha_cluster             = true
  node_type                 = "db-pro2-xxs"
  disable_backup            = false
  backup_same_region        = false
  backup_schedule_frequency = 24
  backup_schedule_retention = 14
  volume_type               = "sbs_15k"
  volume_size_in_gb         = 30
  encryption_at_rest        = true

  settings = {
    max_connections                 = "500"
    effective_cache_size            = "2700"
    maintenance_work_mem            = "300"
    max_parallel_workers            = "1"
    max_parallel_workers_per_gather = "0"
    work_mem                        = "8"
  }
}

resource "scaleway_secret" "databaseInstanceId" {
  name        = "DATABASE_INSTANCE_ID"
  description = "Instance id of managed database instance. Used for api interactions."
}

resource "scaleway_secret_version" "databaseInstanceIdVersion" {
  secret_id = scaleway_secret.databaseInstanceId.id
  data      = scaleway_rdb_instance.database.id
}
