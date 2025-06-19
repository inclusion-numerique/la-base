import { region } from '@app/config/config'
import axios from 'axios'

export const projectId = process.env.SCW_PROJECT_ID ?? ''

const authToken =
  process.env.SCW_API_KEY_SECRET ?? process.env.SCW_SECRET_KEY ?? ''

// https://developers.scaleway.com/en/products/secret_manager/api/v1alpha1/#introduction
export const secretClient = axios.create({
  baseURL: `https://api.scaleway.com/secret-manager/v1alpha1/regions/${region}/secrets`,
  headers: { 'X-Auth-Token': authToken },
  params: {
    project_id: projectId,
  },
})
