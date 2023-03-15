import type { PropType } from 'vue'
import type { CSSRawClassesList, ComponentProps, Data, ElementPosition, VariantsWithClassesList } from '../types'
import { useDefaultName } from '../use/index'

const useVariantProps = <ComponentOptions extends Data, ClassesKeys extends string>(): ComponentProps<ClassesKeys> => ({
  classes: {
    type: [String, Array, Object] as PropType<CSSRawClassesList<ClassesKeys>>,
    default: undefined,
  },
  fixedClasses: {
    type: [String, Array, Object] as PropType<CSSRawClassesList<ClassesKeys>>,
    default: undefined,
  },
  variants: {
    type: Object as PropType<VariantsWithClassesList<ComponentOptions, ClassesKeys> | undefined>,
    default: undefined,
  },
  variant: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  errors: {
    type: [String, undefined] as PropType<string | undefined>,
    default: undefined,
  },
  feedback: {
    type: [String] as PropType<string | undefined>,
    default: undefined,
  },
  name: {
    type: [String] as PropType<string>,
    required: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    default(props) {
      return useDefaultName(props)
    },
  },
  autocomplete: {
    required: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    default(props): string | boolean {
      return props.name || false
    },
  },
  hasItemBelow: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: false,
  },
  hasItemAbove: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: false,
  },
  rounded: {
    type: String as PropType<ElementPosition>,
    default: 'full',
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
})

export default useVariantProps
