import axios, { CanceledError } from 'axios'
import { useCallback, useRef, useState } from 'react'
import EventEmitter from 'eventemitter3'
import * as Sentry from '@sentry/nextjs'
import { trpc } from '@app/web/trpc'

export const useFileUpload = () => {
  const [uploading, setUploading] = useState<boolean>(false)

  const progressEmitterRef = useRef(
    // eslint-disable-next-line unicorn/prefer-event-target
    new EventEmitter<'progress', number | null>(),
  )

  const [filename, setFilename] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController>()

  const generateUploadUrl = trpc.upload.generateUploadUrl.useMutation()

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      // This will throw an error in the axios request in the upload() method
      abortControllerRef.current.abort()
    }
  }, [abortControllerRef])

  const reset = useCallback(() => {
    abort()
    setUploading(false)
    progressEmitterRef.current.emit('progress', null)
    setFilename(null)
  }, [setUploading, progressEmitterRef, abort])

  const upload = useCallback(
    async (
      file: File,
    ): Promise<
      | { error: string; reason: 'signedUrl' | 'canceled' | 'uploadRequest' }
      | {
          key: string
          mimeType: string
          name: string
          size: number
        }
    > => {
      abort()
      abortControllerRef.current = new AbortController()

      setUploading(true)
      setFilename(file.name.normalize('NFC'))
      progressEmitterRef.current.emit('progress', 0)
      const uploadInfo = await generateUploadUrl
        .mutateAsync({
          filename: file.name.normalize('NFC'),
          mimeType: file.type,
        })
        .catch((error) => {
          Sentry.captureException(error)
          setUploading(false)
        })

      if (!uploadInfo) {
        return {
          error:
            "Une erreur est survenue lors de l'envoi du fichier. Veuillez réessayer.",
          reason: 'signedUrl',
        }
      }

      let totalUploaded = 0

      try {
        await axios.put(uploadInfo.url, file, {
          signal: abortControllerRef.current.signal,
          headers: {
            'Content-Type': file.type,
            'Access-Control-Allow-Origin': '*',
          },
          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total || progressEvent.total === 0) {
              return
            }
            if (totalUploaded !== progressEvent.total) {
              totalUploaded = progressEvent.total
            }
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            )
            progressEmitterRef.current.emit('progress', percentCompleted)
          },
        })

        return {
          key: uploadInfo.key,
          name: file.name.normalize('NFC'),
          mimeType: file.type,
          size: totalUploaded,
        }
      } catch (error) {
        if (error instanceof CanceledError) {
          return {
            error: "L'envoi du fichier a été annulé.",
            reason: 'canceled',
          }
        }
        Sentry.captureException(error)
        return {
          error:
            "Une erreur est survenue lors de l'envoi du fichier. Veuillez réessayer.",
          reason: 'uploadRequest',
        }
      } finally {
        setUploading(false)
        progressEmitterRef.current.emit('progress', null)
      }
    },
    [abort, generateUploadUrl, progressEmitterRef, setUploading],
  )

  return {
    uploading,
    abort,
    reset,
    upload,
    filename,
    progressEmitter: progressEmitterRef.current,
  }
}

export type UseFileUploadReturn = ReturnType<typeof useFileUpload>
