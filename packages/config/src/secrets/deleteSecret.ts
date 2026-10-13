import { secretClient } from '@app/config/secrets/secretClient'

export const deleteSecret = (id: string) => secretClient.delete(`/${id}`)
