import FileContentView from '@app/web/components/Resource/Contents/FileContentView'
import ImageContentView from '@app/web/components/Resource/Contents/ImageContentView'
import type { ResourceContent } from '@app/web/server/resources/getResource'
import type { ContentProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import * as Sentry from '@sentry/nextjs'
import LinkContentView from './LinkContentView'
import SectionTitleContentView from './SectionTitleContentView'
import TextContentView from './TextContentView'

// Accept both ContentProjectionWithContext (from events) and ResourceContent (from database)
type ContentViewProps = ContentProjectionWithContext | ResourceContent

const ResourceContentView = ({ content }: { content: ContentViewProps }) => {
  const { type, image, file, id } = content
  switch (type) {
    case 'Text': {
      return <TextContentView content={content} />
    }
    case 'SectionTitle': {
      return <SectionTitleContentView content={content} />
    }
    case 'Link': {
      return <LinkContentView content={content} />
    }
    case 'Image': {
      if (!image) {
        Sentry.captureException(new Error('Image content has no image'), {
          extra: {
            contentId: id,
          },
        })
        return null
      }
      return <ImageContentView content={{ ...content, image }} />
    }
    case 'File': {
      if (!file) {
        Sentry.captureException(new Error('File content has no file'), {
          extra: {
            contentId: id,
          },
        })
        return null
      }
      return <FileContentView content={{ ...content, file }} />
    }
    default: {
      throw new Error(`Unknown content type: ${type}`)
    }
  }
}

export default ResourceContentView
