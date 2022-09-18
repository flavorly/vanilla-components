import { VanillaInputConfig } from '../input/config'

export const VanillaTextareaConfig = VanillaInputConfig

export const VanillaTextareaClassesKeys = Object.keys(VanillaTextareaConfig.classes)

export type VanillaTextareaClassesValidKeys = keyof typeof VanillaTextareaConfig.classes

