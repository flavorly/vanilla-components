import type { InputHTMLAttributes } from 'vue'
import { commonClasses } from '../../core/config'
import { mergeClasses } from '../../core/helpers'
import type { Data, InputOptions, NormalizedOption, NormalizedOptions, WithVariantPropsAndClassesList } from '../../core/types'

export const selectConfig = {
  fixedClasses: {
    wrapper: 'relative',
    select: mergeClasses(
      'appearance-none block w-full',
      commonClasses.inputsShadows,
      commonClasses.inputsDisabled,
      commonClasses.inputsSpacing,
    ),
    selectIfMultiple: 'space-y-2',
  },

  // Default Input appearance
  classes: {
    wrapper: '',

    select: mergeClasses(
      '',
      commonClasses.inputsText,
      commonClasses.inputsTextColor,
      commonClasses.inputsBackground,
      commonClasses.inputsBorder,
      commonClasses.inputsRing,
      commonClasses.inputsRadius,
    ),

    selectIfMultiple: '',

    optGroup: mergeClasses(
      commonClasses.inputsSpacing,
      commonClasses.inputsDisabled,
      commonClasses.inputsText,
      commonClasses.inputsRadius,
      'checked:font-semibold',
      'checked:text-primary-900 checked:bg-primary-100 checked:dark:bg-primary-300 checked:dark:text-black',
      'select:focus:text-red-100',
      'w-full disabled:opacity-50',
      'cursor-pointer disabled:cursor-not-allowed',
      'text-sm font-normal',
      'px-3 py-2',
    ),
  },

  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        wrapper: '',
        select: mergeClasses(
          commonClasses.inputsErrorText,
          commonClasses.inputsErrorsBackground,
          commonClasses.inputsErrorsBorder,
          commonClasses.inputsErrorsRing,
          commonClasses.inputsRadius,
        ),
        selectIfMultiple: '',

        optGroup: mergeClasses(
          commonClasses.inputsSpacing,
          commonClasses.inputsDisabled,
          commonClasses.inputsText,
          commonClasses.inputsRadius,
          'checked:font-semibold',
          'checked:text-red-900 checked:bg-red-100 checked:dark:bg-red-300 checked:dark:text-black',
          'select:focus:text-red-100',
          'w-full disabled:opacity-50',
          'cursor-pointer disabled:cursor-not-allowed',
          'text-sm font-normal',
          'px-3 py-2',
        ),
      },
    },
  },
}

export const selectClassesKeys = Object.keys(selectConfig.classes)

export declare type SelectClassesValidKeys = keyof typeof selectConfig.classes

export declare type SelectValue = string | number | boolean | undefined | null | Date | Function | symbol | SelectValue[]

export declare type SelectProps = WithVariantPropsAndClassesList<{
  modelValue?: SelectValue
  options?: InputOptions | NormalizedOption[] | NormalizedOptions
  multiple?: boolean
  normalizeOptions?: boolean
  valueAttribute?: string
  textAttribute?: string
  disabled?: boolean
} & InputHTMLAttributes & Data, SelectClassesValidKeys>
