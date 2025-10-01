import type { StoryObj } from '@storybook/nextjs'

export const mobileStoryParameters = {
  chromatic: { viewports: [320, 568] },
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'mobile1',
  },
} satisfies StoryObj['parameters']

export const mobileStory = <T extends { parameters?: StoryObj['parameters'] }>(
  story: T,
): T => {
  const mobileStoryParams = {
    ...story.parameters,
    ...mobileStoryParameters,
  }

  return {
    ...story,
    parameters: mobileStoryParams,
  }
}

export const mediumContainerStoryParameters = {
  chromatic: { viewports: [792] },
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'mediumContainer',
  },
} satisfies StoryObj['parameters']

export const mediumContainerStory = <
  T extends { parameters?: StoryObj['parameters'] },
>(
  story: T,
): T => {
  const mediumContainerStoryParams = {
    ...story.parameters,
    ...mediumContainerStoryParameters,
  }

  return {
    ...story,
    parameters: mediumContainerStoryParams,
  }
}
