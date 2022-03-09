import { inject } from 'vue';
import { Data, WithVariantPropsAndClassesList } from '@/core/types';

export default function useInjectsConfiguration<P extends WithVariantPropsAndClassesList<Data, string>>(): P {
  return inject<P>('configuration_vanilla', {} as P);
}
