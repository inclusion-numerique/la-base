'use client'

import {
  FilterKey,
  ThematicSelection,
} from '@app/ui/components/Form/Filters/filter'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import SearchThematicsCategory from '@app/web/components/Search/Filters/SearchThematicsCategory'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import NewsFeedOnboardingSkipButton from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingSkipButton'
import {
  UpdateNewsFeedThemesCommand,
  UpdateNewsFeedThemesValidation,
} from '@app/web/features/fil-d-actualite/onboarding/themes/newsFeedThemes'

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

const NewsFeedThemesForm = ({ themes }: { themes?: Theme[] }) => {
  const [themesSelected, setThemesSelected] = useState<ThematicSelection[]>(
    getInitialThemesSelection(themes),
  )
  const mutate = trpc.newsFeed.updateThemes.useMutation()
  const router = useRouter()

  const form = useForm<UpdateNewsFeedThemesCommand>({
    resolver: zodResolver(UpdateNewsFeedThemesValidation),
    defaultValues: {
      themes,
    },
  })

  useEffect(() => {
    const themes = themesSelected.map((item) => item.option.value as Theme)
    form.setValue('themes', themes)
  }, [themesSelected, form])

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
      await mutate.mutateAsync(data)
      router.push('/fil-d-actualite/onboarding/bases')
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
              withHint={false}
              onSelectAllInCategory={onSelectAllInCategory}
            />
          )
        })}
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="fr-width-full fr-mt-12v">
          <Button
            className="fr-width-full fr-flex fr-justify-content-center"
            type="submit"
            disabled={mutate.isPending}
          >
            Suivant
          </Button>
        </div>
      </form>
      <div className="fr-flex fr-justify-content-center fr-mt-6v">
        <NewsFeedOnboardingSkipButton />
      </div>
    </>
  )
}

export default withTrpc(NewsFeedThemesForm)
