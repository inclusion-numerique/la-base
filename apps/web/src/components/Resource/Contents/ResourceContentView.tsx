import * as Sentry from '@sentry/nextjs'
import ImageContentView from '@app/web/components/Resource/Contents/ImageContentView'
import FileContentView from '@app/web/components/Resource/Contents/FileContentView'
import { ContentProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import LinkContentView from './LinkContentView'
import SectionTitleContentView from './SectionTitleContentView'
import TextContentView from './TextContentView'

const ResourceContentView = ({
  content,
}: {
  content: ContentProjectionWithContext
}) => {
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
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unknown content type: ${type}`)
    }
  }
}

// test CI

export default ResourceContentView
