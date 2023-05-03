import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'
import { mergeClasses } from '../../core/helpers'
import { commonClasses } from '../../core/config'

export const dateTimeInputConfig = {
  fixedClasses: {
    wrapper: 'relative items-center justify-between focus:z-10',
    clearButton: mergeClasses(
      'absolute flex items-center justify-center dark:text-gray-700 text-gray-300 rounded mr-3 hover:bg-gray-100 hover:text-gray-400 dark:hover:bg-gray-700 focus:ring-opacity-70 top-1/2 right-0 transform -translate-y-1/2',
      commonClasses.buttonRing,
      'focus:ring-primary-600',
      commonClasses.iconsSize,
      commonClasses.inputsTransition,
    ),
  },
  classes: {
    wrapper: '',
    clearButton: '',
  },
}
export const dateTimeInputClassesKeys = Object.keys(dateTimeInputConfig.classes)

export declare type DateTimeInputValue = string | undefined
export declare type DateTimeInputClassesValidKeys = keyof typeof dateTimeInputConfig.classes
export declare type DateTimeInputProps = WithVariantPropsAndClassesList<{
  modelValue?: DateTimeInputValue
  placeholder?: string
  inline?: boolean
} & InputHTMLAttributes & Data, DateTimeInputClassesValidKeys>

