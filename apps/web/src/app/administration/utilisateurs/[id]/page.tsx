import Tag from '@codegouvfr/react-dsfr/Tag'
import { notFound } from 'next/navigation'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import AdministrationInlineLabelsValues from '@app/web/app/administration/AdministrationInlineLabelsValues'
import AdministrationMailtoLink from '@app/web/app/administration/AdministrationMailtoLink'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { prismaClient } from '@app/web/prismaClient'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import { getUserDisplayName } from '@app/web/utils/user'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'

export const metadata = {
  title: metadataTitle('Utilisateurs - Détails'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
    include: {
      accounts: true,
      sessions: true,
      uploads: true,
    },
  })

  if (!user) {
    notFound()
    return null
  }

  const name = getUserDisplayName(user)

  const { role, firstName, lastName, email, created, uploads, lastLogin } = user

  const sortedUploads = uploads.sort(
    (a, b) => b.created.getTime() - a.created.getTime(),
  )

  return (
    <AdministrationPageContainer>
      <AdministrationBreadcrumbs
        currentPage={`${name}`}
        parents={[
          {
            label: 'Utilisateurs',
            linkProps: { href: '/administration/utilisateurs' },
          },
        ]}
      />
      <AdministrationTitle icon="fr-icon-user-line">{name}</AdministrationTitle>

      <div className="fr-flex fr-flex-gap-2v fr-mb-6v">
        {role === 'Admin' && <Tag small>Administrateur</Tag>}
        {role === 'Support' && <Tag small>Support</Tag>}
      </div>

      <AdministrationInfoCard title="Détails de l'utilisateur">
        <AdministrationInlineLabelsValues
          items={[
            {
              label: 'Id',
              value: id,
            },
            {
              label: 'Prénom',
              value: firstName || 'Non renseigné',
            },
            {
              label: 'Nom de famille',
              value: lastName || 'Non renseigné',
            },
            {
              label: 'Email',
              value: email ? (
                <AdministrationMailtoLink email={email} />
              ) : (
                'Non renseigné'
              ),
            },
            {
              label: 'Rôle',
              value: role,
            },
            {
              label: 'Créé le',
              value: dateAsDay(created),
            },
            {
              label: 'Dernière connexion',
              value: lastLogin ? dateAsDayAndTime(lastLogin) : 'Jamais',
            },
          ]}
        />
      </AdministrationInfoCard>

      {sortedUploads.length > 0 && (
        <AdministrationInfoCard title="Uploads">
          <AdministrationInlineLabelsValues
            items={sortedUploads.map((upload) => ({
              label: `Fichier ${upload.name}`,
              value: `Uploadé le: ${dateAsDayAndTime(upload.created)}`,
            }))}
          />
        </AdministrationInfoCard>
      )}
    </AdministrationPageContainer>
  )
}

export default Page
