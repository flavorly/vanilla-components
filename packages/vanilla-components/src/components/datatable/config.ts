import type { InputHTMLAttributes } from 'vue'
import type { Data, InputOptions, NormalizedOption, NormalizedOptions, WithVariantPropsAndClassesList } from '@/core/types'
import { mergeClasses } from '@/core/helpers'

export const datatableConfig = {
  fixedClasses: {},

  // Default appearance
  classes: {

    cardVariant: '',

    genericForbidden: 'cursor-not-allowed',
    genericPointer: 'cursor-pointer',
    genericFormsContentContainer: 'flex items-center justify-center space-x-1 text-xs select-none cursor-pointer dark:text-white',
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
    headerSettingsSearchIcon: 'h-4 h-4',

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
    selectionBarButton: 'cursor-pointer inline-flex items-center rounded-md bg-transparent text-xs font-semibold focus:outline-none focus:underline',
    selectionBarOrText: 'hidden sm:inline mx-1',

    emptyStateContainer: 'flex items-center justify-center text-center bg-gray-50 px-6 py-8 dark:bg-gray-800',
    emptyStateRow: 'flex items-center justify-center',
    emptyStateIcon: 'text-gray-200 w-28 h-28',
    emptyStateInner: 'text-sm w-full space-y-2',
    emptyStateTitle: 'text-small text-gray-500 mb-3 mt-3',
    emptyStateText: '',
    emptyStateResetFiltersButtonVariant: 'primary',
    emptyStateResetFiltersButtonIcon: 'h-4 w-4',

    tableContainer: 'datatable overflow-x-auto dark:border-gray-700',
    tableContainerBorder: 'border-t',
    tableClass: 'min-w-full m-0 table-fixed',
    tableBody: 'divide-y bg-gray-50 dark:bg-gray-800 divide-gray-200 dark:divide-gray-700/90',
    tableRow: '',
    tableColumn: 'whitespace-nowrap py-2 pr-2 text-sm text-gray-500 dark:text-white',
    tableColumnCheckbox: 'px-6 py-3 text-sm w-[10px]',
    tableCheckbox: 'rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 block transition duration-150 ease-in-out dark:focus:ring-offset-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:checked:bg-primary-600 h-4 w-4',
    tableIdColumn: 'w-[60px]',

    tableHeadColumnCheckbox: 'bg-gray-100 text-left text-xs px-6 py-3 leading-4 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap dark:bg-gray-700',
    tableHeadCheckbox: '', // Inherits main checkbox.
    tableHeadColumn: 'py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap dark:bg-gray-700 dark:text-white',
    tableHeadColumnContainer: 'group inline-flex',
    tableHeadColumnSortContainer: 'ml-2 flex-none rounded',
    tableHeadColumnLabel: '',
    tableHeadColumnSorted: 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 group-hover:bg-gray-300 dark:group-hover:bg-gray-600',
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
    skeletonTableColumn: 'py-2 pr-3 whitespace-nowrap leading-5',
    skeletonPlaceholder: mergeClasses(
      'inline relative after:content-[\'\'] after:absolute after:-inset-0.5 after:animate-pulse after:h-5 after:w-full after:min-w-[2rem] after:rounded after:transition-all after:duration-500 after:inline-block',
      'after:bg-gradient-to-r',
      'after:from-gray-100 after:to-gray-200',
      'dark:after:from-gray-500 dark:after:to-gray-700',
    ),
  },
}

export const datatableClassesKeys = Object.keys(datatableConfig.classes)

export declare type DatatableClassesValidKeys = keyof typeof datatableConfig.classes

export declare interface DatatableUserSettings {
  hiddenColumns: string[]
  perPage: number
  useStorage: boolean
  saveSelection: boolean
  selectedIds: string[]
  filters: DatatableSavedFilter
}

export declare interface DatatableOptions {
  selectable?: boolean
  allSelectable?: boolean
  searchable?: boolean
  isSearchHidden?: boolean
  refreshable?: boolean
  manageSettings?: boolean
  showTotalItems?: boolean
  showPages?: boolean
  compact?: boolean
  striped?: boolean
  filtersHashingMethod?: string
}

export declare interface DatatablePooling {
  enable?: boolean
  interval?: number
  during?: number
  stopWhenDataChanges?: boolean
}

export declare interface DatatableFilter {
  name: string
  label: string
  layout?: string
  feedback?: string
  errors?: string
  component: string
  placeholder?: string
  value?: string | undefined | null | number | boolean
  defaultValue?: string | undefined | null | number
  options?: undefined | InputOptions | NormalizedOption[] | NormalizedOptions
  rules?: undefined | string[]
  props?: DatatableFilterProp[]
  fetchEndpoint?: string
  multiple?: boolean
  valueAttribute?: string
  textAttribute?: string
}

export declare interface DatatableFilterProp {
  key: string
  value: unknown
}

export declare interface DatatableSavedFilter {
  [key: string]: unknown
}

export declare type DatatablePageOption = {
  value: string | number | undefined | null | object | boolean
  text: string | number | undefined
} & NormalizedOption

export declare interface DatatableTranslations {
  title?: string
  subtitle?: string
  resource?: string
  resources?: string

  actionsButton?: string
  actionsSelectedRows?: string

  actionConfirmTitle?: string
  actionConfirmText?: string
  actionConfirmButton?: string
  actionCancelButton?: string

  search?: string
  searchPlaceholder?: string

