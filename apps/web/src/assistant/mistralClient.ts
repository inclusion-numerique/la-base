import MistralClient from '@mistralai/mistralai'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

export const mistralClient = new MistralClient(
  ServerWebAppConfig.Mistral.apiKey,
)
