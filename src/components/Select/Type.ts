import { Data, InputOptions, NormalizedOption, NormalizedOptions, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaSelectClassesValidKeys } from './Config';

// eslint-disable-next-line @typescript-eslint/ban-types
export type VanillaSelectValue = string | number | boolean | undefined | null | Date | Function | symbol | VanillaSelectValue[];

export type VanillaSelectProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaSelectValue,
  options?: InputOptions | NormalizedOption[] | NormalizedOptions,
  multiple?: boolean
  normalizeOptions?: boolean,
  valueAttribute?: string,
  textAttribute?: string,
  disabled?: boolean,
} & InputHTMLAttributes & Data, VanillaSelectClassesValidKeys>;
