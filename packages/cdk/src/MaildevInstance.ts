import { InstanceIp } from '@app/scaleway/instance-ip'
import { InstanceSecurityGroup } from '@app/scaleway/instance-security-group'
import { InstanceServer } from '@app/scaleway/instance-server'
import { TerraformOutput } from 'cdktf'
import { Construct } from 'constructs'

const MAILDEV_WEB_PORT = 80
const MAILDEV_SMTP_PORT = 1025
const MAILDEV_VOLUME = '/home/scaleway/maildev'

export class MaildevInstance extends Construct {
  public readonly webUrl: TerraformOutput
  public readonly smtp: TerraformOutput
  public readonly publicIpAddress: TerraformOutput

  constructor(
    scope: Construct,
    id: string,
    smtpCredentials: {
      username: string
      password: string
    },
  ) {
    super(scope, id)

    const publicIp = new InstanceIp(this, 'maildevPublicIp', {})

    const sg = new InstanceSecurityGroup(this, 'maildevSecurityGroup', {
      name: 'maildev-security-group',
      inboundDefaultPolicy: 'drop',
      outboundDefaultPolicy: 'accept',

      inboundRule: [
        { action: 'accept', port: MAILDEV_WEB_PORT },
        { action: 'accept', port: 443 },
        { action: 'accept', port: MAILDEV_SMTP_PORT },
        { action: 'accept', port: 22 },
      ],
    })

    new InstanceServer(this, 'maildevServer', {
      name: 'maildev',
      type: 'STARDUST1-S',
      image: 'docker',
      ipId: publicIp.id,
      securityGroupId: sg.id,
      userData: {
        'cloud-init': `#cloud-config
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
    
    echo "[2/5] Creating maildev volume at ${MAILDEV_VOLUME}..."
    mkdir -p ${MAILDEV_VOLUME}
    chown 1000:1000 ${MAILDEV_VOLUME}
    echo "✓ Volume created and permissions set"
    
    echo "[3/5] Cleaning up existing maildev container..."
    docker stop maildev 2>/dev/null || true
    docker rm maildev 2>/dev/null || true
    echo "✓ Cleanup completed"
    
    echo "[4/5] Starting maildev container..."
    docker run -d --restart always --name maildev \
      -p ${MAILDEV_WEB_PORT}:1080 \
      -p ${MAILDEV_SMTP_PORT}:${MAILDEV_SMTP_PORT} \
      -v ${MAILDEV_VOLUME}:/maildev \
      -e MAILDEV_INCOMING_USER=${smtpCredentials.username} \
      -e MAILDEV_INCOMING_PASS=${smtpCredentials.password} \
      maildev/maildev:latest
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
`,
      },
    })

    this.webUrl = new TerraformOutput(this, 'maildevWebUrl', {
      value: `http://${publicIp.address}:${MAILDEV_WEB_PORT}`,
    })

    this.smtp = new TerraformOutput(this, 'maildevSmtp', {
      value: `${publicIp.address}:${MAILDEV_SMTP_PORT}`,
    })

    this.publicIpAddress = new TerraformOutput(this, 'publicIpAddress', {
      value: publicIp.address,
    })
  }

  getMaildevSmtp() {
    return this.smtp.value as string
  }

  getPublicIpAddress() {
    return this.publicIpAddress.value as string
  }
}
