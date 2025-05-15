
import childProcess from 'node:child_process'
import path from 'node:path'
import {
  EncodedState,
  decodeSerializableState,
  encodeSerializableState,
} from '../../../../apps/web/src/utils/encodeSerializableState'
import { logToFile } from './logToFile'

const packageBaseDirectory = path.resolve(import.meta.dirname, '../..')

// Execute node subprocess using pnpm -F e2e task <task> <JSON.stringify(input)>
const executeTask = (task: string, input: unknown) => {
  const taskCommand = `tsx ${packageBaseDirectory}/cypress/tasks/taskExecutor.ts ${task} '${encodeSerializableState(input)}'`

  logToFile({ task, input, taskCommand })

  // Environment variables will be passed to child
  // Remove NODE_OPTIONS from env to avoid pnpm / tsx to crash
  const commandEnv = { ...process.env }
  delete commandEnv.NODE_OPTIONS

  return new Promise((resolve, reject) => {
    childProcess.exec(
      taskCommand,
      { env: commandEnv },
      (error, stdout, stderr) => {
        if (error) {
          logToFile({ errorOutput: error, stderr })
          reject(error)
          return
        }

        const rawOutput = stdout.trim()
        const lastOutputLine = rawOutput.split('\n').pop()

        logToFile({ rawOutput, lastOutputLine })
        const decodedOutput = decodeSerializableState(
          lastOutputLine as EncodedState<unknown>,
          null,
        )
        logToFile({ decodedOutput })
        resolve(decodedOutput)
      },
    )
  })
}

export const taskManager = new Proxy(
  {},
  {
    get: (_, property) => (input: unknown) =>
      executeTask(property as string, input),
  },
)
