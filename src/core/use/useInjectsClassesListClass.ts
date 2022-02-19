import { ComputedRef, computed } from 'vue';
import { useInjectsConfiguration, get } from '@/core';
import { CSSClass } from '@/core/types';

export default function useInjectsClassesListClass(property: string): ComputedRef<CSSClass> {
  const configuration = useInjectsConfiguration();
  return computed<CSSClass>((): CSSClass => get(configuration.classesList, property, ''));
}
