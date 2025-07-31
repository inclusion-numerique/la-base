import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import ResourceCollectionsModal from '@app/web/app/(public)/ressources/[slug]/_components/ResourceCollectionsModal'
import { FeedbackBadge } from '@app/web/components/Resource/feedbackBadge/FeedbackBadge'
import ResourceLicenceInformations from '@app/web/features/resources/licence/components/ResourceLicenceInformations'
import type { Resource } from '@app/web/server/resources/getResource'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import Link from 'next/link'
import React from 'react'
import ResourceIndexationView from './ResourceIndexationView'

const ResourceInformations = ({ resource }: { resource: Resource }) => (
  <div className="fr-my-2w fr-pt-2w">
    <Accordion
      label="Informations sur la ressource"
      data-testid="resource-informations-accordion"
    >
      <div className="fr-flex fr-direction-column fr-direction-sm-row fr-flex-gap-2v fr-align-items-center">
        <span className="fr-text--sm fr-mb-0">
          <span className="ri-bookmark-line fr-mr-1w" />
          Ressource enregistrée dans{' '}
          <strong>{resource._count.collections}</strong> collection
          {sPluriel(resource._count.collections)}
        </span>
        {resource._count.collections > 0 && (
          <>
            <span className="fr-hidden fr-unhidden-sm">·</span>
            <ResourceCollectionsModal resource={resource} />
          </>
        )}
      </div>
      {resource._count.resourceFeedback > 0 && (
        <>
          <div
            className="fr-flex fr-align-items-center fr-flex-gap-2v"
            data-testid="resources-feedbacks"
          >
            <span
              className="ri-emotion-line fr-text-label--blue-france"
              aria-hidden
            />
            <span className="fr-text--sm fr-mb-0">
              <strong>{resource._count.resourceFeedback}</strong> avis sur la
              ressource
            </span>
            <FeedbackBadge value={resource.feedbackAverage} />
            <span className="fr-hidden fr-unhidden-sm">·</span>
            <Link
              className="fr-link fr-text--sm fr-mb-0"
              href={`/ressources/${resource.slug}/avis`}
            >
              Voir les avis
            </Link>
          </div>
        </>
      )}
      <ResourceIndexationView
        resource={resource}
        withLink
        resourceTypes
        themes
        beneficiaries
        professionalSectors
        titleClassName="fr-text--sm"
        tagsClassName="fr-mt-1v"
      />
      <ResourceLicenceInformations resource={resource} />
    </Accordion>
  </div>
)

export default ResourceInformations
