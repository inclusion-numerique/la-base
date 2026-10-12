resource "scaleway_cockpit" "cockpit" {}

resource "scaleway_cockpit_token" "cockpitWebToken" {
  name = "web-app"

  scopes {
    query_logs          = true
    query_metrics       = true
    setup_alerts        = false
    setup_logs_rules    = false
    setup_metrics_rules = false
    write_logs          = true
    write_metrics       = true
  }
}
