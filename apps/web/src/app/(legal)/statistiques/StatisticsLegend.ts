export type StatisticsLegend<T extends object = object> = {
  label: string
  value?: string
  key: keyof T
}
