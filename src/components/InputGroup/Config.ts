export const VanillaInputGroupConfig = {
  fixedClasses: {},
  classes: {

    inlineContainer: 'sm:grid sm:grid-cols-3 sm:gap-4',
    inlineLabel: 'flex items-center text-sm leading-3 font-medium text-gray-500 dark:text-white',
    inlineInput: 'text-sm leading-5 sm:col-span-2 mt-2 sm:mt-0',
    inlineWithPadding: 'sm:px-6 px-6 py-5',

    rowContainer: 'grid space-y-2',
    rowLabel: '',
    rowInput: '',
    rowWithPadding: 'px-6 py-3.5 mt-0',

    contentContainer: 'sm:grid',
    contentLabel: '',
    contentInput: '',
    contentWithPadding: 'px-6 py-3 mt-0',
  },
}

export const VanillaInputGroupClassesKeys = Object.keys(VanillaInputGroupConfig.classes)

export type VanillaInputGroupClassesValidKeys = keyof typeof VanillaInputGroupConfig.classes
