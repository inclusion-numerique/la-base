import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { FeaturedBlock } from '@app/web/features/administration/landing/db/getFeaturedBlocksListPageData'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  UpdateFeaturedBlockCommand,
  UpdateFeaturedBlockValidation,
} from '@app/web/features/administration/landing/validation/updateFeaturedBlock'
import { trpc } from '@app/web/trpc'

const AdministrationSaveFeaturedBlocksForm = ({
  featuredBlocks,
  disabled,
  type,
}: {
  featuredBlocks: FeaturedBlock[]
  disabled: boolean
  type: 'base' | 'resource' | 'profile'
}) => {
  const router = useRouter()
  const form = useForm<UpdateFeaturedBlockCommand>({
    resolver: zodResolver(UpdateFeaturedBlockValidation),
    defaultValues: {
      type,
      blocks: [],
    },
  })

  const mutate = trpc.featuredBlock.mutate.useMutation()
  const isLoading = form.formState.isSubmitting || mutate.isPending

  const onSubmit = async () => {
    const blocks = featuredBlocks.map((block) => block.id)
    try {
      await mutate.mutateAsync({ type, blocks })
      router.refresh()
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, form.setError)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Button
        className="fr-mr-1w"
        priority="primary"
        disabled={disabled || isLoading}
        type="submit"
      >
        Valider
        <span className="fr-icon-check-line fr-ml-1w" aria-hidden="true" />
      </Button>
    </form>
  )
}

export default withTrpc(AdministrationSaveFeaturedBlocksForm)
