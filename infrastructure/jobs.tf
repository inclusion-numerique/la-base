resource "scaleway_container_trigger" "job" {
  for_each = local.jobs

  name         = each.value.name
  container_id = scaleway_container.webContainer.id

  cron {
    schedule = each.value.schedule
    timezone = "Etc/UTC"
    body     = each.value.body
  }

  destination_config {
    http_path   = "/"
    http_method = "post"
  }
}
