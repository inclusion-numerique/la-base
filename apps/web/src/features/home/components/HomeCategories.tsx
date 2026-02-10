import { CategoryCard } from './CategoryCard/CategoryCard'
import { getHomeCategoriesCount } from './getHomeCategoriesCount'

const HomeCategories = async () => {
  const categoriesCount = await getHomeCategoriesCount()
  return (
    <ul className="fr-raw-list fr-flex fr-direction-column fr-direction-lg-row fr-flex-gap-6v">
      {Object.values(categoriesCount).map((categoryCounts) => (
        <li key={categoryCounts.category}>
          <CategoryCard
            category={categoryCounts.category}
            resourcesCount={categoryCounts.resources}
          />
        </li>
      ))}
    </ul>
  )
}

export default HomeCategories
