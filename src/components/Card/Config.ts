export const VanillaCardConfig = {
  fixedClasses: {

  },
  classes: {

    card: 'relative bg-white shadow-lg rounded-lg sm:rounded-lg dark:bg-gray-750 dark:text-white dark:shadow-dark-xl dark:ring-1 dark:ring-inset dark:ring-white/10 overflow-x-hidden',

    header: 'px-4 py-5 border-b border-gray-200 sm:px-6 dark:border-gray-700',
    headerInner: 'flex justify-between items-center flex-wrap sm:flex-nowrap',

    titleWrapper: 'flex items-center text-left',
    title: 'text-lg leading-6 font-medium text-gray-800 dark:text-white',

    subtitle: 'mt-1 max-w-2xl text-sm leading-5 text-gray-500 dark:text-gray-400',

    actions: 'sm:ml-4 mt-4 flex-shrink flex',

    footer: 'px-4 py-3 flex items-center justify-end text-right sm:px-6 border-t border-gray-200 dark:border-gray-700',
    footerBorder: 'border-t border-gray-200 dark:border-gray-700',

    footerSimple: 'p-4 sm:p-6',
    footerSimpleRight: 'justify-end text-right flex items-center text-right sm:space-x-2',
    footerSimpleLeft: 'justify-start text-left flex items-center text-right sm:space-x-2',
    footerSimpleCenter: 'justify-center text-center flex items-center text-right sm:space-x-2',

    footerWithGrid: 'p-4 sm:p-6',
    footerWithOneGrid: 'sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense',
    footerWithTwoGrids: 'sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense space-y-2 sm:space-y-0',
    footerWithThreeGrids: 'sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense',

    footerSplitContainer: 'sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense',
    footerSplitLeft: 'flex mt-0 ml-0 items-center justify-center sm:justify-start mb-2 sm:mb-0',
    footerSplitRight: 'flex mt-0 sm:mt-0 items-center justify-center sm:justify-end',

    emptyStateContainer: 'flex items-center justify-center text-center px-6 py-8 rounded-lg',
    emptyState: 'text-sm w-full',
    emptyIcon: 'text-gray-200 dark:text-gray-600',

  },
};

export const VanillaCardClassesKeys = Object.keys(VanillaCardConfig.classes);

export type VanillaCardClassesValidKeys = keyof typeof VanillaCardConfig.classes;


