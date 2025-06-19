import type { NextRequest } from 'next/server'

export const isFirewallUserAgent = (request: NextRequest): boolean => {
  const userAgent = request.headers.get('user-agent') || ''

  // Liste étendue des signatures connues des agents utilisateurs de pare-feu
  const firewallUserAgents = [
    /Bitdefender/,
    /Kaspersky/,
    /Norton/,
    /McAfee/,
    /Trend Micro/,
    /Sophos/,
    /F-Secure/,
    /Avast/,
    /Avira/,
    /Comodo/,
    /Stormshield/,
    /Fortinet/,
    /FortiGate/,
    /Palo Alto/,
    /Cisco/,
    /Check Point/,
    /Juniper/,
    /Symantec/,
    /Webroot/,
    /ESET/,
    /Barracuda/,
    /SonicWall/,
    /FireEye/,
    /WatchGuard/,
    /Cyberoam/,
    /Dr.Web/,
    /Panda Security/,
  ]

  // Liste étendue des signatures connues des clients de messagerie
  const mailClientUserAgents = [
    /Outlook/,
    /Microsoft Outlook/,
    /Microsoft Office/,
    /Windows NT [\d.]+; WOW64; Microsoft Outlook/,
    /MSOffice/,
    /Thunderbird/,
    /Apple Mail/,
    /Mail/,
    /Gmail/,
    /YahooMail/,
    /YahooMobile/,
    /Mailbird/,
    /eM Client/,
    /Zoho Mail/,
    /Airmail/,
    /Postbox/,
    /Spark/,
    /Mailspring/,
    /The Bat!/,
    /Foxmail/,
    /BlueMail/,
    /Claws Mail/,
    /SeaMonkey/,
    /IncrediMail/,
    /K-9 Mail/,
    /AquaMail/,
    /ProtonMail/,
    /Tutanota/,
    /Newton Mail/,
    /Canary Mail/,
    /FastMail/,
  ]

  // Vérification des agents utilisateurs suspects
  const isFirewall = firewallUserAgents.some((pattern) =>
    pattern.test(userAgent),
  )
  const isMailClient = mailClientUserAgents.some((pattern) =>
    pattern.test(userAgent),
  )

  return isFirewall || isMailClient
}
