import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import AdministrationInlineLabelsValues from '@app/web/app/administration/AdministrationInlineLabelsValues'
import AdministrationMailtoLink from '@app/web/app/administration/AdministrationMailtoLink'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import DeleteUserButton from '@app/web/app/administration/utilisateurs/[id]/DeleteUserButton'
import { getUserDetailsPageContext } from '@app/web/app/administration/utilisateurs/[id]/getUserDetailsPageContext'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { ProfilePrivacyTag } from '@app/web/components/PrivacyTags'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import { getUserDisplayName } from '@app/web/utils/user'
import Tag from '@codegouvfr/react-dsfr/Tag'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const metadata = {
  title: metadataTitle('Utilisateurs - Détails'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const { user, bases } = await getUserDetailsPageContext(id)

  if (!user) {
    notFound()
    return null
  }

  const name = getUserDisplayName(user)

  const {
    role,
    firstName,
    lastName,
    email,
    created,
    uploads,
    lastLogin,
    slug,
    isPublic,
    description,
    linkedin,
    website,
    facebook,
    twitter,
  } = user

  const sortedUploads = uploads.sort(
    (a, b) => b.created.getTime() - a.created.getTime(),
  )

  const profileUrl = getServerUrl(`/profils/${slug}`)
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
      <AdministrationTitle
        actions={<DeleteUserButton userId={id} bases={bases} />}
      >
        <div className="fr-flex fr-flex-gap-4v fr-align-items-center">
          <RoundProfileImage user={user} size={96} borderWidth={1} />
          <span>{name}</span>
        </div>
      </AdministrationTitle>

      <AdministrationInfoCard title="Détails de l’utilisateur">
        <div className="fr-flex fr-flex-gap-4v fr-align-items-center">
          <ProfilePrivacyTag isPublic={isPublic} />
          {role === 'Admin' && <Tag small>Administrateur</Tag>}
          {role === 'Support' && <Tag small>Support</Tag>}
        </div>
        <AdministrationInlineLabelsValues
          className="fr-mt-4v"
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
              label: 'Lien vers le profil',
              value: (
                <Link
                  href={`/profils/${slug}`}
                  className="fr-link"
                  target="_blank"
                >
                  {profileUrl}
                </Link>
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
            {
              label: 'Description',
              value: description ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              ) : (
                '-'
              ),
            },
            {
              label: 'LinkedIn',
              value: linkedin ? (
                <Link href={linkedin} target="_blank">
                  {linkedin}
                </Link>
              ) : (
                '-'
              ),
            },
            {
              label: 'Site web',
              value: website ? (
                <Link href={website} target="_blank">
                  {website}
                </Link>
              ) : (
                '-'
              ),
            },
            {
              label: 'Facebook',
              value: facebook ? (
                <Link href={facebook} target="_blank">
                  {facebook}
                </Link>
              ) : (
                '-'
              ),
            },
            {
              label: 'Twitter',
              value: twitter ? (
                <Link href={twitter} target="_blank">
                  {twitter}
                </Link>
              ) : (
                '-'
              ),
            },
          ]}
        />
      </AdministrationInfoCard>

      {sortedUploads.length > 0 && (
        <AdministrationInfoCard title="Uploads">
          <AdministrationInlineLabelsValues
            items={sortedUploads.map((upload) => ({
              label: `Fichier ${upload.name}`,
              value: (
                <span className="fr-text--xs fr-mb-0">
                  Uploadé le: {dateAsDayAndTime(upload.created)}
                </span>
              ),
            }))}
          />
        </AdministrationInfoCard>
      )}
      {bases.length > 0 && (
        <AdministrationInfoCard title="Bases associées">
          <AdministrationInlineLabelsValues
            items={bases.map((base) => ({
              label: base.title,
              value: (
                <Link
                  href={`/bases/${base.slug}`}
                  className="fr-link"
                  target="_blank"
                >
                  {getServerUrl(`/bases/${base.slug}`)}
                </Link>
              ),
            }))}
          />
        </AdministrationInfoCard>
      )}
    </AdministrationPageContainer>
  )
}

export default Page
