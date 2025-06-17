import { CategoryCard } from './CategoryCard/CategoryCard'
import { getHomeCategoriesCount } from './getHomeCategoriesCount'

const HomeCategories = async () => {
  const categoriesCount = await getHomeCategoriesCount()
  return (
    <div className="fr-col-md-10 fr-flex fr-direction-column fr-direction-md-row fr-flex-gap-6v fr-justify-content-center">
      {Object.values(categoriesCount).map((categoryCounts) => (
        <CategoryCard
          key={categoryCounts.category}
          category={categoryCounts.category}
          resourcesCount={categoryCounts.resources}
        />
      ))}
    </div>
  )
}

export default HomeCategories
