import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { publicProcedure, router } from '@app/web/server/rpc/createRouter'
import { SendFeedbackValidation } from '@app/web/feedback/SendFeedback'
import { sendNewFeedbackModeratorEmail } from '@app/web/server/feedback/sendNewFeedbackModeratorEmail'
import { yesNoToBoolean } from '@app/web/utils/yesNoBooleanOptions'

export const feedbackRouter = router({
  send: publicProcedure
    .input(SendFeedbackValidation)
    .mutation(
      async ({
        input: {
          rating,
          comment,
          difficultyComment,
          difficultyArea,
          hadDifficulty,
          wantsToBeContacted,
        },
        ctx: { user },
      }) => {
        const feedback = await prismaClient.feedback.create({
          data: {
            id: v4(),
            sentById: user?.id,
            hadDifficulty: yesNoToBoolean(hadDifficulty),
            wantsToBeContacted,
            comment,
            difficultyComment,
            difficultyArea,
            rating,
          },
        })

        // There will be an email sent to the sentBy user
        // There will be an email sent to the resource owner ?

        await sendNewFeedbackModeratorEmail({
          feedback,
        })

        return feedback
      },
    ),
})
