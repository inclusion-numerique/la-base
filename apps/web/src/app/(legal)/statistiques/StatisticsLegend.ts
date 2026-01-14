export type StatisticsLegend<T extends object = object> = {
  label: string
  value?: string
  total?: number | string
  key?: keyof T
}
