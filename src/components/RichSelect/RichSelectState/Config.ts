export const VanillaRichSelectStateConfig = {
  classes: {
    wrapper: 'flex items-center justify-center space-x-1',
    loadingIcon: 'animate-spin w-3.5 h-3.5 -mr-2',
  },
}

export const VanillaRichSelectStateClassesKeys = Object.keys(VanillaRichSelectStateConfig.classes)

export type VanillaRichSelectStateClassesValidKeys = keyof typeof VanillaRichSelectStateConfig.classes

