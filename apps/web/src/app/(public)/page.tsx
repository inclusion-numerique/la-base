import HomeCategories from '@app/web/app/(public)/HomeCategories'
import Banner from '@app/web/app/(public)/Banner'
import HomeInfo from '@app/web/app/(public)/HomeInfo'
import Webinaire from '@app/web/app/(public)/Webinaire'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

export const revalidate = 0

const HomePage = () => (
  <>
    <SkipLinksPortal links={defaultSkipLinks} />
    <main id={contentId}>
      <Banner />
      <HomeCategories />
      <HomeInfo />
      <Webinaire />
    </main>
  </>
)

export default HomePage
