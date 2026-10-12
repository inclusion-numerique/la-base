moved {
  from = scaleway_instance_ip.maildev_maildevPublicIp_5C6D1219
  to   = scaleway_instance_ip.maildev
}

moved {
  from = scaleway_instance_security_group.maildev_maildevSecurityGroup_F1AC5A7E
  to   = scaleway_instance_security_group.maildev
}

moved {
  from = scaleway_instance_server.maildev_maildevServer_C85D3E36
  to   = scaleway_instance_server.maildev
}
