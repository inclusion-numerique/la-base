import React from 'react'
import { getRessourcesList } from '@app/web/server/ressources'
import RessourceCard from '@app/web/components/Ressource'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'

const Ressources = async () => {
  const ressources = await getRessourcesList()

  return (
    <>
      <Breadcrumb
        currentPageLabel="Ressources"
        homeLinkProps={{
          href: '/',
        }}
        segments={[]}
      />
      {ressources.map((ressource) => (
        <RessourceCard key={ressource.title} ressource={ressource} />
      ))}
    </>
  )
}

export default Ressources
