import type { InputHTMLAttributes } from 'vue'
import { commonClasses } from '../../core/config'
import { mergeClasses } from '../../core/helpers'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

const defaultInput = {
  input: mergeClasses(
    '',
    commonClasses.inputsText,
    commonClasses.inputsTextColor,
    commonClasses.inputsBackground,
    commonClasses.inputsRingBase,
    commonClasses.inputsRing,
    commonClasses.inputsSpacing,
    commonClasses.inputsAutofill,
  ),

  roundedFull: '',
  roundedTop: '',
  roundedBottom: '',
  roundedLeft: '',
  roundedRight: '',
  roundedBottomLeft: '',
  roundedBottomRight: '',
  roundedTopLeft: '',
  roundedTopRight: '',

  inputBorder: commonClasses.inputsBorder,
  wrapper: '',
  addonBefore: '',
  addonAfter: '',
  addonBeforeInputClasses: '',
  addonAfterInputClasses: '',
  addonClasses: 'text-gray-300 dark:text-gray-600',
}

export const inputConfig = {
  fixedClasses: {
    input: mergeClasses(
      'appearance-none w-full',
      commonClasses.inputsShadows,
      commonClasses.inputsDisabled,
    ),
    wrapper: 'relative',
    addonBefore: 'absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer',
    addonAfter: 'absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer',
    addonBeforeInputClasses: 'pl-10',
    addonAfterInputClasses: 'pr-10',
    addonClasses: commonClasses.iconsSize,
    roundedFull: commonClasses.inputsRadius,
    roundedTop: commonClasses.inputsRadiusTop,
    roundedBottom: commonClasses.inputsRadiusBottom,
    roundedLeft: commonClasses.inputsRadiusLeft,
    roundedRight: commonClasses.inputsRadiusRight,
    roundedBottomLeft: commonClasses.inputsRadiusBottomLeft,
    roundedBottomRight: commonClasses.inputsRadiusBottomRight,
    roundedTopLeft: commonClasses.inputsRadiusTopLeft,
    roundedTopRight: commonClasses.inputsRadiusTopRight,
  },

  // Default Input appearance
  classes: {
    ...defaultInput,
  },

  // Variants
  variants: {

    // Used for Errors
    error: {
      classes: {
        input: mergeClasses(
          commonClasses.inputsErrorText,
          commonClasses.inputsErrorsBackground,
          commonClasses.inputsRingBase,
          commonClasses.inputsErrorsRing,
        ),
        inputBorder: commonClasses.inputsErrorsBorder,
        wrapper: '',
        addonBefore: '',
        addonAfter: '',
        addonBeforeInputClasses: '',
        addonAfterInputClasses: '',
        addonClasses: 'text-red-300 dark:text-red-300/70',
      },
    },
    compact: {
      classes: {
        ...defaultInput,
        input: mergeClasses(
          '',
          commonClasses.inputsText,
          commonClasses.inputsTextColor,
          commonClasses.inputsBackground,
          commonClasses.inputsBorder,
          commonClasses.inputsRingBase,
          commonClasses.inputsRing,
          commonClasses.inputsRadius,
          'px-4 py-2',
        ),
        inputBorder: commonClasses.inputsBorder,
      },
    },
  },
}

export const inputClassesKeys = Object.keys(inputConfig.classes)

export declare type InputClassesValidKeys = keyof typeof inputConfig.classes

export declare type InputValue = string | number | undefined

export declare type InputProps = WithVariantPropsAndClassesList<{
  modelValue?: InputValue
  type?: string
  placeholder?: string
  copiable?: boolean
} & InputHTMLAttributes & Data, InputClassesValidKeys>

