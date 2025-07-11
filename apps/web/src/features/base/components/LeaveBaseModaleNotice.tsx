import { createToast } from '@app/ui/toast/createToast'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { BasePageData } from '@app/web/server/bases/getBase'
import type { BaseProfileListItemWithAllFields } from '@app/web/server/bases/getBasesList'
import { trpc } from '@app/web/trpc'
import { Accordion } from '@codegouvfr/react-dsfr/Accordion'
import Button from '@codegouvfr/react-dsfr/Button'
import Notice from '@codegouvfr/react-dsfr/Notice'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './LeaveBaseModaleNotice.module.css'

const LeaveBaseModaleNotice = ({
  base,
  user,
  closeModal,
}: {
  base: BaseProfileListItemWithAllFields | BasePageData
  user: SessionUser
  closeModal: () => void
}) => {
  const mutate = trpc.baseMember.leave.useMutation()
  const router = useRouter()

  const onLeave = async () => {
    try {
      await mutate.mutateAsync({
        baseId: base.id,
        memberId: user.id,
      })
      closeModal()
      router.refresh()
      createToast({
        priority: 'success',
        message: <>Vous avez quitté la base</>,
      })
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue, merci de réessayer ultérieurement',
      })
    }
  }

  const noticeCommonClasses = 'fr-my-8v'

  const acceptedMembers = base.members.filter((member) => member.accepted)

  // We check if the user is the only member of the base
  const isLastMember = acceptedMembers.every(
    (member) => member.memberId === user?.id,
  )
  // We check if the user is the only admin of the base
  const isLastAdmin =
    acceptedMembers.length > 1 &&
    acceptedMembers.some(
      (member) => member.memberId === user?.id && member.isAdmin,
    ) &&
    acceptedMembers
      .filter((member) => member.memberId !== user?.id)
      .every((member) => !member.isAdmin)

  if (isLastMember || isLastAdmin) {
    const noticeProps = {
      title: isLastMember ? (
        <span className="fr-text--regular fr-text-default--grey">
          Vous êtes le seul membre de cette base. Vous pouvez supprimer votre
          base depuis la page paramètre accessible en cliquant sur le bouton
          "modifier la base".
        </span>
      ) : (
        <span className="fr-text--regular fr-text-default--grey">
          Vous êtes le seul administrateur de cette base. Vous devez nommer au
          moins un des autres membres administrateur de la base avant de pouvoir
          la quitter.'
        </span>
      ),
      linkProps: isLastMember
        ? { href: `/bases/${base.slug}/editer#supprimer` }
        : { href: `/bases/${base.slug}/membres` },
    }

    return (
      <>
        <Notice
          className={classNames(noticeCommonClasses, 'fr-notice--warning')}
          title={noticeProps.title}
        />
        <div className="fr-flex fr-justify-content-end fr-mt-8v">
          <Button
            priority="secondary"
            className="fr-mr-2v"
            type="button"
            onClick={closeModal}
          >
            J'ai compris
          </Button>
          <Button priority="primary" linkProps={noticeProps.linkProps}>
            Modifier la base
          </Button>
        </div>
      </>
    )
  }

  // We check if user is member of the base (contributor or admin) without contributing to the base
  // In case it's an admin, we already checked if he is not the only one, so we can let it leave the base
  // We check if user is a member of the base with contributions to the base (resources contributions or created resources)
  const createdResources = base.resources.filter(
    (resource) => resource.createdById === user?.id,
  )
  const contributedResources = base.resources.filter((resource) =>
    resource.contributors.some(
      (contributor) => contributor.contributorId === user?.id,
    ),
  )
  const isContributor =
    createdResources.length > 0 || contributedResources.length > 0
  const knowMoreLink = (
    <Link
      className="fr-link fr-link--no-underline fr-text--underline"
      href="/centre-d-aide/une-base#membre-base"
    >
      En savoir plus
    </Link>
  )

  const noticeProps = {
    title: !isContributor ? (
      <>
        <span className="fr-text--regular fr-text-default--grey">
          Vous ne ferez plus partie des membres et ne pourrez donc plus
          contribuer aux ressources publiées via cette base.
          <br />
          {knowMoreLink}
        </span>
      </>
    ) : (
      <>
        <span className="fr-text--regular fr-text-default--grey">
          Vous ne pourrez plus éditer les ressources auxquelles vous avec
          contribué ou que vous avez publié sur cette base.
          <br />
          {knowMoreLink}
        </span>
      </>
    ),
    classNames: isContributor ? 'fr-notice--warning' : '',
  }
  return (
    <>
      <Notice
        className={classNames(noticeCommonClasses, noticeProps.classNames)}
        title={noticeProps.title}
      />
      {isContributor && (
        <>
          <p className="fr-text--bold fr-text--uppercase fr-text--sm fr-mb-0">
            Résumé des ressources auxquelles vous n'aurez plus accès
          </p>
          <div className="fr-accordions-group">
            {createdResources.length > 0 && (
              <Accordion
                className={styles.accordion}
                label={
                  <p className="fr-mb-0 fr-text--sm fr-hint-text ">
                    <span className="fr-icon-file-text-line fr-icon--sm" />
                    &nbsp;
                    <span className="fr-text--bold">
                      {createdResources.length}
                    </span>
                    &nbsp;Ressource{sPluriel(createdResources.length)} dont vous
                    êtes le créateur
                  </p>
                }
              >
                <ul>
                  {createdResources.map((resource) => (
                    <li
                      key={resource.id}
                      className="fr-text-label--blue-france"
                    >
                      <Link
                        className="fr-link"
                        href={`/ressources/${resource.slug}`}
                      >
                        {resource.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Accordion>
            )}
            {contributedResources.length > 0 && (
              <Accordion
                className={styles.accordion}
                label={
                  <p className="fr-mb-0 fr-text--sm fr-hint-text ">
                    <span className="fr-icon-file-text-line fr-icon--sm" />
                    &nbsp;
                    <span className="fr-text--bold">
                      {contributedResources.length}
                    </span>
                    &nbsp;Ressource{sPluriel(contributedResources.length)}
                    auxquelles vous avez contribué
                  </p>
                }
              >
                <ul>
                  {contributedResources.map((resource) => (
                    <li
                      key={resource.id}
                      className="fr-text-label--blue-france"
                    >
                      <Link
                        className="fr-link"
                        href={`/ressources/${resource.slug}`}
                      >
                        {resource.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Accordion>
            )}
          </div>
        </>
      )}
      <div className="fr-flex fr-justify-content-end fr-mt-8v">
        <Button
          priority="secondary"
          className="fr-mr-2v"
          type="button"
          onClick={closeModal}
        >
          Annuler
        </Button>
        <Button type="button" onClick={onLeave}>
          Quitter la base
        </Button>
      </div>
    </>
  )
}

export default withTrpc(LeaveBaseModaleNotice)
