import {
  CSSRawClassesList,
  Data,
  VariantsWithClassesList,
} from '@/core';
import { VCWithClassesListProps } from '@/core/types';
import { PropType } from 'vue';


const useVariantPropsWithClassesList = <ComponentOptions extends Data, ClassesKeys extends string>() : VCWithClassesListProps<ClassesKeys> => ({
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

export default useVariantPropsWithClassesList;
