import { mapValues } from 'lodash';
import { commonClasses } from '@/core/config/commonClasses';
import { mergeClasses, popperOptions } from '@/core';
export const VanillaDropdownConfig = {
  fixedClasses: {

  },
  // Default Input appearance
  classes: {

  },
  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {

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
export const VanillaDropdownConfigToVariantJs = (configuration: any) => {
  return {
    fixedClasses: configuration.fixedClasses.input,
    classes: VanillaDropdownConfig.classes.input,
    variants: mapValues(configuration.variants, (value) => {
      return {
        classes: value.classes.input,
      };
    }),
  };
};


export const VanillaDropdownPopperDefaultOptions = popperOptions;

export const VanillaDropdownClassesKeys = Object.keys(VanillaDropdownConfig.classes);

export type VanillaDropdownClassesValidKeys = keyof typeof VanillaDropdownConfig.classes;


