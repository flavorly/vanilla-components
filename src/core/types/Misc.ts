import type { InputOptions } from '@/core/types'

type Measure = string | number

type Data = Record<string, unknown>

type PromiseRejectFn = ((reason?: any) => void)

type FetchOptionsFn = (query?: string, nextPage?: number) => FetchedOptions

type Truthy = boolean | string

type IconProp = Element | string | (Data & { render?: Function })

type FetchedOptions = Promise<{ results: InputOptions; hasMorePages?: boolean }>

type PreFetchOptionsFn = (currentValue?: any) => Promise<InputOptions>

type DebounceFn = (...args: any[]) => void

type DebouncedFn = {
  cancel: () => void
} & DebounceFn

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
}

