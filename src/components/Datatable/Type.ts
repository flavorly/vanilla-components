import type { InputHTMLAttributes } from 'vue'
import type { VanillaDatatableClassesValidKeys } from './Config'
import type { Data, InputOptions, NormalizedOption, NormalizedOptions, WithVariantPropsAndClassesList } from '@/core/types'

export declare interface VanillaDatatableUserSettings {
  visibleColumns: string[]
  perPage: number
  useStorage: boolean
  saveSelection: boolean
  selectedIds: string[]
  filters: VanillaDatatableSavedFilter
}

export declare interface VanillaDatatableOptions {
  selectable?: boolean
  searchable?: boolean
  refreshable?: boolean
  manageSettings?: boolean
  showTotalItems?: boolean
  compact?: boolean
  striped?: boolean
}

export declare interface VanillaDatatablePooling {
  enable?: boolean
  interval?: number
  during?: number
  stopWhenDataChanges?: boolean
}

export declare interface VanillaDatatableFilter {
  name: string
  label: string
  layout?: string
  component: string
  placeholder?: string
  value?: string | undefined | null | number
  defaultValue?: string | undefined | null | number
  options?: undefined | InputOptions | NormalizedOption[] | NormalizedOptions
  rules?: undefined | string[]
  props?: VanillaDatatableFilterProp[]
}

export declare interface VanillaDatatableFilterProp {
  key: string
  value: unknown
}

export declare interface VanillaDatatableSavedFilter {
  [key: string]: unknown
}

export declare type VanillaDatatablePageOption = {
  value: string | number | undefined | null | object | boolean
  text: string | number | undefined
} & NormalizedOption

export declare interface VanillaDatatableTranslations {
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

  showingFrom?: string
  nextPage?: string
  previousPage?: string
}

export declare interface VanillaDatatableColumn {
  name: string
  label: string
  sortable: boolean
  native?: boolean
  hidden?: boolean
  defaultSortAs?: 'asc' | 'desc' | undefined | string
  raw?: boolean
  component?: string
}

export declare type VanillaDatatableColumnComputed = {
  visible: boolean
  isSorted: boolean
  isSortedAsc: boolean
  isSortedDesc: boolean
  slotName: string
} & VanillaDatatableColumn

declare type VanillaActionCallback = (action: VanillaDatatableAction) => void

export declare interface VanillaDatatableAction {
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
    callback?: VanillaActionCallback
  }
  after?: {
    clearSelected?: boolean
    resetFilters?: boolean
    pooling?: VanillaDatatablePooling
    callback?: VanillaActionCallback
  }

  [key: string]: any
}

export declare interface VanillaDatatableSortedColumn {
  column: string
  direction: 'asc' | 'desc' | null
  sortedTimes?: number
}

export declare type VanillaDatatableSortedColumns = VanillaDatatableSortedColumn[]

export declare interface VanillaDatatableQueryData {
  search: null | undefined | string
  perPage: number | string | keyof VanillaDatatablePageOption
  selected: (string)[]
  selectedAll: boolean
  filters: VanillaDatatableSavedFilter
  sorting: VanillaDatatableSortedColumn[]
  action?: null | undefined | string
}

export declare interface VanillaDatatableResultData {
  id: string | number
  created_at?: string
  updated_at?: string

  [key: string]: any
}

export declare interface VanillaDatatableResponsePage {
  url: string
  label: string | number
  active: boolean
}

export declare interface VanillaDatatableLinks {
  next: string | null
  previous: string | null
  pages?: VanillaDatatableResponsePage[] | null
}

export declare interface VanillaDatatableMeta {
  current_page: number
  from: number
  to: number
  total: number
}

export declare interface VanillaDatatableResponse {
  data: VanillaDatatableResultData[]
  links: VanillaDatatableLinks | undefined
  meta: VanillaDatatableMeta | undefined

  [key: string]: any
}

export declare type VanillaDatatableActions = VanillaDatatableAction[]

export declare type VanillaDatatableColumns = VanillaDatatableColumn[]

export declare type VanillaDatatableColumnsComputed = VanillaDatatableColumnComputed[]

export declare type VanillaDatatableFilters = VanillaDatatableFilter[]

export declare type VanillaDatatableSavedFilters = VanillaDatatableSavedFilter[]

export declare type VanillaDatatablePageOptions = VanillaDatatablePageOption[] & NormalizedOptions & InputOptions

export declare interface VanillaDatatableConfiguration {
  name: string | number
  primaryKey: string | number
  columns: VanillaDatatableColumns
  actions: VanillaDatatableActions

  filters: VanillaDatatableFilters
  filtersKey?: string | number
  filtersBaseUrl?: string | undefined

  options: VanillaDatatableOptions
  translations: VanillaDatatableTranslations
  perPageOptions: VanillaDatatablePageOptions
  pooling: VanillaDatatablePooling

  fetchData?: VanillaDatatableFetchDataFunction
  fetchEndpoint?: string
  fetchMethod?: string | 'GET' | 'POST' | 'PUT' | 'DELETE'

  actionsEndpoint?: string
  actionsMethod?: string | 'GET' | 'POST' | 'PUT' | 'DELETE'

  onActionExecutedCallback?: VanillaDatatableActionExecutedFunction
  onExceptionCallback?: VanillaDatatableExceptionFunction

  [key: string]: any
}

export declare type VanillaDatatableFetchDataFunction = (configuration: VanillaDatatableConfiguration, data: VanillaDatatableQueryData) => VanillaDatatableFetchDataPromise
export declare type VanillaDatatableActionExecutedFunction = (action: VanillaDatatableAction) => Promise<never>
export declare type VanillaDatatableExceptionFunction = (error: object) => Promise<never>

export declare type VanillaDatatableFetchDataPromise = Promise<{
  data: VanillaDatatableResultData[]
  links?: VanillaDatatableLinks | undefined
  meta?: VanillaDatatableMeta

  [key: string]: any
}>

export declare type VanillaDatatableProps = WithVariantPropsAndClassesList<{
  config?: VanillaDatatableConfiguration
} & InputHTMLAttributes & Data, VanillaDatatableClassesValidKeys>
