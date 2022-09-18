import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { get, useInjectsConfiguration } from '../index'
import type { CssClass } from '../types'

export default function useInjectsClassesListClass(property: string): ComputedRef<CssClass> {
  const configuration = useInjectsConfiguration()
  return computed<CssClass>((): CssClass => get(configuration.classesList, property, ''))
}
