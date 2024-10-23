import 'jest'
import 'jest-extended'
import 'jest-extended/all'
import path from 'node:path'
import { TextDecoder, TextEncoder } from 'node:util'
import * as dotenv from 'dotenv'
import '@testing-library/jest-dom'
import { getDirname } from '@app/config/dirname'

dotenv.config({
  path: path.resolve(getDirname(import.meta.url), '../.env'),
})

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as never
