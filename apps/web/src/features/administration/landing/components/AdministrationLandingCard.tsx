'use client'

import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import AdministrationLandingCardContent from '@app/web/features/administration/landing/components/AdministrationLandingCardContent'
import AdministrationSaveFeaturedBlocksForm from '@app/web/features/administration/landing/components/AdministrationSaveFeaturedBlocksForm'
import AdministrationSearchFeaturedBlock from '@app/web/features/administration/landing/components/AdministrationSearchFeaturedBlock'
import type { SearchType } from '@app/web/features/administration/landing/db/executeFeaturedBlockSearch'
import type { FeaturedBlock } from '@app/web/features/administration/landing/db/getFeaturedBlocksListPageData'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { isEqual } from 'lodash-es'
import { useState } from 'react'

const AdministrationLandingCard = ({
  type,
  placeholder,
  title,
  max,
  blocks,
}: {
  title: string
  type: SearchType
  placeholder: string
  max: number
  blocks: FeaturedBlock[]
}) => {
  const [featuredBlocks, setFeaturedBlocks] = useState<FeaturedBlock[]>(blocks)

  const handleDeleteBlock = (id: string) =>
    setFeaturedBlocks(featuredBlocks.filter((block) => block.id !== id))

  const handleAddBlock = (featuredBlock: FeaturedBlock) =>
    setFeaturedBlocks((previous) => [...previous, featuredBlock])
  const canAdd = featuredBlocks.length < max
  const disabled =
    isEqual(featuredBlocks, blocks) || featuredBlocks.length === 0
  const featureBlockTypeLabel =
    type === 'resource' ? 'ressources' : type === 'base' ? 'bases' : 'profils'

  return (
    <AdministrationInfoCard title={title}>
      <AdministrationSearchFeaturedBlock
        canAdd={canAdd}
        onAdd={handleAddBlock}
        type={type}
        placeholder={placeholder}
      />
      <hr className="fr-mt-3w" />
      <Notice
        className="fr-notice--success fr-mb-4w"
        title={
          <span className="fr-text--regular fr-text-default--grey fr-text--bold">
            {featuredBlocks.length} / {max} {featureBlockTypeLabel} à la une
          </span>
        }
      />
      <AdministrationLandingCardContent
        onDelete={handleDeleteBlock}
        blocks={featuredBlocks}
      />
      <hr className="fr-mt-3w" />
      <div className="fr-flex fr-justify-content-end">
        <AdministrationSaveFeaturedBlocksForm
          type={type}
          disabled={disabled}
          featuredBlocks={featuredBlocks}
        />
      </div>
    </AdministrationInfoCard>
  )
}

export default AdministrationLandingCard
