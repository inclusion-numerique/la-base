import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import { getFeaturedBlocksListPageData } from '@app/web/features/administration/landing/db/getFeaturedBlocksListPageData'
import AdministrationLandingCard from '@app/web/features/administration/landing/components/AdministrationLandingCard'

const MAX_FEATURED_BLOCKS_RESOURCES = 6
const MAX_FEATURED_BLOCKS_BASES = 3
const MAX_FEATURED_BLOCKS_PROFILES = 3

const AdministrationLandingPage = async () => {
  const { featuredBases, featuredResources, featuredProfiles } =
    await getFeaturedBlocksListPageData()

  const profiles = featuredProfiles
    .filter(
      (
        featuredProfile,
      ): featuredProfile is {
        profile: { id: string; name: string }
      } => !!featuredProfile.profile,
    )
    .map(({ profile }) => profile)
  const resources = featuredResources
    .filter(
      (
        featuredResource,
      ): featuredResource is {
        resource: { id: string; title: string }
      } => !!featuredResource.resource,
    )
    .map(({ resource }) => resource)

  const bases = featuredBases
    .filter(
      (
        featuredBase,
      ): featuredBase is {
        base: { id: string; title: string; slug: string }
      } => !!featuredBase.base,
    )
    .map(({ base }) => base)

  return (
    <AdministrationPageContainer>
      <AdministrationBreadcrumbs currentPage="Blocs mis en avant" />
      <AdministrationTitle icon="ri-star-line">
        Blocs mis en avant
      </AdministrationTitle>
      <AdministrationLandingCard
        title="Les ressources à la une"
        type="resource"
        placeholder="Rechercher une ressource par titre"
        max={MAX_FEATURED_BLOCKS_RESOURCES}
        blocks={resources}
      />
      <AdministrationLandingCard
        title="Les bases à la une"
        type="base"
        placeholder="Rechercher une base par titre"
        max={MAX_FEATURED_BLOCKS_BASES}
        blocks={bases}
      />
      <AdministrationLandingCard
        title="Les profils à la une"
        type="profile"
        placeholder="Rechercher un profil par nom"
        max={MAX_FEATURED_BLOCKS_PROFILES}
        blocks={profiles}
      />
    </AdministrationPageContainer>
  )
}

export default AdministrationLandingPage
