import { Theme } from '@prisma/client'
import { getResourcesCountByTheme } from '@app/web/server/resources/getResourcesList'
import { categoryThemes, themeLabels } from '@app/web/themes/themes'

export const getHomeCategoriesCount = async () => {
  const categoriesCount = await getResourcesCountByTheme({
    user: null,
  })

  return Object.entries(categoryThemes).map(([category, themes]) => {
    let resourcesCount = 0
    const themesInfo: {
      title: string
      count: number
      theme: Theme
    }[] = []

    for (const theme of themes) {
      const themeResourcesCount = categoriesCount[theme]
      themesInfo.push({
        theme,
        title: themeLabels[theme],
        count: themeResourcesCount,
      })
      resourcesCount += themeResourcesCount
    }

    return {
      title: category,
      resourcesCount,
      themes: themesInfo,
    }
  })
}
