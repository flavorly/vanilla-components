import { HTMLAttributes } from 'vue';
import {
  Data,
  InputOptions,
  NormalizedOption,
  NormalizedOptions,
  WithVariantPropsAndClassesList,
  Measure,
  FetchOptionsFn,
  PreFetchOptionsFn,
} from '@/core/types';

import {
  Placement,
  Options,
} from '@popperjs/core';

import { VanillaRichSelectClassesValidKeys } from '@/components/RichSelect/Config';

export type MinimumInputLengthTextProp = ((minimumInputLength: number, query?: string) => string) | string;

// eslint-disable-next-line @typescript-eslint/ban-types
export type VanillaRichSelectValue = string | number | boolean | undefined | null | Date | Function | symbol | VanillaRichSelectValue[];

export type VanillaRichSelectProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaRichSelectValue,
  options?: InputOptions | NormalizedOption[] | NormalizedOptions,
  multiple?: boolean
  name?: string,
  tags?: boolean
  normalizeOptions?: boolean,
  valueAttribute?: string,
  textAttribute?: string,
  delay?: number,
  fetchOptions?: FetchOptionsFn,
  prefetchOptions?: boolean | PreFetchOptionsFn,
  minimumInputLength?: number,
  minimumInputLengthText?: MinimumInputLengthTextProp,
  minimumResultsForSearch?: number,
  hideSearchBox?: boolean,
  toggleOnFocus?: boolean,
  toggleOnClick?: boolean,
  closeOnSelect?: boolean,
  selectOnClose?: boolean,
  clearable?: boolean,
  disabled?: boolean,
  placeholder?: string,
  searchBoxPlaceholder?: string,
  noResultsText?: string,
  searchingText?: string,
  loadingClosedPlaceholder?: string,
  loadingMoreResultsText?: string,
  maxHeight?: Measure | null,
  dropdownPlacement?: Placement,
  dropdownPopperOptions?: Options,
  teleport?: boolean,
  teleportTo?: string | HTMLElement,
} & HTMLAttributes & Data, VanillaRichSelectClassesValidKeys>;
