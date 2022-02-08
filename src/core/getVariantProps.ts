import {
  CSSClass,
  CSSRawClassesList,
  Data, Errors,
  Variants,
  VariantsWithClassesList,
} from '@/core';
import { VcProps, VCWithClassesListProps } from '@/core/types';
import { PropType } from 'vue';

const getVariantProps = <ComponentOptions extends Data>() : VcProps => ({
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
    type: [String, Array, Object, undefined] as PropType<Errors>,
    default: undefined,
  },
});

const getVariantPropsWithClassesList = <ComponentOptions extends Data, ClassesKeys extends string>() : VCWithClassesListProps<ClassesKeys> => ({
  classes: {
    type: [String, Array, Object] as PropType<CSSRawClassesList<ClassesKeys>>,
    default: undefined,
  },
  fixedClasses: {
    type: [String, Array, Object] as PropType<CSSRawClassesList<ClassesKeys>>,
    default: undefined,
  },
  variants: {
    type: Object as PropType<VariantsWithClassesList<ComponentOptions, ClassesKeys>>,
    default: undefined,
  },
  variant: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  errors: {
    type: [String, Array, Object, undefined] as PropType<Errors>,
    default: undefined,
  },
});

export {
  getVariantProps,
  getVariantPropsWithClassesList,
};
