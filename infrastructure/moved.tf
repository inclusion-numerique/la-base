moved {
  from = scaleway_container_cron.trigger-backup-main-database-hourly
  to   = scaleway_container_cron.job["backup-database-hourly"]
}

moved {
  from = scaleway_container_cron.trigger-backup-main-database-daily
  to   = scaleway_container_cron.job["backup-database-daily"]
}

moved {
  from = scaleway_container_cron.trigger-backup-main-database-weekly
  to   = scaleway_container_cron.job["backup-database-weekly"]
}

moved {
  from = scaleway_container_cron.trigger-monthly-newsletter-news-feed
  to   = scaleway_container_cron.job["monthly-newsletter-news-feed"]
}

moved {
  from = scaleway_container_cron.trigger-account-inactivity-main
  to   = scaleway_container_cron.job["account-inactivity"]
}
