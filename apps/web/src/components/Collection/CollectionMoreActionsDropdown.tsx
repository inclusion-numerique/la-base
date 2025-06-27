import OpenDeleteCollectionModalButton from '@app/web/components/Collection/OpenDeleteCollectionModalButton'
import { Dropdown } from '@app/web/components/Dropdown/Dropdown'
import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import React from 'react'

export const CollectionMoreActionsDropdown = ({
  collection,
  priority = 'tertiary no outline',
  modalPriority = 'tertiary no outline',
  modalControlClassName,
  dropdownControlClassName,
  buttonTitle,
  size = 'small',
  resourcesCount,
}: {
  collection: {
    isFavorites: boolean
    id: string
    slug: string
    title: string
  }
  priority?: ButtonProps['priority']
  modalPriority?: ButtonProps['priority']
  modalControlClassName?: string
  dropdownControlClassName?: string
  buttonTitle?: string
  size?: ButtonProps['size']
  resourcesCount: number
}) => (
  <Dropdown
    id={`more_actions_for_${collection.slug}`}
    data-testid="more-actions-button"
    title="Options sur la collection"
    priority={priority}
    modalPriority={modalPriority}
    modalControlClassName={modalControlClassName}
    dropdownControlClassName={dropdownControlClassName}
    size={size}
    alignRight
    displayDropdownArrow={false}
    control={
      <>
        <span
          className={buttonTitle ? 'ri-more-fill fr-mr-1w' : 'ri-more-fill'}
          aria-hidden
        />
        {buttonTitle}
      </>
    }
  >
    <ul>
      {resourcesCount > 0 && (
        <>
          <li>
            <Link
              className="fr-btn fr-btn--sm"
              href={`/collections/${collection.slug}/gerer`}
            >
              <div>
                <span
                  className="ri-folder-open-line fr-mr-1w fr-text-label--blue-france"
                  aria-hidden
                />
                Gérer les ressources
              </div>
            </Link>
          </li>
          <hr className="fr-hidden fr-unhidden-sm fr-mx-3v fr-pb-1v" />
        </>
      )}
      <li>
        <Link
          className="fr-btn fr-btn--sm"
          href={`/collections/${collection.slug}/modifier`}
        >
          <span
            className="ri-settings-3-line fr-mr-1w fr-text-label--blue-france"
            aria-hidden
          />
          Modifier les paramètres
        </Link>
      </li>
      <hr className="fr-hidden fr-unhidden-sm fr-mx-3v fr-pb-1v" />
      <li>
        <OpenDeleteCollectionModalButton
          collectionId={collection.id}
          size="small"
        >
          <span
            className="ri-delete-bin-6-line fr-mr-1w fr-text-label--blue-france"
            aria-hidden
          />
          Supprimer la collection
        </OpenDeleteCollectionModalButton>
      </li>
    </ul>
  </Dropdown>
)
