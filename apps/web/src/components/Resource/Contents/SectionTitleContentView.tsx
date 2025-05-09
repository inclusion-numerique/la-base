import type { ResourceContent } from '@app/web/server/resources/getResource'

const SectionTitleContentView = ({
  content: { title },
}: {
  content: Pick<ResourceContent, 'title'>
}) =>
  title ? (
    <h2 data-testid="content-section-title" className="fr-mt-4v fr-h4 ">
      {title}
    </h2>
  ) : null

export default SectionTitleContentView
