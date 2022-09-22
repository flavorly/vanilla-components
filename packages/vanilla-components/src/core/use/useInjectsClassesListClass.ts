import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { CssClass } from '../types'
import { useInjectsConfiguration } from '@/core/use'
import { get } from '@/core/helpers'

export default function useInjectsClassesListClass(property: string): ComputedRef<CssClass> {
  const configuration = useInjectsConfiguration()
  return computed<CssClass>((): CssClass => get(configuration.classesList, property, ''))
}
