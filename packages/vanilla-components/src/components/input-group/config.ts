export const VanillaInputGroupConfig = {
  fixedClasses: {},
  classes: {
    wrapper: 'grid space-y-2',
    wrapperWithPadding: 'px-6 py-3.5 mt-0',
    label: '',
  },
  variants: {
    inline: {
      classes: {
        wrapper: 'sm:grid sm:grid-cols-3 sm:gap-4',
        wrapperWithPadding: 'sm:px-6 px-6 py-5',
        label: 'flex items-center text-sm leading-3 font-medium text-gray-500 dark:text-white',
      },
    },
    content: {
      classes: {
        wrapper: 'sm:grid',
        wrapperWithPadding: 'px-6 py-3 mt-0',
        label: '',
      },
    },
  },
}

export const VanillaInputGroupClassesKeys = Object.keys(VanillaInputGroupConfig.classes)

export type VanillaInputGroupClassesValidKeys = keyof typeof VanillaInputGroupConfig.classes