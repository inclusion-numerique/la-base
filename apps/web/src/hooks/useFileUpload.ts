import { trpc } from '@app/web/trpc'
import * as Sentry from '@sentry/nextjs'
import axios, { CanceledError } from 'axios'
import EventEmitter from 'eventemitter3'
import { useCallback, useRef, useState } from 'react'

const FORBIDDEN_CHARS_REGEXP = /[#“”]/g
const EMPTY_STRING = ''

const formatFileName = (fileName: string) =>
  fileName.normalize('NFC').replaceAll(FORBIDDEN_CHARS_REGEXP, EMPTY_STRING)

export const useFileUpload = () => {
  const [uploading, setUploading] = useState<boolean>(false)

  const progressEmitterRef = useRef(
    new EventEmitter<'progress', number | null>(),
  )

  const [filename, setFilename] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController>(null)

  const generateUploadUrl = trpc.upload.generateUploadUrl.useMutation()

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      // This will throw an error in the axios request in the upload() method
      abortControllerRef.current.abort()
    }
  }, [])

  const reset = useCallback(() => {
    abort()
    setUploading(false)
    progressEmitterRef.current.emit('progress', null)
    setFilename(null)
  }, [abort])

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
      setFilename(formatFileName(file.name))
      progressEmitterRef.current.emit('progress', 0)
      const uploadInfo = await generateUploadUrl
        .mutateAsync({
          filename: formatFileName(file.name),
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
            'x-amz-acl': 'public-read',
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
          name: formatFileName(file.name),
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
    [abort, generateUploadUrl],
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
