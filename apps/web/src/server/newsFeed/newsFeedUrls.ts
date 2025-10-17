import { ProfessionalSector, Theme } from '@prisma/client'

export type NewsFeedSearchParams = {
  onboarding?: string | undefined
}

export type NewsFeedSegmentParams = {
  thematique?: Theme | 'tout'
  secteur?: ProfessionalSector | 'tout'
  suivis?: 'tout'
  base?: string
  profil?: string
}

export type NewsFeedParams = {
  secteur: string | undefined
  thematique: string | undefined
  base: string | undefined
  profil: string | undefined
}

export const newsFeedSegmentAll = 'tout'

const defaultSegment: NewsFeedParams = {
  secteur: undefined,
  thematique: undefined,
  base: undefined,
  profil: undefined,
}

export const parseNewsFeedSegment = (segment: string): NewsFeedParams => {
  const decodedSegment = decodeURIComponent(segment)

  if (decodedSegment === newsFeedSegmentAll) {
    return defaultSegment
  }

  const segmentParsers = {
    thematique: (value: string) => ({
      ...defaultSegment,
      thematique: value,
    }),
    secteur: (value: string) => ({
      ...defaultSegment,
      secteur: value,
    }),
    suivis: (value: string) => {
      if (value === 'tout') {
        return {
          ...defaultSegment,
          base: 'tout',
          profil: 'tout',
        }
      }
      return {
        ...defaultSegment,
        base: value,
        profil: value,
      }
    },
    base: (value: string) => ({
      ...defaultSegment,
      base: value,
    }),
    profil: (value: string) => ({
      ...defaultSegment,
      profil: value,
    }),
  }

  for (const [prefix, parser] of Object.entries(segmentParsers)) {
    if (decodedSegment.startsWith(`${prefix}=`)) {
      const value = decodedSegment.replace(`${prefix}=`, '')
      return parser(value)
    }
  }

  return defaultSegment
}

export const createNewsFeedUrl = (
  params?: NewsFeedSegmentParams,
  searchParams?: Record<string, string>,
): string => {
  const segmentBuilders = [
    { key: 'thematique', value: params?.thematique },
    { key: 'secteur', value: params?.secteur },
    { key: 'suivis', value: params?.suivis },
    { key: 'base', value: params?.base },
    { key: 'profil', value: params?.profil },
  ] as const

  const foundSegment = segmentBuilders.find(({ value }) => value)
  const segment = foundSegment
    ? `${foundSegment.key}=${foundSegment.value}`
    : newsFeedSegmentAll

  const queryString = searchParams
    ? new URLSearchParams(searchParams).toString()
    : ''

  const query = queryString ? `?${queryString}` : ''

  return `/fil-d-actualite/${segment}${query}`
}

export const createThemeUrl = (theme: Theme | 'tout') =>
  createNewsFeedUrl({ thematique: theme })

export const createSectorUrl = (sector: ProfessionalSector | 'tout') =>
  createNewsFeedUrl({ secteur: sector })

export const createFollowsUrl = () => createNewsFeedUrl({ suivis: 'tout' })

export const createBaseUrl = (slug: string) => createNewsFeedUrl({ base: slug })

export const createProfileUrl = (slug: string) =>
  createNewsFeedUrl({ profil: slug })

export const createDefaultUrl = () => createNewsFeedUrl()
