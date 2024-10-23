import Script from 'next/script'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

// The Next <Script> tag expect a nonce as Next directly inject the code from the script file in an inline <script> tag
export const Matomo = ({ nonce }: { nonce?: string }) =>
  PublicWebAppConfig.isMain &&
  process.env.NODE_ENV === 'production' &&
  PublicWebAppConfig.Matomo.host ? (
    <Script
      id="matomo"
      nonce={nonce}
      strategy="lazyOnload"
    >{`var _paq = window._paq = window._paq || [];_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function() {var u="//${PublicWebAppConfig.Matomo.host}/";_paq.push(['setTrackerUrl', u+'matomo.php']);_paq.push(['setSiteId', '${PublicWebAppConfig.Matomo.siteId}']);var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);})();`}</Script>
  ) : null
