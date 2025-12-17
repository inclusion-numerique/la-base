import { SessionUser } from '@app/web/auth/sessionUser'
import BaseCancelJoinRequest from '@app/web/features/base/join-requests/components/BaseCancelJoinRequest'
import { getUserBaseJoinRequestContext } from '@app/web/features/base/join-requests/db/getBaseJoinRequestContext'
import { getAdminMailToUrl } from '@app/web/features/base/join-requests/utils/mailToUrl'
import { BasePageData } from '@app/web/server/bases/getBase'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import styles from './BasePendingJoinRequest.module.css'

export const BasePendingJoinRequest = async ({
  base,
  user,
}: {
  base: BasePageData
  user: SessionUser | null
}) => {
  const { hasPendingJoinRequest, joinRequest } =
    await getUserBaseJoinRequestContext({
      user,
      baseId: base.id,
    })
  if (!hasPendingJoinRequest || !joinRequest) {
    return null
  }

  return (
    <div className="fr-pt-2w fr-pb-6w">
      <div className="fr-flex fr-direction-column fr-direction-sm-row fr-align-items-sm-center fr-justify-content-space-between fr-p-md-4w fr-p-2w fr-background-alt--blue-france fr-border-radius--8">
        <span
          className={classNames(
            styles.icon,
            'fr-hidden fr-unhidden-sm ri-loader-line ri-xl',
          )}
          aria-hidden
        />
        <div className="fr-flex fr-direction-column fr-justify-content-center">
          <span className="fr-text--xs fr-text--uppercase fr-text--bold fr-mb-0 fr-text-default--grey">
            Votre demande pour rejoindre cette base est en attente
          </span>
          <span className="fr-text--xs fr-mb-0 fr-text-default--grey">
            Demande envoyée le {dateAsDay(joinRequest.created)}
          </span>
        </div>
        <div className="fr-flex fr-flex-gap-2v fr-align-items-center fr-justify-content-space-between">
          <Button
            priority="tertiary no outline"
            size="small"
            linkProps={{
              href: getAdminMailToUrl(base.members),
            }}
          >
            Contacter
            <span className="ri-mail-line fr-ml-1w" aria-hidden />
          </Button>
          <BaseCancelJoinRequest base={base} />
        </div>
      </div>
    </div>
  )
}
