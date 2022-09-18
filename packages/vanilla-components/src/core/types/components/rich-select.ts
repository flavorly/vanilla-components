import type { HTMLAttributes } from 'vue'
import type {
  Options,
  Placement,
} from '@popperjs/core'
import type {
  Data,
  FetchOptionsFn,
  InputOptions,
  Measure,
  NormalizedOption,
  NormalizedOptions,
  PreFetchOptionsFn,
  WithVariantPropsAndClassesList,
} from '../index'

import type { VanillaRichSelectClassesValidKeys } from './config'

export declare type MinimumInputLengthTextProp = ((minimumInputLength: number, query?: string) => string) | string

export declare type VanillaRichSelectValue = string | number | boolean | undefined | null | Date | Function | symbol | VanillaRichSelectValue[]

export declare type VanillaRichSelectProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaRichSelectValue
  options?: InputOptions | NormalizedOption[] | NormalizedOptions
  multiple?: boolean
  name?: string
  tags?: boolean
  normalizeOptions?: boolean
  valueAttribute?: string
  textAttribute?: string
  delay?: number
  fetchOptions?: FetchOptionsFn
  prefetchOptions?: boolean | PreFetchOptionsFn
  minimumInputLength?: number
  minimumInputLengthText?: MinimumInputLengthTextProp
  minimumResultsForSearch?: number
  hideSearchBox?: boolean
  toggleOnFocus?: boolean
  toggleOnClick?: boolean
  closeOnSelect?: boolean
  selectOnClose?: boolean
  clearable?: boolean
  disabled?: boolean
  placeholder?: string
  searchBoxPlaceholder?: string
  noResultsText?: string
  searchingText?: string
  loadingClosedPlaceholder?: string
  loadingMoreResultsText?: string
  maxHeight?: Measure | null
  dropdownPlacement?: Placement
  dropdownPopperOptions?: Options
  teleport?: boolean
  teleportTo?: string | HTMLElement
} & HTMLAttributes & Data, VanillaRichSelectClassesValidKeys>
