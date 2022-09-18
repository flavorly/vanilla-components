import mapValues from 'lodash/mapValues'
import { VanillaInputConfig } from '../Input/Config'

export const VanillaDatetimePickerConfig = VanillaInputConfig

/**
 * Converts our own config into VariantJS config
 * @param configuration
 * @constructor
 */
export const VanillaDatetimePickerConfigToVariantJs = (configuration: any) => {
  return {
    fixedClasses: configuration.fixedClasses.input,
    classes: VanillaDatetimePickerConfig.classes.input,
    variants: mapValues(configuration.variants, (value) => {
      return {
        classes: value.classes.input,
      }
    }),
  }
}

export const VanillaDatetimePickerClassesKeys = Object.keys(VanillaDatetimePickerConfig.classes)

export type VanillaDatetimePickerClassesValidKeys = keyof typeof VanillaDatetimePickerConfig.classes

