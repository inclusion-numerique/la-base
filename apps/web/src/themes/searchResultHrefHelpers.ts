import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import type {
  Beneficiary,
  ProfessionalSector,
  ResourceType,
  Theme,
} from '@prisma/client'

export const searchResultThemeHref = (...themes: Theme[]) =>
  searchUrl('ressources', {
    ...defaultSearchParams,
    themes,
  })

export const searchResultBeneficiaryHref = (beneficiary: Beneficiary) =>
  searchUrl('ressources', {
    ...defaultSearchParams,
    beneficiaries: [beneficiary],
  })

export const searchResultProfessionalSectorHref = (
  professionalSector: ProfessionalSector,
) =>
  searchUrl('ressources', {
    ...defaultSearchParams,
    professionalSectors: [professionalSector],
  })

export const searchResultResourceTypeHref = (resourceType: ResourceType) =>
  searchUrl('ressources', {
    ...defaultSearchParams,
    resourceTypes: [resourceType],
  })
