'use client'

import { hasOpenedOnboardingV2Cookie } from '@app/web/app/nouveautes/onboardingV2Cookie'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

const AddOpenedOnboardingCookie = () => {
  useEffect(() => {
    Cookies.set(hasOpenedOnboardingV2Cookie, new Date().toISOString(), {
      sameSite: 'strict',
      expires: 1,
    })
  }, [])
  return null
}

export default AddOpenedOnboardingCookie
