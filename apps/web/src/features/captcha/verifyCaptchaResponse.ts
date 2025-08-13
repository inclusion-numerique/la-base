import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import axios from 'axios'

type FriendlyCaptchaVerifySuccess = {
  success: true
  data?: {
    challenge?: {
      timestamp: string
      origin?: string
    }
  }
}

type FriendlyCaptchaVerifyError = {
  success: false
  error: {
    error_code:
      | 'auth_required'
      | 'auth_invalid'
      | 'sitekey_invalid'
      | 'response_missing'
      | 'response_invalid'
      | 'response_timeout'
      | 'response_duplicate'
      | 'bad_request'
    detail?: string
  }
}

export type FriendlyCaptchaVerifyResponse =
  | FriendlyCaptchaVerifySuccess
  | FriendlyCaptchaVerifyError

export async function verifyCaptchaResponse(
  response: string,
): Promise<FriendlyCaptchaVerifyResponse> {
  const apiKey = ServerWebAppConfig.FriendlyCaptcha.apiKey
  const sitekey = PublicWebAppConfig.FriendlyCaptcha.siteKey

  if (!apiKey) {
    throw new Error('FriendlyCaptcha API key is missing')
  }
  if (!sitekey) {
    throw new Error('FriendlyCaptcha sitekey is missing')
  }

  try {
    const { data } = await axios.post<FriendlyCaptchaVerifyResponse>(
      'https://global.frcapi.com/api/v2/captcha/siteverify',
      { response, sitekey },
      { headers: { 'X-API-Key': apiKey } },
    )
    return data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return error.response.data as FriendlyCaptchaVerifyResponse
    }
    throw error
  }
}
