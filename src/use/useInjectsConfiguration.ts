import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { inject } from 'vue';

export default function useInjectsConfiguration<P extends WithVariantPropsAndClassesList<Data, string>>(): P {
  return inject<P>('configuration_vanilla', {} as P);
  //return inject<P>('vanilla_configuration', {} as P);
}
