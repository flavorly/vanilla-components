import { camelize } from 'vue';

export default function useReplacePlaceholders(translation: string, replace: object = {}): string {
  if (typeof translation === 'object' || (Object.keys(replace).length === 0 && replace.constructor === Object)) {
    return translation;
  }

  for (const placeholder in replace) {
    try {
      translation = translation.toString()
        .replace(`:${placeholder}`, replace[placeholder])
        .replace(`:${placeholder.toUpperCase()}`, replace[placeholder].toString().toUpperCase())
        .replace(`:${placeholder.charAt(0).toUpperCase()}${placeholder.slice(1)}`, replace[placeholder].toString().charAt(0).toUpperCase() + replace[placeholder].toString().slice(1));
    } catch (e) {
    }
  }

  return translation.toString().trim();
}
