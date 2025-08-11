'use client'

import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import {
  CreateWidgetOptions,
  FRCWidgetCompleteEvent,
  FRCWidgetErrorEventData,
  FriendlyCaptchaSDK,
  WidgetErrorData,
} from '@friendlycaptcha/sdk'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

let sdkSingleton: FriendlyCaptchaSDK | null = null
function getSdk(): FriendlyCaptchaSDK {
  if (!sdkSingleton) {
    sdkSingleton = new FriendlyCaptchaSDK({
      apiEndpoint: 'global',
      disableEvalPatching: process.env.NODE_ENV === 'development',
    })
  }
  return sdkSingleton
}

export type CaptchaWidgetProps = Omit<CreateWidgetOptions, 'element'> & {
  onComplete?: (response: string) => void
  onError?: (error: WidgetErrorData) => void
  onExpire?: () => void
}

export type CaptchaWidgetHandle = { reset: () => void }

const CaptchaWidget = forwardRef<
  CaptchaWidgetHandle,
  CaptchaWidgetProps & { className?: string }
>(({ className, ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<ReturnType<
    FriendlyCaptchaSDK['createWidget']
  > | null>(null)

  // Keep latest handlers without re-creating the widget
  const onCompleteRef = useRef(props.onComplete)
  const onErrorRef = useRef(props.onError)
  const onExpireRef = useRef(props.onExpire)

  useEffect(() => {
    onCompleteRef.current = props.onComplete
    onErrorRef.current = props.onError
    onExpireRef.current = props.onExpire
  }, [props.onComplete, props.onError, props.onExpire])

  // Mount widget once to avoid blinking
  // biome-ignore lint/correctness/useExhaustiveDependencies: we intentionally mount once and keep handlers via refs
  useEffect(() => {
    if (!containerRef.current) return

    const captcha = getSdk().createWidget({
      element: containerRef.current,
      ...props,
      sitekey: PublicWebAppConfig.FriendlyCaptcha.siteKey,
      apiEndpoint: 'global',
      language: 'fr',
      formFieldName: 'captcha',
    })
    widgetRef.current = captcha

    const handleComplete = (e: Event) => {
      const detail = (e as unknown as FRCWidgetCompleteEvent).detail
      onCompleteRef.current?.(detail.response)
    }
    const handleError = (e: Event) => {
      const detail = (e as unknown as CustomEvent<FRCWidgetErrorEventData>)
        .detail
      onErrorRef.current?.(detail.error)
    }
    const handleExpire = () => {
      onExpireRef.current?.()
    }

    containerRef.current.addEventListener('frc:widget.complete', handleComplete)
    containerRef.current.addEventListener('frc:widget.error', handleError)
    containerRef.current.addEventListener('frc:widget.expire', handleExpire)

    return () => {
      containerRef.current?.removeEventListener(
        'frc:widget.complete',
        handleComplete,
      )
      containerRef.current?.removeEventListener('frc:widget.error', handleError)
      containerRef.current?.removeEventListener(
        'frc:widget.expire',
        handleExpire,
      )
      widgetRef.current?.destroy()
      widgetRef.current = null
    }
  }, [])

  useImperativeHandle(ref, () => ({
    reset: () => widgetRef.current?.reset(),
  }))

  return (
    <div
      className={className}
      ref={containerRef}
      style={{
        // minHeight to avoid layout shift while widget is loading
        minHeight: 68,
      }}
    />
  )
})

export default CaptchaWidget
