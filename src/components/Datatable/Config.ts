
export const VanillaDatatableConfig = {
  fixedClasses: {},
  // Default appearance
  classes: {

    cardVariant: '',

    genericForbidden: 'cursor-not-allowed',
    genericPointer: 'cursor-pointer',
    genericFormsContentContainer: 'flex items-center justify-center space-x-1 text-xs select-none cursor-pointer',
    genericFormsContentLink: 'underline flex items-center justify-center space-x-1',
    genericFormsContentIcons: 'h-4 w-4',

    actionsContainer: 'inline-flex',
    actionsButtonVariant: 'primary',
    actionsButtonCount: 'ml-1 text-xxs text-white xxs:hidden',

    headerFiltersContainer: 'inline-flex',
    headerFiltersIcon: 'h-4 h-4 sm:mr-1',
    headerFiltersLabel: 'hidden sm:block',
    headerFiltersCount: 'ml-1 text-xxs',

    headerSettingsContainer: 'inline-flex',
    headerSettingsIcon: 'h-4 w-4',
    headerSettingsRefreshIcon: 'h-4 h-4',
    headerSettingsRefreshIconAnimation: 'animate-spin',
    headerSettingsEditIcon: 'h-4 h-4',

    searchContainer: 'px-5 mt-3 mb-3',
    searchInputVariant: 'compact',
    searchInputClasses: '',
    searchIcon: '-mr-2 h-4 w-4 text-gray-400',

    filtersBarContainer: 'px-5 mt-2 my-3',
    filtersBarInner: 'flex items-center space-x-1 text-xs',
    filtersBarBadgesContainer: 'flex flex-wrap items-center gap-1',

    filtersBadge: 'flex-shrink-0 inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700',
    filtersBadgeLabel: 'flex space-x-1',
    filtersBadgeRemoveButton: 'flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-primary-400 hover:bg-primary-200 hover:text-primary-500 focus:outline-none focus:bg-primary-500 focus:text-white',
    filtersBadgeRemoveIcon: 'h-2 w-2',

    selectionBarContainer: 'px-6 sm:px-8 py-3 bg-primary-100/50 dark:bg-primary-500 items-center text-left text-xs text-primary-900 dark:text-white space-x-1 space-y-1 sm:space-y-0 flex flex-col sm:flex-row',
    selectionBarButton: 'cursor-pointer inline-flex items-center rounded-md bg-transparent border border-primary-900 dark:border-white px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-primary-900 focus:ring-offset-primary-100 dark:focus:ring-offset-primary-500',
    selectionBarOrText: 'hidden sm:inline mx-1',

    emptyStateContainer: 'flex items-center justify-center text-center bg-gray-50 px-6 py-8 dark:bg-gray-800',
    emptyStateRow: 'flex items-center justify-center',
    emptyStateIcon: 'text-gray-200 w-28 h-28',
    emptyStateInner: 'text-sm w-full space-y-2',
    emptyStateTitle: 'text-small text-gray-500 mb-3 mt-3',
    emptyStateText: '',
    emptyStateResetFiltersButtonVariant: 'primary',
    emptyStateResetFiltersButtonIcon: 'h-4 w-4',

    tableContainer: 'datatable overflow-x-auto border-t dark:border-gray-700',
    tableClass: 'min-w-full m-0 table-auto',
    tableBody: 'divide-y bg-gray-50 dark:bg-gray-800',
    tableRow: '',
    tableColumn: 'whitespace-nowrap py-2 text-sm text-gray-500 dark:text-white',
    tableColumnCheckbox: 'px-6 py-3 text-sm w-[10px]',
    tableCheckbox: 'block transition duration-150 ease-in-out checked:bg-primary-600 checked:text-white dark:focus:ring-offset-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:checked:bg-primary-600 h-4 w-4',

    tableHeadColumnCheckbox: 'bg-gray-100 text-left text-xs px-6 py-3 leading-4 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap dark:bg-gray-700',
    tableHeadCheckbox: '', // Inherits main checkbox.
    tableHeadColumn: 'bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap dark:bg-gray-700 dark:text-white',
    tableHeadColumnContainer: 'group inline-flex',
    tableHeadColumnSortContainer: 'ml-2 flex-none rounded',
    tableHeadColumnLabel: '',
    tableHeadColumnSorted: 'bg-gray-200 text-gray-900 group-hover:bg-gray-300',
    tableHeadColumnNotSorted: 'invisible group-focus:visible text-gray-400 group-hover:visible',
    tableHeadColumnSortedIcon: 'text-gray-400 group-hover:visible group-focus:visible invisible',
    tableHeadColumnSortedIconClasses: 'h-4 w-4 flex-none rounded',

    actionIconContainer: 'mx-auto flex flex-shrink-0  items-center justify-center h-12 w-12 rounded-full',
    actionIcon: 'h-6 w-6',
    actionIconContainerDanger: 'bg-red-100',
    actionIconContainerSuccess: 'bg-green-100',
    actionIconContainerWarning: 'bg-yellow-100',
    actionIconContainerInfo: 'bg-blue-100',

    actionIconDanger: 'text-red-600',
    actionIconSuccess: 'text-green-600',
    actionIconWarning: 'text-yellow-600',
    actionIconInfo: 'text-blue-600',

    actionsContentContainer: 'mt-3 text-center sm:mt-5',
    actionsTitle: 'text-lg leading-6 font-medium text-gray-900 dark:text-white',
    actionsText: 'mt-2 text-sm leading-5 text-gray-600 dark:text-gray-300',

    paginationContainer: 'px-4 py-3 flex items-center justify-between border-gray-200 border-t sm:px-6 dark:border-gray-700',
    paginationShortContainer: 'flex-1 flex justify-between sm:hidden',
    paginationShortIcon: 'h-5 w-5',
    paginationShortLeft: 'mr-2',
    paginationShortRight: 'ml-2',

    paginationFullContainer: 'hidden sm:flex-1 sm:flex sm:items-center sm:justify-between',
    paginationFullNumberOfRecords: 'text-sm leading-5 text-gray-700 dark:text-gray-400',
    paginationFullButtonsContainer: 'relative z-0 inline-flex shadow-sm cursor-pointer',
    paginationFullIcon: 'h-6 w-5',
    paginationFullLeft: 'rounded-l-md rounded-r-none focus:ring-0',
    paginationFullRight: '-ml-px rounded-r-md rounded-l-none focus:ring-0',
    paginationFullPage: 'focus:bg-gray-300/10',
    paginationFullPageActive: 'bg-primary-50 text-primary-600',

    skeletonTableBody: 'bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700',
    skeletonTableColumn: 'px-2 py-3 whitespace-nowrap leading-5',


  },
};

export const VanillaDatatableClassesKeys = Object.keys(VanillaDatatableConfig.classes);

export type VanillaDatatableClassesValidKeys = keyof typeof VanillaDatatableConfig.classes;




