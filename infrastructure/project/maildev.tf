resource "scaleway_instance_ip" "maildev" {}

resource "scaleway_instance_security_group" "maildev" {
  name                    = "maildev-security-group"
  inbound_default_policy  = "drop"
  outbound_default_policy = "accept"

  inbound_rule {
    action = "accept"
    port   = 80
  }

  inbound_rule {
    action = "accept"
    port   = 443
  }

  inbound_rule {
    action = "accept"
    port   = 1025
  }

  inbound_rule {
    action = "accept"
    port   = 22
  }
}

resource "scaleway_instance_server" "maildev" {
  name              = "maildev"
  type              = "DEV1-S"
  image             = "docker"
  ip_id             = scaleway_instance_ip.maildev.id
  security_group_id = scaleway_instance_security_group.maildev.id

  user_data = {
    cloud-init = <<EOT
#cloud-config
runcmd:
  - |
    set -e
    exec >> /var/log/maildev-setup.log 2>&1
    
    echo "=========================================="
    echo "Maildev setup started at $(date)"
    echo "=========================================="
    
    echo "[1/5] Waiting for Docker to be ready..."
    timeout 300 bash -c 'until docker info; do sleep 5; done'
    echo "✓ Docker is ready"
    
    echo "[2/5] Creating maildev volume at /home/scaleway/maildev..."
    mkdir -p /home/scaleway/maildev
    chown 1000:1000 /home/scaleway/maildev
    echo "✓ Volume created and permissions set"
    
    echo "[3/5] Cleaning up existing maildev container..."
    docker stop maildev 2>/dev/null || true
    docker rm maildev 2>/dev/null || true
    echo "✓ Cleanup completed"
    
    echo "[4/5] Starting maildev container..."
    docker run -d --restart always --name maildev       -p 80:1080       -p 1025:1025       -v /home/scaleway/maildev:/maildev       -e MAILDEV_INCOMING_USER=${var.SMTP_MAILDEV_USERNAME}       -e MAILDEV_INCOMING_PASS=${var.SMTP_MAILDEV_PASSWORD}       maildev/maildev:latest
    echo "✓ Container started"
    
    echo "[5/5] Verifying maildev is running..."
    docker ps | grep maildev
    echo "✓ Maildev is running successfully"
    
    echo "=========================================="
    echo "Maildev setup completed at $(date)"
    echo "=========================================="

write_files:
  - path: /var/log/maildev-setup.log
    permissions: '0644'
    content: |
      Maildev setup started
EOT
  }
}
