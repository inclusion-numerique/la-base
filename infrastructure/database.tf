data "scaleway_rdb_instance" "dbInstance" {
  name = var.DATABASE_INSTANCE_NAME
}

resource "scaleway_rdb_user" "databaseUser" {
  instance_id = data.scaleway_rdb_instance.dbInstance.instance_id
  name        = local.database_user
  password    = var.DATABASE_PASSWORD
}

resource "scaleway_rdb_database" "database" {
  instance_id = data.scaleway_rdb_instance.dbInstance.instance_id
  name        = local.database_name
}

resource "scaleway_rdb_privilege" "databasePrivilege" {
  instance_id   = data.scaleway_rdb_instance.dbInstance.instance_id
  database_name = local.database_name
  user_name     = local.database_user
  permission    = "all"

  depends_on = [
    scaleway_rdb_database.database,
    scaleway_rdb_user.databaseUser,
  ]
}
