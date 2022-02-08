import {
  CSSClass,
  Data,
  Errors,
  Variants,
} from '@/core';

import { PropType } from 'vue';
import { VcProps } from '@/Core/types';

const useVariantProps = <ComponentOptions extends Data>() : VcProps => ({
  classes: {
    type: [String, Array, Object] as PropType<CSSClass>,
    default: undefined,
  },
  fixedClasses: {
    type: [String, Array, Object] as PropType<CSSClass>,
    default: undefined,
  },
  variants: {
    type: Object as PropType<Variants<ComponentOptions>>,
    default: undefined,
  },
  variant: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  errors: {
    type: [String, Array, Object] as PropType<Errors>,
    default: undefined,
  },
});

export default useVariantProps;
