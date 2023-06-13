import ImageView from '@app/web/components/Resource/Contents/ImageView'
import FileView from '@app/web/components/Resource/Contents/FileView'
import { ContentProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import LinkView from './LinkView'
import SectionTitleView from './SectionTitleView'
import TextView from './TextView'

const ContentView = ({
  content,
}: {
  content: ContentProjectionWithContext
}) => {
  const { type, image, file } = content
  switch (type) {
    case 'Text': {
      return <TextView content={content} />
    }
    case 'SectionTitle': {
      return <SectionTitleView content={content} />
    }
    case 'Link': {
      return <LinkView content={content} />
    }
    case 'Image': {
      if (!image) {
        throw new Error('Image content has no image')
      }
      return <ImageView content={{ ...content, image }} />
    }
    case 'File': {
      if (!file) {
        throw new Error('File content has no file')
      }
      return <FileView content={{ ...content, file }} />
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unknown content type: ${type}`)
    }
  }
}

export default ContentView
