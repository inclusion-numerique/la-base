export const getResourceAttributionWording = (resource: {
  published: Date | null
  lastPublished: Date | null
}): 'resource' | 'updated-resource' | 'draft-resource' => {
  if (!resource.published) {
    return 'draft-resource'
  }
  // updated resource
  if (resource.lastPublished && resource.lastPublished > resource.published) {
    return 'updated-resource'
  }
  // published resource
  return 'resource'
}
