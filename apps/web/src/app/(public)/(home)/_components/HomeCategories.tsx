import { CategoryCard } from './CategoryCard/CategoryCard'
import { getHomeCategoriesCount } from './getHomeCategoriesCount'

const HomeCategories = async () => {
  const categoriesCount = await getHomeCategoriesCount()
  return (
    <div className="fr-grid-row fr-grid-row--gutters">
      {Object.values(categoriesCount).map((categoryCounts) => (
        <div className="fr-col-md-6 fr-col-12" key={categoryCounts.category}>
          <CategoryCard
            category={categoryCounts.category}
            resourcesCount={categoryCounts.resources}
            thematicCount={categoryCounts.themes.length}
          />
        </div>
      ))}
    </div>
  )
}

export default HomeCategories
