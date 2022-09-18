import mapValues from 'lodash/mapValues'
import { VanillaInputConfig } from '../Input/Config'

export const VanillaTextareaConfig = VanillaInputConfig

/**
 * Converts our own config into VariantJS config
 * @param configuration
 * @constructor
 */
export const VanillaTextareaConfigToVariantJs = (configuration: any) => {
  return {
    fixedClasses: configuration.fixedClasses.input,
    classes: VanillaTextareaConfig.classes.input,
    variants: mapValues(configuration.variants, (value) => {
      return {
        classes: value.classes.input,
      }
    }),
  }
}

export const VanillaTextareaClassesKeys = Object.keys(VanillaTextareaConfig.classes)

export type VanillaTextareaClassesValidKeys = keyof typeof VanillaTextareaConfig.classes

