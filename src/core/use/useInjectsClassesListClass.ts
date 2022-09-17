import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { get, useInjectsConfiguration } from '@/core'
import type { CSSClass } from '@/core/types'

export default function useInjectsClassesListClass(property: string): ComputedRef<CSSClass> {
  const configuration = useInjectsConfiguration()
  return computed<CSSClass>((): CSSClass => get(configuration.classesList, property, ''))
}
