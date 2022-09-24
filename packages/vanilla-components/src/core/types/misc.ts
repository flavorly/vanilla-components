import type { InputOptions } from './index'

type ObjectWithProperties<P> = Record<string | number | symbol, P>

type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp ? P : never }[keyof T]

type Measure = string | number

type Data = Record<string, unknown>

type PromiseRejectFn = ((reason?: any) => void)

type FetchOptionsFn = (query?: string, nextPage?: number) => FetchedOptions

type Truthy = boolean | string

type IconProp = Element | string | (Data & { render?: Function })

type FetchedOptions = Promise<{ results: InputOptions; hasMorePages?: boolean }>

type PreFetchOptionsFn = (currentValue?: any) => Promise<InputOptions>

type DebounceFn = (...args: any[]) => void

type Modify<T, R> = Omit<T, keyof R> & R

type DebouncedFn = {
  cancel: () => void
} & DebounceFn

type MinimumInputLengthTextProp = ((minimumInputLength: number, query?: string) => string) | string

type FavoriteCountriesValue = undefined | string | string[] | Array<string>

export {
  Measure,
  Data,
  PromiseRejectFn,
  FetchOptionsFn,
  Truthy,
  IconProp,
  FetchedOptions,
  PreFetchOptionsFn,
  DebouncedFn,
  DebounceFn,
  ObjectWithProperties,
  KeysOfType,
  Modify,
  MinimumInputLengthTextProp,
  FavoriteCountriesValue,
}

