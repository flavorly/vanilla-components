import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaDatatableClassesValidKeys } from './Config';

declare type ActionBeforeCallback = (VanillaDatatableAction: string) => void;
declare type ActionAfterCallback = (response: Array<string> | Record<string, unknown>) => void;

export type VanillaDatatablePooling = {
  enable?: boolean,
  interval?: number,
  during?: number,
  stopWhenDataChanges?: boolean
};

export type VanillaDatatableAction = {
  name?: string,
  label?: string,
  limit: number | string,
  permissions: {
    view?: boolean,
    execute?: boolean
  },
  before?: {
     confirm?: {
       enable?: boolean,
       options?: {
         title?: string,
         subtitle?: string,
         text?: string,
         icon?: string,
         confirmButton?: string
         cancelButton?: string,
       }
     },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
     callback?: ActionBeforeCallback,
  },
  after?: {
    clearSelected?: boolean,
    resetFilters?: boolean,
    pooling: VanillaDatatablePooling,
    callback?: ActionAfterCallback,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
};

export type VanillaDatatableColumn = {
  name?: string,
  label?: string,
  sortable?: boolean,
  native?: boolean,
  hidden?: boolean,
  defaultSortAs?: 'asc' | 'desc' | undefined,
  raw: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
};


export type VanillaDatatableActions = Array<VanillaDatatableAction>;
export type VanillaDatatableColumns = Array<VanillaDatatableColumn>;

export type VanillaDatatableConfiguration = {
  name?: string,
  actions?: VanillaDatatableActions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
};

export type VanillaDatatableProps = WithVariantPropsAndClassesList<{
  config?: VanillaDatatableConfiguration,
} & InputHTMLAttributes & Data, VanillaDatatableClassesValidKeys>;
