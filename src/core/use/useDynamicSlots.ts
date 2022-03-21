import { camelize } from 'vue';

export default function useDynamicSlots(prefix: string, slotName: string): string {
  const lowercaseColumnName = slotName.toLowerCase();
  return camelize(prefix + lowercaseColumnName.charAt(0).toUpperCase() + lowercaseColumnName.slice(1));
}
