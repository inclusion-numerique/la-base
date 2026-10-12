output "webBaseUrl" {
  value = local.hostname
}

output "containerDomainName" {
  value = local.container_domain_name
}

output "databaseHost" {
  value = data.scaleway_rdb_instance.dbInstance.endpoint_ip
}

output "databasePort" {
  value = data.scaleway_rdb_instance.dbInstance.endpoint_port
}

output "databaseUser" {
  value = local.database_user
}

output "databaseName" {
  value = local.database_name
}

output "databaseUrl" {
  value     = local.database_url
  sensitive = true
}

output "databasePassword" {
  value     = var.DATABASE_PASSWORD
  sensitive = true
}

output "webContainerStatus" {
  value = scaleway_container.webContainer.status
}

output "webContainerId" {
  value = scaleway_container.webContainer.id
}

output "webContainerImage" {
  value = var.WEB_CONTAINER_IMAGE
}
