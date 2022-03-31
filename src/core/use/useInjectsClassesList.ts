import { ComputedRef, computed } from 'vue';
import { useInjectsConfiguration } from '@/core';
import { CSSClassesList } from '@/core/types';

export default function useInjectsClassesList(key = 'configuration_vanilla'): ComputedRef<CSSClassesList> {
  const configuration = useInjectsConfiguration(key);

  return computed<CSSClassesList>((): CSSClassesList => configuration.classesList || {});
}
