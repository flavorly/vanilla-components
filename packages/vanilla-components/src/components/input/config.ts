import { commonClasses } from '@/core/config/commonClasses'
import { mergeClasses } from '@/core'

const defaultInput = {
  input: mergeClasses(
    '',
    commonClasses.inputsText,
    commonClasses.inputsTextColor,
    commonClasses.inputsBackground,
    commonClasses.inputsBorder,
    commonClasses.inputsRing,
    commonClasses.inputsRadius,
    commonClasses.inputsSpacing,
  ),
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
      'appearance-none block w-full',
      commonClasses.inputsShadows,
      commonClasses.inputsDisabled,
    ),
    wrapper: 'relative',
    addonBefore: 'absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer',
    addonAfter: 'absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer',
    addonBeforeInputClasses: 'pl-10',
    addonAfterInputClasses: 'pr-10',
    addonClasses: commonClasses.iconsSize,
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
          commonClasses.inputsErrorsBorder,
          commonClasses.inputsErrorsRing,
        ),
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
          commonClasses.inputsRing,
          commonClasses.inputsRadius,
          'px-4 py-2',
        ),
      },
    },
  },
}

export const inputClassesKeys = Object.keys(inputConfig.classes)

export declare type VanillaInputClassesValidKeys = keyof typeof inputConfig.classes

