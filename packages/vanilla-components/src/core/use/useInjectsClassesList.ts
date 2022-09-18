import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useInjectsConfiguration } from '../index'
import type { CSSClassesList } from '../types'

export default function useInjectsClassesList(key = 'configuration_vanilla'): ComputedRef<CSSClassesList> {
  const configuration = useInjectsConfiguration(key)

  return computed<CSSClassesList>((): CSSClassesList => configuration.classesList || {})
}
