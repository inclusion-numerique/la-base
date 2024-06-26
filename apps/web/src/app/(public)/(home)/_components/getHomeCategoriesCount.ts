import type { Theme } from '@prisma/client'
import {
  getResourcesCountByCategory,
  getResourcesCountByTheme,
} from '@app/web/server/resources/getResourcesList'
import { categories, Category, categoryThemes } from '@app/web/themes/themes'

export const getHomeCategoriesCount = async () => {
  const themesCount = await getResourcesCountByTheme()

  const categoriesCount = await getResourcesCountByCategory()

  return Object.fromEntries(
    categories.map((category) => {
      const counts = {
        category,
        resources: categoriesCount[category],
        themes: categoryThemes[category].map((theme) => ({
          theme,
          resources: themesCount[theme],
        })),
      } satisfies {
        category: Category
        resources: number
        themes: {
          theme: Theme
          resources: number
        }[]
      }

      return [category, counts]
    }),
  ) as unknown as {
    [category in Category]: {
      category: Category
      resources: number
      themes: {
        theme: Theme
        resources: number
      }[]
    }
  }
}

export type HomeCategoriesCount = Awaited<
  ReturnType<typeof getHomeCategoriesCount>
>
export type HomeCategoryCounts = HomeCategoriesCount[Category]
