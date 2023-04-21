import React from 'react'
import Card from '@codegouvfr/react-dsfr/Card'
import { RessourceItem } from '@app/web/server/ressources'

const RessourceCard = ({ ressource }: { ressource: RessourceItem }) => (
  <Card
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Fix dynamic route
    linkProps={{ href: `/ressources/${ressource.slug}` }}
    title={ressource.title}
  />
)

export default RessourceCard
