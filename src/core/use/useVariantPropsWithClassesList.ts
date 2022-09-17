import type { PropType } from 'vue'
import type {
  CSSRawClassesList,
  Data,
  Errors,
  VanillaComponentWithClassesListProps,
  VariantsWithClassesList,
} from '@/core/types'

const useVariantPropsWithClassesList = <ComponentOptions extends Data, ClassesKeys extends string>(): VanillaComponentWithClassesListProps<ClassesKeys> => ({
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
  feedback: {
    type: [String] as PropType<string | undefined>,
    default: undefined,
  },
  name: {
    type: [String] as PropType<string>,
    required: false,
    default: Date.now().toString(36) + Math.random().toString(36).substr(2),
  },
  hasItemBellow: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: false,
  },
  hasItemAbove: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: false,
  },
  showErrors: {
    type: Boolean as PropType<boolean>,
    default: true,
    required: false,
  },
  showFeedback: {
    type: Boolean as PropType<boolean>,
    default: true,
    required: false,
  },
  autocomplete: {
    type: Boolean as PropType<string | boolean>,
    default: false,
    required: false,
  },
})

export default useVariantPropsWithClassesList
