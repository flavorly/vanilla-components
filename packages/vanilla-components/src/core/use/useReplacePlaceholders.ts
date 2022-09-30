export default function useReplacePlaceholders(translation: string, replace: object = {}): string {
  if (typeof translation === 'object' || (Object.keys(replace).length === 0 && replace.constructor === Object)) {
    return translation
  }

  for (const placeholder in replace) {
    try {
      translation = translation.toString()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .replace(`:${placeholder}`, replace[placeholder])
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .replace(`:${placeholder.toUpperCase()}`, replace[placeholder].toString().toUpperCase())
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .replace(`:${placeholder.charAt(0).toUpperCase()}${placeholder.slice(1)}`, replace[placeholder].toString().charAt(0).toUpperCase() + replace[placeholder].toString().slice(1))
    }
 catch (e) {
    }
  }

  return translation.toString().trim()
}
