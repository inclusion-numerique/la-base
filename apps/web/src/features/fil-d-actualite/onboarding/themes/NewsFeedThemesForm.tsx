'use client'

import {
  FilterKey,
  ThematicSelection,
} from '@app/ui/components/Form/Filters/filter'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import { createToast } from '@app/ui/toast/createToast'
import SearchThematicsCategory from '@app/web/components/Search/Filters/SearchThematicsCategory'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { UserNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import NewsFeedOnboardingSkipButton from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingSkipButton'
import {
  UpdateNewsFeedThemesCommand,
  UpdateNewsFeedThemesValidation,
} from '@app/web/features/fil-d-actualite/onboarding/themes/newsFeedThemes'
import { NewsFeedThemesPreferenceModal } from '@app/web/features/fil-d-actualite/preferences/NewsFeedThemesPreferenceForm'

import { Category, categoryThemesOptions } from '@app/web/themes/themes'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Theme } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const getInitialThemesSelection = (themes?: Theme[]): ThematicSelection[] => {
  if (!themes || themes.length === 0) return []

  const initialSelection: ThematicSelection[] = []

  for (const theme of themes) {
    for (const [_, options] of Object.entries(categoryThemesOptions)) {
      const option = options.find((opt) => opt.value === theme)
      if (option) {
        initialSelection.push({
          category: 'themes' as FilterKey,
          option,
        })
        break
      }
    }
  }

  return initialSelection
}

const NewsFeedThemesForm = ({
  userNewsFeed,
  context,
}: {
  userNewsFeed: UserNewsFeed | null
  context: 'preferences' | 'onboarding'
}) => {
  const [themesSelected, setThemesSelected] = useState<ThematicSelection[]>(
    getInitialThemesSelection(userNewsFeed?.themes),
  )
  const mutate = trpc.newsFeed.updateThemes.useMutation()
  const router = useRouter()

  const form = useForm<UpdateNewsFeedThemesCommand>({
    resolver: zodResolver(UpdateNewsFeedThemesValidation),
    defaultValues: {
      themes: userNewsFeed?.themes,
    },
  })

  useEffect(() => {
    const themes = themesSelected.map((item) => item.option.value as Theme)
    form.setValue('themes', themes)
  }, [themesSelected, form])

  useEffect(() => {
    const newThemesSelection = getInitialThemesSelection(userNewsFeed?.themes)
    setThemesSelected(newThemesSelection)
    form.reset({
      themes: userNewsFeed?.themes,
    })
  }, [userNewsFeed?.themes, form])

  const handleOnSelect = (option: SelectOption, category: FilterKey) => {
    const isAlreadySelected = themesSelected.some(
      (item) => item.option.value === option.value,
    )

    if (isAlreadySelected) {
      setThemesSelected(
        themesSelected.filter((item) => item.option.value !== option.value),
      )
    } else {
      setThemesSelected([...themesSelected, { category, option }])
    }
  }

  const onSelectAllInCategory = (category: FilterKey, selected: boolean) => {
    const categoryOptions = categoryThemesOptions[category as Category]
    if (selected) {
      const filteredInternalSelected = themesSelected.filter(
        (s) => s.option.extra?.category !== category,
      )
      setThemesSelected([
        ...filteredInternalSelected,
        ...categoryOptions.map((option) => ({
          category: 'themes' as FilterKey,
          option,
        })),
      ])
    } else {
      setThemesSelected(
        themesSelected.filter((s) => s.option.extra?.category !== category),
      )
    }
  }

  const onSubmit = async (data: UpdateNewsFeedThemesCommand) => {
    try {
      await mutate.mutateAsync(data, {
        onSuccess: () => {
          if (context === 'onboarding') {
            router.push('/fil-d-actualite/onboarding/bases')
          }
          if (context === 'preferences') {
            NewsFeedThemesPreferenceModal.close()
            router.refresh()
            createToast({
              priority: 'success',
              message: 'Vos préférences ont été mises à jour.',
            })
          }
        },
      })
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <>
      <div className="fr-flex fr-direction-column fr-flex-gap-12v">
        {Object.entries(categoryThemesOptions).map(([key, value]) => {
          return (
            <SearchThematicsCategory
              key={key}
              data-testid="news-feed-themes-form"
              onSelect={handleOnSelect}
              selected={themesSelected}
              category={key as Category}
              options={value}
              onSelectAllInCategory={onSelectAllInCategory}
            />
          )
        })}
      </div>
      <form id="news-feed-themes-form" onSubmit={form.handleSubmit(onSubmit)}>
        {context === 'onboarding' && (
          <div className="fr-width-full fr-mt-12v">
            <Button
              className="fr-width-full fr-flex fr-justify-content-center"
              type="submit"
              disabled={mutate.isPending}
            >
              Suivant
            </Button>
          </div>
        )}
      </form>
      {context === 'onboarding' && (
        <div className="fr-flex fr-justify-content-center fr-mt-6v">
          <NewsFeedOnboardingSkipButton userNewsFeed={userNewsFeed} />
        </div>
      )}
    </>
  )
}

export default withTrpc(NewsFeedThemesForm)
