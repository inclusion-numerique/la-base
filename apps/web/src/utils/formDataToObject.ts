export const formDataToObject = (
  formData: FormData,
): Record<string, unknown> => {
  const object: Record<string, unknown> = {}
  for (const [key, value] of formData.entries()) {
    object[key] = value
  }
  return object
}
