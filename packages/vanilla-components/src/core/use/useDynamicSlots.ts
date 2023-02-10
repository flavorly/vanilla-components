import { camelize, capitalize } from 'vue'

export default function useDynamicSlots(prefix: string, slotName: string): string {
  const lowercaseColumnName = slotName.toLowerCase()
  return camelize(prefix + capitalize(lowercaseColumnName.replace(/\.|\_/g, '-')))
}
