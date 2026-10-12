data "scaleway_domain_zone" "mainDomainZone" {
  domain    = var.MAIN_ROOT_DOMAIN
  subdomain = var.MAIN_SUBDOMAIN
}

data "scaleway_domain_zone" "previewDomainZone" {
  domain    = var.PREVIEW_ROOT_DOMAIN
  subdomain = var.PREVIEW_SUBDOMAIN
}

resource "scaleway_domain_record" "main_ns0" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "NS"
  name     = ""
  data     = "ns0.dom.scw.cloud."
  ttl      = 1800
}

resource "scaleway_domain_record" "main_ns1" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "NS"
  name     = ""
  data     = "ns1.dom.scw.cloud."
  ttl      = 1800
}

resource "scaleway_domain_record" "preview_ns0" {
  dns_zone = data.scaleway_domain_zone.previewDomainZone.id
  type     = "NS"
  name     = ""
  data     = "ns0.dom.scw.cloud."
  ttl      = 1800
}

resource "scaleway_domain_record" "preview_ns1" {
  dns_zone = data.scaleway_domain_zone.previewDomainZone.id
  type     = "NS"
  name     = ""
  data     = "ns1.dom.scw.cloud."
  ttl      = 1800
}

resource "scaleway_domain_record" "spf" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "TXT"
  name     = ""
  data     = "v=spf1 ${scaleway_tem_domain.transactionalEmailDomain.spf_config} include:_spf.ox.numerique.gouv.fr -all"
  ttl      = 3600
}

resource "scaleway_domain_record" "mx" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "MX"
  name     = ""
  data     = "mx.ox.numerique.gouv.fr."
  priority = 1
  ttl      = 3600
}

resource "scaleway_domain_record" "dkim" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "TXT"
  name     = "${scaleway_tem_domain.transactionalEmailDomain.project_id}._domainkey"
  data     = scaleway_tem_domain.transactionalEmailDomain.dkim_config
  ttl      = 3600
}

resource "scaleway_domain_record" "dkim_regie_numerique_gouv" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "TXT"
  name     = "dimail._domainkey"
  data     = "v=DKIM1; h=sha256; k=rsa; p=MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA9WJwEOm4EltMAYQtDuiO6t9UAQ2F/Bxev2Ck/ERCmBFpfW12ziNFUuL3hzbeOWRV/wdWygKi/oF64hjFmBlaEcnMbcAAlQZbxnZj2f3xUJnV3e8DJQmG7EzgbLyn2jmVd76TdqN9CkEthfcUUbT72nFuSD+AZGujiJ2MdMjVscSJheN2cZnyNq5O1Ir+nmlVXimrCc8VTZF6JnnNwSX+VXz7m90cvBlWvXRvTyVvXz8qecCvLW7gJbDd818AaCHgglpgHmouAt+6PUp7IXSNvwhKSAmZgV4oamCni+b1LWAGh6TDXXX3sMIrCUDL+FGy7Yn32CggkZeaX2ztxrAE9dvzDag+BIMzG2yDhaCrUKQMvzmu0hb6llLGO6K0jRODyK9mh8mJrSW1zuIrxUXofM0MEzfXQTXorHSVuz1g+HRNJJfyGbcrHQkQC+NpwuQ956dSv3FWHY+7qVmyLUrhivfjiaM43Ozh61XoJIPqN56RuVTFGb7vObOokAHcwW6JDFS9uze8MMH7zgMVSx0IYA+uQ1/BzuIQJ1SMeHveIHWFJ20NHBClHpjjaQTM1853v2/58gmMQNBKb6mwBWWKf1droj0yL1xZNDExGfFp76WvpbNAehgEyTQALnQLS7jydgShFJEizOOHDxcAUze9sNSeRy5cKFPj7bfnv6VsKzMCAwEAAQ=="
  ttl      = 3600
}

resource "scaleway_domain_record" "cname_imap" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "CNAME"
  name     = "imap"
  data     = "imap.ox.numerique.gouv.fr."
  ttl      = 3600
}

resource "scaleway_domain_record" "cname_smtp" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "CNAME"
  name     = "smtp"
  data     = "smtp.ox.numerique.gouv.fr."
  ttl      = 3600
}

resource "scaleway_domain_record" "cname_webmail" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "CNAME"
  name     = "webmail"
  data     = "webmail.ox.numerique.gouv.fr."
  ttl      = 3600
}

resource "scaleway_domain_record" "brevo_code" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "TXT"
  name     = ""
  data     = "brevo-code:8ac99f620a9cf5718a8f484756b0d148"
  ttl      = 3600
}

resource "scaleway_domain_record" "brevo_dkim1" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "CNAME"
  name     = "brevo1._domainkey"
  data     = "b1.lesbases-anct-gouv-fr.dkim.brevo.com."
  ttl      = 3600
}

resource "scaleway_domain_record" "brevo_dkim2" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "CNAME"
  name     = "brevo2._domainkey"
  data     = "b2.lesbases-anct-gouv-fr.dkim.brevo.com."
  ttl      = 3600
}

resource "scaleway_domain_record" "brevo_dmarc" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "TXT"
  name     = "_dmarc"
  data     = "v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com"
  ttl      = 3600
}

resource "scaleway_domain_record" "cname_uploads" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "CNAME"
  name     = "storage"
  data     = "127e474a-5ed3-46d2-9be2-864a5b60bd38.svc.edge.scw.cloud."
  ttl      = 300
}

resource "scaleway_domain_record" "maildevDns" {
  dns_zone = data.scaleway_domain_zone.mainDomainZone.id
  type     = "A"
  name     = "maildev"
  data     = scaleway_instance_ip.maildev.address
  ttl      = 3600
}
