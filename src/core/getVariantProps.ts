import {
  CSSClass,
  CSSRawClassesList,
  Data,
  Errors,
  Variants,
  VariantsWithClassesList,
} from '@/core/types';
import { VanillaComponentProps, VanillaComponentWithClassesListProps } from '@/core/types';
import { PropType } from 'vue';

const getVariantProps = <ComponentOptions extends Data>() : VanillaComponentProps => ({
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

const getVariantPropsWithClassesList = <ComponentOptions extends Data, ClassesKeys extends string>() : VanillaComponentWithClassesListProps<ClassesKeys> => ({
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

export {
  getVariantProps,
  getVariantPropsWithClassesList,
};
