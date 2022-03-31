import { inject } from 'vue';
import { Data, WithVariantPropsAndClassesList } from '@/core/types';

export default function useInjectsConfiguration<P extends WithVariantPropsAndClassesList<Data, string>>(key = 'configuration_vanilla'): P {
  return inject<P>(key, {} as P);
}
