import { inject } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../types'

export default function useInjectsConfiguration<P extends WithVariantPropsAndClassesList<Data, string>>(key = 'configuration_vanilla'): P {
  return inject<P>(key, {} as P)
}
