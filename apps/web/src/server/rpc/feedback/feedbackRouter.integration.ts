import type { SendFeedbackData } from '@app/web/feedback/SendFeedback'
import { prismaClient } from '@app/web/prismaClient'
import { sendNewFeedbackModeratorEmail } from '@app/web/server/feedback/sendNewFeedbackModeratorEmail'
import { feedbackRouter } from '@app/web/server/rpc/feedback/feedbackRouter'
import { createTestContext } from '@app/web/test/createTestContext'

jest.mock('@app/web/server/feedback/sendNewFeedbackModeratorEmail')

const mockedSendNewFeedbackModeratorEmail =
  sendNewFeedbackModeratorEmail as jest.MockedFunction<
    typeof sendNewFeedbackModeratorEmail
  >

describe('feedbackRouter', () => {
  // Helper function to easily test procedures
  const feedbacksToDelete: string[] = []

  const executeSendFeedbackProcedure = (input: SendFeedbackData) =>
    feedbackRouter.createCaller(createTestContext({ user: null })).send(input)

  beforeAll(() => {
    mockedSendNewFeedbackModeratorEmail.mockClear()
  })

  afterAll(async () => {
    await prismaClient.feedback.deleteMany({
      where: {
        id: {
          in: feedbacksToDelete,
        },
      },
    })
  })

  describe('send', () => {
    it('should send feedback', async () => {
      const result = await executeSendFeedbackProcedure({
        comment: 'This is a comment',
        difficultyArea: 'Collections',
        difficultyComment: 'This is a difficulty comment',
        hadDifficulty: 'yes',
        rating: 5,
        wantsToBeContacted: 'mike@test.com',
      })

      const expected = {
        id: expect.any(String) as string,
        comment: 'This is a comment',
        created: expect.any(Date) as Date,
        difficultyArea: 'Collections',
        difficultyComment: 'This is a difficulty comment',
        hadDifficulty: true,
        rating: 5,
        sentById: null,
        wantsToBeContacted: 'mike@test.com',
      }

      feedbacksToDelete.push(result.id)

      // Should have triggered email send with expected feedback
      expect(
        mockedSendNewFeedbackModeratorEmail,
      ).toHaveBeenCalledExactlyOnceWith({ feedback: expected })

      // Should have returned from api
      expect(result).toEqual(expected)

      // Should have saved feedback in database
      const feedback = await prismaClient.feedback.findUniqueOrThrow({
        where: { id: result.id },
      })

      expect(feedback).toEqual(expected)
    })
  })
})