  selectRows?: string
  selectedUndo?: string
  selectAllOr?: string
  selectAllMatching?: string
  selectAllMatchingUndo?: string

  filters?: string
  filtersBarLabel?: string
  filtersWithEmptyData?: string
  filtersReset?: string
  filtersResetOr?: string
  filtersCopy?: string
  filtersCopied?: string
  filtersSaveAndClose?: string
  filtersRemove?: string

  settings?: string
  settingsItemsPerPage?: string
  settingsVisibility?: string
  settingsPersist?: string
  settingsPersistSelection?: string
  settingsReset?: string
  settingsSaveAndClose?: string

  refresh?: string

  recordsEmpty?: string
  recordsEmptyWithFiltersOrSearch?: string
  recordsEmptyWithFiltersOrSearchAction?: string

  settingsPerPage?: string
  selectOption?: string

  showingFrom?: string
  nextPage?: string
  previousPage?: string

}

export declare interface DatatableColumn {
  name: string
  label: string
  sortable: boolean
  native?: boolean
  hidden?: boolean
  defaultSortAs?: 'asc' | 'desc' | undefined | string
  raw?: boolean
  component?: string
}

export declare type DatatableColumnComputed = {
  visible: boolean
  isSorted: boolean
  isSortedAsc: boolean
  isSortedDesc: boolean
  slotName: string
  sortedTimes?: number
} & DatatableColumn

export declare type ActionCallback = (action: DatatableAction, data: DatatableQueryData, datatable: DatatableConfiguration) => void

export declare interface DatatableAction {
  name: string
  label?: string
  icon?: string | 'danger' | 'success' | 'warning' | 'info' | undefined
  permissions?: {
    view?: boolean
    execute?: boolean
  }
  before?: {
    confirm?: {
      enable: boolean
      title?: string
      subtitle?: string | undefined
      text?: string
      icon?: string | undefined
      confirmButton?: string
      cancelButton?: string
      safe?: boolean
      classes?: {
        title?: string
        text?: string
        icon?: string
      }
    }
    callback?: ActionCallback
    [key: string]: any
  }
  after?: {
    clearSelected?: boolean
    resetFilters?: boolean
    refresh?: boolean
    pooling?: DatatablePooling
    callback?: ActionCallback
    redirect?: {
      url?: string
      newTab?: boolean
    }
    [key: string]: any
  }

  [key: string]: any
}

export declare interface DatatableSortedColumn {
  column: string
  direction: 'asc' | 'desc' | null
  sortedTimes?: number
}

export declare type DatatableSortedColumns = DatatableSortedColumn[]

export declare interface DatatableQueryData {
  search: null | undefined | string
  perPage: number | string | keyof DatatablePageOption
  selected: (string)[]
  selectedAll: boolean
  filters: DatatableSavedFilter
  sorting: DatatableSortedColumn[]
  action?: null | undefined | string
}

export declare interface DatatableResultData {
  id: string | number
  created_at?: string
  updated_at?: string

  [key: string]: any
}

export declare interface DatatableResponsePage {
  url: string
  label: string | number
  active: boolean
}

export declare interface DatatableLinks {
  next: string | null
  previous: string | null
  pages?: DatatableResponsePage[] | null
}

export declare interface DatatableMeta {
  current_page: number
  from: number
  to: number
  total: number
}

export declare interface DatatableResponse {
  data: DatatableResultData[]
  links: DatatableLinks | undefined
  meta: DatatableMeta | undefined

  [key: string]: any
}

export declare type DatatableActionsType = DatatableAction[]

export declare type DatatableColumns = DatatableColumn[]

export declare type DatatableColumnsComputed = DatatableColumnComputed[]

export declare type DatatableFilters = DatatableFilter[]

export declare type DatatableSavedFilters = DatatableSavedFilter[]

export declare type DatatablePageOptions = DatatablePageOption[] & NormalizedOptions & InputOptions

export declare interface DatatableConfiguration {
  name: string | number
  primaryKey: string | number
  columns: DatatableColumns
  actions: DatatableActionsType

  filters: DatatableFilters
  filtersKey?: string | number
  filtersBaseUrl?: string | undefined

  options: DatatableOptions
  translations: DatatableTranslations
  perPageOptions: DatatablePageOptions
  pooling: DatatablePooling

  fetchData?: DatatableFetchDataFunction
  fetchEndpoint?: string
  fetchMethod?: string | 'GET' | 'POST' | 'PUT' | 'DELETE'
  originUrl?: string | undefined

  actionsEndpoint?: string
  actionsMethod?: string | 'GET' | 'POST' | 'PUT' | 'DELETE'

  onActionExecutedCallback?: DatatableActionExecutedFunction
  onExceptionCallback?: DatatableExceptionFunction

  [key: string]: any
}

export declare type DatatableFetchDataFunction = (configuration: DatatableConfiguration, data: DatatableQueryData) => DatatableFetchDataPromise
export declare type DatatableActionExecutedFunction = (action: DatatableAction, data: DatatableQueryData) => Promise<never>
export declare type DatatableExceptionFunction = (error: object) => Promise<never>

export declare type DatatableFetchDataPromise = Promise<{
  data: DatatableResultData[]
  links?: DatatableLinks | undefined
  meta?: DatatableMeta

  [key: string]: any
}>

export declare type DatatableProps = WithVariantPropsAndClassesList<{
  config?: DatatableConfiguration
} & InputHTMLAttributes & Data, DatatableClassesValidKeys>

