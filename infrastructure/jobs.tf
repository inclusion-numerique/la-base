resource "scaleway_container_cron" "job" {
  for_each = local.jobs

  name         = each.value.name
  container_id = scaleway_container.webContainer.id
  schedule     = each.value.schedule
  args         = each.value.args
}
