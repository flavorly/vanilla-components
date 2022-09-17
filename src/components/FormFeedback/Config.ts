export const VanillaFormFeedbackConfig = {
  fixedClasses: 'mt-2 ml-1 text-xs',
  classes: 'text-gray-500 opacity-75 dark:text-gray-300 cursor-pointer',
}

export const VanillaFormFeedbackClassesKeys = Object.keys(VanillaFormFeedbackConfig.classes)

export type VanillaFormFeedbackClassesValidKeys = keyof typeof VanillaFormFeedbackConfig.classes

