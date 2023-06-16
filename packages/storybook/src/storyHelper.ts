import { StoryObj } from '@storybook/react'

export const mobileStoryParameters = {
  chromatic: { viewports: [320, 568] },
  viewport: {
    defaultViewport: 'mobile1',
  },
} as const

export const mobileStory = <T>(story: StoryObj<T>): StoryObj<T> => {
  const mobileStoryParams = {
    ...story.parameters,
    ...mobileStoryParameters,
  }

  return {
    ...story,
    parameters: mobileStoryParams,
    name: `${story.name ?? 'Composant'} - Mobile`,
  }
}
