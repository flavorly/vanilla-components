import type { InputHTMLAttributes } from 'vue'
import type { Data, ObjectWithProperties, WithVariantPropsAndClassesList } from '@/core/types'

export const richRadioConfig = {
  fixedClasses: {
    container: 'relative flex-1',
    optionContainer: 'rounded-lg',
    optionContainerSeparated: 'space-y-2',
    optionContainerNonSeparated: '-space-y-px',
  },

  // Default Input appearance
  classes: {
    wrapper: '',
    container: '',
    optionContainer: '',
    optionContainerSeparated: '',
    optionContainerNonSeparated: '',
  },

  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        wrapper: '',
        container: '',
        optionContainer: '',
        optionContainerSeparated: '',
        optionContainerNonSeparated: '',
      },
    },
  },
}

export const richRadioClassesKeys = Object.keys(richRadioConfig.classes)

export declare type RichRadioClassesValidKeys = keyof typeof richRadioConfig.classes

export declare type RichRadioSimpleValue = string | number | boolean | undefined | null | Date | Function | symbol | object | string[]

export declare type RichRadioValue = RichRadioSimpleValue | RichRadioSimpleValue[] | ObjectWithProperties<RichRadioSimpleValue>

export declare type RichRadioProps = WithVariantPropsAndClassesList<{
    modelValue?: RichRadioValue
    value?: RichRadioValue
    checkedValue?: RichRadioValue
    uncheckedValue?: RichRadioValue
  }
  & InputHTMLAttributes & Data & {
  type?: 'checkbox'
  checked?: boolean
}, RichRadioClassesValidKeys>

