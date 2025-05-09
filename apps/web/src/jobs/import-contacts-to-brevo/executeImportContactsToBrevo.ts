import { output } from '@app/cli/output'
import {
  createContact,
  toBrevoContact,
} from '@app/web/external-apis/brevo/contact'
import { PrismaClient } from '@prisma/client'

const userListId = Number.parseInt(process.env.BREVO_USERS_LIST_ID!, 10)
const prisma = new PrismaClient()

export const executeImportContactsToBrevo = async () => {
  output('Starting import of contacts to Brevo...')

  const users = await prisma.user.findMany({
    select: { firstName: true, lastName: true, email: true, id: true },
    where: { role: 'User', deleted: null },
  })

  const contacts = users.map(toBrevoContact)

  output(`${contacts.length} contacts to import`)

  output('Importing contacts to Brevo...')

  const results = await Promise.allSettled(
    contacts.map((contact) =>
      createContact({ contact, listIds: [userListId] }),
    ),
  )

  const failures = results.filter((result) => result.status === 'rejected')

  if (failures.length > 0) {
    output(`Imported with ${failures.length} errors:`)
    for (const [index, failure] of failures.entries()) {
      if (failure.status === 'rejected') {
        output(`Error ${index + 1}: ${String(failure.reason)}`)
      }
    }
  } else {
    output('Successfully imported all contacts to Brevo')
  }
}
