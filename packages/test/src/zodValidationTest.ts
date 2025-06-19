import z from 'zod'

export const normalizeZodErrorForTestExpect = (
  errors: { path: (string | number)[]; message: string }[],
) =>
  Object.fromEntries(
    errors
      .map((error): [string, string] => [error.path.join('.'), error.message])
      .sort((a, b) => a[0].localeCompare(b[0])),
  )

export const expectZodValidationToFail = <
  T,
  U extends object,
  V extends z.ZodRawShape,
>(
  validation: z.ZodObject<V, 'strict' | 'strip', z.ZodTypeAny, T, T>,
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
