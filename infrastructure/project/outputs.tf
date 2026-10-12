output "mainDomainZoneId" {
  value = data.scaleway_domain_zone.mainDomainZone.id
}

output "transactionalEmailDomainStatus" {
  value = scaleway_tem_domain.transactionalEmailDomain.status
}

output "webContainersId" {
  value = scaleway_container_namespace.webContainers.id
}

output "databaseInstanceId" {
  value = scaleway_rdb_instance.database.id
}

output "databaseEndpointIp" {
  value = scaleway_rdb_instance.database.load_balancer[0].ip
}

output "databaseEndpointPort" {
  value = scaleway_rdb_instance.database.load_balancer[0].port
}

output "uploadsHostName" {
  value = "storage.${var.MAIN_ROOT_DOMAIN}"
}

output "maildevSmtp" {
  value = "${scaleway_instance_ip.maildev.address}:1025"
}
