import {
  CSSClass,
  Data,
  Errors,
  Variants,
  VanillaComponentProps,
} from '@/core/types';
import { PropType } from 'vue';

const useVariantProps = <ComponentOptions extends Data>() : VanillaComponentProps => ({
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
  feedback: {
    type: [String] as PropType<string | undefined>,
    default: undefined,
  },
  name: {
    type: [String] as PropType<string>,
    required: false,
    default: Date.now().toString(36) + Math.random().toString(36).substr(2),
  },
});

export default useVariantProps;
