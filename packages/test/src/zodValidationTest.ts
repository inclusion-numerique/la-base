import z from 'zod'

export const normalizeZodErrorForTestExpect = (
  errors: { path: readonly PropertyKey[]; message: string }[],
) =>
  Object.fromEntries(
    errors
      .map((error): [string, string] => [error.path.join('.'), error.message])
      .sort((a, b) => a[0].localeCompare(b[0])),
  )

export const expectZodValidationToFail = <T, U extends object>(
  // zod 4 réduit ZodObject à <Shape, Config> : on s'appuie sur le type de sortie,
  // seul safeParse est utilisé ici
  validation: z.ZodType<T>,
  validObject: T,
  fields: U,
  errors: { path: string[]; message: string }[],
) => {
  const result = validation.safeParse({ ...validObject, ...fields })

  if (result.success) {
    // biome-ignore lint/suspicious/noConsole: useful for jest output
    console.error(
      `Fields should not be valid. Expected errors: ${errors
        .map((error) => error.message)
        .join(', ')}`,
    )
    // biome-ignore lint/correctness/noUndeclaredVariables: jest is global
    expect(result.success).toBeFalse()
    return
  }

  const expectedErrorMessages = normalizeZodErrorForTestExpect(errors)
  const actualErrorMessages = normalizeZodErrorForTestExpect(
    result.error.issues,
  )

  // biome-ignore lint/correctness/noUndeclaredVariables: jest is global
  expect(actualErrorMessages).toEqual(expectedErrorMessages)
}
