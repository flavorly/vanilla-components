import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { get, useInjectsConfiguration } from '../index'
import type { CSSClass } from '../types'

export default function useInjectsClassesListClass(property: string): ComputedRef<CSSClass> {
  const configuration = useInjectsConfiguration()
  return computed<CSSClass>((): CSSClass => get(configuration.classesList, property, ''))
}
