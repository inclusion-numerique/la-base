import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { numberToString } from '@app/web/utils/formatNumber'
import Tooltip from '@codegouvfr/react-dsfr/Tooltip'

type ContentMetricsProps =
  | { type: 'link'; clickCount: number | null }
  | { type: 'file'; downloadCount: number | null; previewCount: number | null }

const ContentMetrics = (props: ContentMetricsProps) => {
  if (props.type === 'link') {
    const count = props.clickCount ?? 0
    return (
      <p className="fr-text--sm fr-text-mention--grey fr-flex fr-flex-gap-2v fr-mt-2v fr-mb-0">
        <span className="ri-cursor-line" aria-hidden />
        <span className="fr-text--medium">
          {numberToString(count)} clic{sPluriel(count)}
        </span>
        <span className="fr-sr-only"> sur ce lien</span>
      </p>
    )
  }

  const downloadCount = props.downloadCount ?? 0
  const previewCount = props.previewCount ?? 0
  return (
    <p className="fr-text--sm fr-text-mention--grey fr-flex fr-flex-gap-2v fr-mt-2v fr-mb-0">
      <Tooltip
        title={`${numberToString(downloadCount)} Téléchargement${sPluriel(downloadCount)}`}
      >
        <span className="fr-flex fr-flex-gap-2v">
          <span className="fr-icon-download-line fr-icon--sm" aria-hidden />
          <span className="fr-text--medium">
            {numberToString(downloadCount)}
          </span>
          <span className="fr-sr-only">
            {' '}
            téléchargement{sPluriel(downloadCount)}
          </span>
        </span>
      </Tooltip>
      <span className="fr-text--medium">·</span>
      <Tooltip
        title={`${numberToString(previewCount)} Vue${sPluriel(previewCount)}`}
      >
        <span className="fr-flex fr-flex-gap-2v">
          <span className="fr-icon-eye-line fr-icon--sm" aria-hidden />
          <span className="fr-text--medium">
            {numberToString(previewCount)}
          </span>
          <span className="fr-sr-only"> vue{sPluriel(previewCount)}</span>
        </span>
      </Tooltip>
    </p>
  )
}

export default ContentMetrics
