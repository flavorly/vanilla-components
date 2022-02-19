import { ComputedRef, computed } from 'vue';
import { useInjectsConfiguration } from '@/core';
import { CSSClassesList } from '@/core/types';

export default function useInjectsClassesList(): ComputedRef<CSSClassesList> {
  const configuration = useInjectsConfiguration();

  return computed<CSSClassesList>((): CSSClassesList => configuration.classesList || {});
}
