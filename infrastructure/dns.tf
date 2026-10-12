locals {
  container_domain_name = trimsuffix(trimprefix(scaleway_container.webContainer.public_endpoint, "https://"), "/")
}

data "scaleway_domain_zone" "dnsZone" {
  domain    = local.is_main ? var.MAIN_ROOT_DOMAIN : var.PREVIEW_ROOT_DOMAIN
  subdomain = local.is_main ? var.MAIN_SUBDOMAIN : var.PREVIEW_SUBDOMAIN
}

resource "scaleway_domain_record" "webDnsRecord" {
  dns_zone = data.scaleway_domain_zone.dnsZone.id
  type     = local.subdomain == "" ? "ALIAS" : "CNAME"
  name     = local.subdomain
  data     = "${local.container_domain_name}."
  ttl      = 300
}

resource "scaleway_container_domain" "webContainerDomain" {
  container_id = scaleway_container.webContainer.id
  hostname     = local.hostname

  depends_on = [
    scaleway_domain_record.webDnsRecord,
    scaleway_container.webContainer,
  ]
}
