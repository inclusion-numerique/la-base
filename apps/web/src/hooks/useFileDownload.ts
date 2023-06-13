import { trpc } from '@app/web/trpc'
import { download as triggerDownload } from '@app/web/utils/download'

/**
 * In the latest versions of Chrome, you cannot download cross-origin files.
 * They will open in a new tab
 */
export const useFileDownload = () => {
  const generateDownloadUrl = trpc.upload.generateDownloadUrl.useMutation()

  const download = async (key: string, filename: string) => {
    const { url } = await generateDownloadUrl.mutateAsync({ key })

    triggerDownload(url, filename)
  }

  return {
    error: generateDownloadUrl.error,
    download,
    isLoading: generateDownloadUrl.isLoading,
  }
}
