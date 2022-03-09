import { mapValues } from 'lodash';
import { commonClasses } from '@/core/config/commonClasses';
import { mergeClasses } from '@/core';

export const VanillaSelectConfig = {
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
    wrapper : '',

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
        wrapper : '',
        select: mergeClasses(
          commonClasses.inputsErrorText,
          commonClasses.inputsErrorsBackground,
          commonClasses.inputsErrorsBorder,
          commonClasses.inputsErrorsRing,
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
};

/**
 * Converts our own config into VariantJS config
 * TODO : need to finish the typings
 * @param configuration
 * @constructor
 */
export const VanillaSelectConfigToVariantJs = (configuration: any) => {
  return {
    fixedClasses: configuration.fixedClasses.select,
    classes: VanillaSelectConfig.classes.select,
    variants: mapValues(configuration.variants, (value) => {
      return {
        classes: value.classes.select,
      };
    }),
  };
};

export const VanillaSelectClassesKeys = Object.keys(VanillaSelectConfig.classes);

export type VanillaSelectClassesValidKeys = keyof typeof VanillaSelectConfig.classes;


