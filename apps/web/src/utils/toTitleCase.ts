// List of words to keep in lowercase unless they start the string
const lowercaseWords = new Set([
  'des',
  'de',
  'la',
  'le',
  'du',
  'l',
  'd',
  'les',
  'et',
  'sur',
  'bis',
  'ter',
  'quater',
])

const splitters = new Set([' ', '-', "'", '*', '’', '(', ')', '[', ']'])

type ToTitleCaseOptions = {
  noUpper?: boolean // Only lowercase relevent letter, never uppercase
}

export const toTitleCase: {
  (input: string, options?: ToTitleCaseOptions): string
  (input: null, options?: ToTitleCaseOptions): null
  (input: undefined, options?: ToTitleCaseOptions): undefined
  (input: string | null, options?: ToTitleCaseOptions): string | null
  (input: string | undefined, options?: ToTitleCaseOptions): string | undefined
  (input: undefined | null, options?: ToTitleCaseOptions): undefined | null
} = (input, options?: ToTitleCaseOptions) => {
  if (input === null) return null as never
  // eslint-disable-next-line unicorn/no-useless-undefined
  if (input === undefined) return undefined as never
  // Split the input into words and process each one
  const words = input.split(/(\s+|['()*[\]’-])/) // Include whitespace, special characters, and brackets in the split array to preserve them

  return words
    .map((word, index) => {
      // Check if the word is one of the special lowercase words and not the first word
      if (index !== 0 && lowercaseWords.has(word.toLowerCase())) {
        return word.toLowerCase()
      }

      if (splitters.has(word)) {
        return word // return the hyphen or apostrophe without modification
      }

      // Capitalize the first character and make the rest lowercase
      return (
        (options?.noUpper ? word.charAt(0) : word.charAt(0).toUpperCase()) +
        word.slice(1).toLowerCase()
      )
    })
    .join('') as never
}
