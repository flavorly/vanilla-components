import {
  CSSClass, CSSRawClassesList, Data, Variants, VariantsWithClassesList,
} from '@variantjs/core';

import { PropType } from 'vue';
import { VariantJSProps, VariantJSWithClassesListProps } from '../types';

const getVariantProps = <ComponentOptions extends Data>() : VariantJSProps => ({
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
});

const getVariantPropsWithClassesList = <ComponentOptions extends Data, ClassesKeys extends string>() : VariantJSWithClassesListProps<ClassesKeys> => ({
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
});

export { getVariantProps, getVariantPropsWithClassesList };
