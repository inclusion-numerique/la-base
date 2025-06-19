import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { createTransport } from 'nodemailer'

export const emailTransport = createTransport(ServerWebAppConfig.Email.server)
