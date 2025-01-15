export type LesBasesRagResource = {
  service: 'les-bases'
  type: 'base' | 'collection' | 'ressource'
  id: string
  content: string // Markdown representation of the resource
}
