import { projectSlug, region } from '@app/config/config'
import axios, { type AxiosInstance } from 'axios'
import type { RegistryImage, RegistryTag } from './registryRetention'

const DEFAULT_SCW_REGION = 'fr-par'
const PAGE_SIZE = 100

export const webAppRegistryNamespace = `${projectSlug}-web-app`

export const webAppImagePrefix = `${projectSlug}-web-`

type ScalewayImage = { id: string; name: string }

type ScalewayTag = { id: string; name: string; created_at: string }

const registryClient = (): AxiosInstance => {
  const secretKey = process.env.SCW_SECRET_KEY
  if (!secretKey) {
    throw new Error('Missing SCW_SECRET_KEY env variable')
  }
  return axios.create({
    baseURL: `https://api.scaleway.com/registry/v1/regions/${region || DEFAULT_SCW_REGION}`,
    headers: { 'X-Auth-Token': secretKey },
  })
}

const allPages = async <T>(
  fetchPage: (page: number) => Promise<{ items: T[]; total: number }>,
  page = 1,
  collected: T[] = [],
): Promise<T[]> => {
  const { items, total } = await fetchPage(page)
  const all = [...collected, ...items]
  return all.length >= total || items.length === 0
    ? all
    : allPages(fetchPage, page + 1, all)
}

const namespaceId = async (client: AxiosInstance): Promise<string> => {
  const { data } = await client.get<{
    namespaces: { id: string; name: string }[]
  }>('/namespaces', {
    params: {
      name: webAppRegistryNamespace,
      project_id: process.env.SCW_PROJECT_ID,
    },
  })
  const namespace = data.namespaces.find(
    ({ name }) => name === webAppRegistryNamespace,
  )
  if (!namespace) {
    throw new Error(`Registry namespace "${webAppRegistryNamespace}" not found`)
  }
  return namespace.id
}

export const listWebAppImages = async (): Promise<RegistryImage[]> => {
  const client = registryClient()
  const namespace = await namespaceId(client)
  const images = await allPages<ScalewayImage>(async (page) => {
    const { data } = await client.get<{
      images: ScalewayImage[]
      total_count: number
    }>('/images', {
      params: { namespace_id: namespace, page, page_size: PAGE_SIZE },
    })
    return { items: data.images, total: data.total_count }
  })
  return images.map(({ id, name }) => ({ id, name }))
}

export const listImageTags = async (
  imageId: string,
): Promise<RegistryTag[]> => {
  const client = registryClient()
  const tags = await allPages<ScalewayTag>(async (page) => {
    const { data } = await client.get<{
      tags: ScalewayTag[]
      total_count: number
    }>(`/images/${imageId}/tags`, {
      params: { page, page_size: PAGE_SIZE, order_by: 'created_at_desc' },
    })
    return { items: data.tags, total: data.total_count }
  })
  return tags.map(({ id, name, created_at }) => ({
    id,
    name,
    createdAt: created_at,
  }))
}

const alreadyGone = (error: unknown): boolean =>
  axios.isAxiosError(error) && error.response?.status === 404

const ignoringAlreadyGone = (deletion: Promise<unknown>): Promise<void> =>
  deletion.then(
    () => undefined,
    (error: unknown) => {
      if (alreadyGone(error)) return
      throw error
    },
  )

export const deleteTag = (tagId: string): Promise<void> =>
  ignoringAlreadyGone(
    registryClient().delete(`/tags/${tagId}`, { params: { force: true } }),
  )

export const deleteImage = (imageId: string): Promise<void> =>
  ignoringAlreadyGone(registryClient().delete(`/images/${imageId}`))
