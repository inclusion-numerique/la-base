import {
  type CreationStatistics,
  EMPTY_PROPORTIONS,
  computeCreationProportions,
} from './creationStatistics'

const EMPTY_STATISTICS_RESULTS = {
  period: 'Du 01/01 au 31/01',
  start_date: '01/01',
  end_date: '31/01',
  private_resources: 0,
  public_resources: 0,
  public_users: 0,
  private_users: 0,
  public_bases: 0,
  private_bases: 0,
}

describe('Creation proportions', () => {
  it('should get 0% of each resource items when they are all empty', () => {
    const creationStatisticsResult = [
      {
        ...EMPTY_STATISTICS_RESULTS,
      },
    ]

    const proportions = computeCreationProportions(creationStatisticsResult)

    expect(proportions).toStrictEqual<CreationStatistics>(EMPTY_PROPORTIONS)
  })

  it('should get 100% for private resource when all others are empty', () => {
    const creationStatisticsResult = [
      {
        ...EMPTY_STATISTICS_RESULTS,
        private_resources: 2,
      },
    ]

    const proportions = computeCreationProportions(creationStatisticsResult)

    expect(proportions).toStrictEqual<CreationStatistics>({
      ...EMPTY_PROPORTIONS,
      privateResources: 100,
    })
  })

  it('should get 33 for all resource when all set to same value', () => {
    const creationStatisticsResult = [
      {
        ...EMPTY_STATISTICS_RESULTS,
        public_resources: 3,
        private_resources: 4,
      },
    ]

    const proportions = computeCreationProportions(creationStatisticsResult)

    expect(proportions).toStrictEqual<CreationStatistics>({
      ...EMPTY_PROPORTIONS,
      publicResources: 43,
      privateResources: 57,
    })
  })

  it('should get more public profiles than private profiles', () => {
    const creationStatisticsResult = [
      {
        ...EMPTY_STATISTICS_RESULTS,
        public_users: 7,
        private_users: 3,
      },
      {
        ...EMPTY_STATISTICS_RESULTS,
        public_users: 2,
        private_users: 2,
      },
    ]

    const proportions = computeCreationProportions(creationStatisticsResult)

    expect(proportions).toStrictEqual<CreationStatistics>({
      ...EMPTY_PROPORTIONS,
      publicUsers: 64,
      privateUsers: 36,
    })
  })

  it('should get dramatically more public bases than private bases', () => {
    const creationStatisticsResult = [
      {
        ...EMPTY_STATISTICS_RESULTS,
        public_bases: 734,
        private_bases: 14,
      },
      {
        ...EMPTY_STATISTICS_RESULTS,
        public_bases: 224,
        private_bases: 8,
      },
    ]

    const proportions = computeCreationProportions(creationStatisticsResult)

    expect(proportions).toStrictEqual<CreationStatistics>({
      ...EMPTY_PROPORTIONS,
      publicBases: 98,
      privateBases: 2,
    })
  })
})
