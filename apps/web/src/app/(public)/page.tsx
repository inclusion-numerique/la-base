import HomeCategories from '@app/web/app/(public)/HomeCategories'
import Banner from '@app/web/app/(public)/Banner'

export const revalidate = 0

const HomePage = () => (
  <>
    <Banner />
    <HomeCategories />
  </>
)

export default HomePage
