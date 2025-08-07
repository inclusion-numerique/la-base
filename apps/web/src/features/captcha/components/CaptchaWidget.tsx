'use client'

import {
  FRCWidgetCompleteEvent,
  FriendlyCaptchaSDK,
  CreateWidgetOptions,
  WidgetErrorData,
  FRCWidgetErrorEventData,
} from '@friendlycaptcha/sdk'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const sdk = new FriendlyCaptchaSDK({
  apiEndpoint: 'eu',
  disableEvalPatching: process.env.NODE_ENV === 'development', // Next.js uses eval in dev mode.
})

type Props = Omit<CreateWidgetOptions, 'element'> & {
  onComplete?: (response: string) => void
  onError?: (error: WidgetErrorData) => void
  onExpire?: () => void
}

const FriendlyCaptcha = forwardRef<Props>((props, ref) => {
  const captchaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (captchaRef.current) {
      const captcha = sdk.createWidget({
        element: captchaRef.current,
        ...props,
      })

      if (props.onComplete) {
        captchaRef.current.addEventListener('frc:widget.complete', (e) => {
          props.onComplete!((e as FRCWidgetCompleteEvent).detail.response)
        })
      }

      if (props.onError) {
        captchaRef.current.addEventListener('frc:widget.error', (e) => {
          props.onError!(
            (e as CustomEvent<FRCWidgetErrorEventData>).detail.error,
          )
        })
      }

      if (props.onExpire) {
        captchaRef.current.addEventListener('frc:widget.expire', () => {
          props.onExpire!()
        })
      }

      return () => captcha?.destroy()
    }
  }, Object.values(props))

  // Expose the reset method to the parent component
  useImperativeHandle(ref, () => ({
    reset: () => {
      captchaRef.current?.reset()
    },
  }))

  return <div ref={ref} />
})

export default FriendlyCaptcha
