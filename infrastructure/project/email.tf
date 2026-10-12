resource "scaleway_tem_domain" "transactionalEmailDomain" {
  name       = var.EMAIL_FROM_DOMAIN
  accept_tos = true
}
