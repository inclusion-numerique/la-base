export const CropText = ({
  limit,
  children,
}: {
  limit: number
  children: string
}) =>
  children.length <= limit ? (
    children
  ) : (
    <>{children.slice(0, limit).replace(/[\s!,.;?]+$/, '')}...</>
  )
