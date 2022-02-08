import {
  CSSRawClassesList,
  Data, Errors,
  VariantsWithClassesList,
} from '@/core';
import { VanillaComponentWithClassesListProps } from '@/core/types';
import { PropType } from 'vue';


const useVariantPropsWithClassesList = <ComponentOptions extends Data, ClassesKeys extends string>() : VanillaComponentWithClassesListProps<ClassesKeys> => ({
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
    type: [String, Array, Object] as PropType<Errors>,
    default: undefined,
  },
});

export default useVariantPropsWithClassesList;
