import TrpcProvider from '@app/web/components/trpc/TrpcProvider'

// HOC for using trpc in a subtree of client components
export const withTrpc =
  <P, C>(component: (properties: P) => C): ((properties: P) => C) =>
  (properties) => {
    const Component = component as any

    return (
      <TrpcProvider>
        <Component {...properties} />
      </TrpcProvider>
    ) as C
  }
