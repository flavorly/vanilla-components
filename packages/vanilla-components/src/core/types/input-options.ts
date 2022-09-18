export type NormalizedOptions = Array<NormalizedOption>

export type InputOptionValue = string | number | undefined | null | object | boolean

export type InputOptionText = string | number | undefined

export interface NormalizedOption {
  value: InputOptionValue
  text: InputOptionText
  description?: InputOptionText

  raw?: any
  children?: NormalizedOptions
  disabled?: boolean | 'disabled'
}

export type InputOptions = Array<InputOption> | { [key: string]: InputOptionText }

export interface InputOptionObject {
  value?: InputOptionValue
  text?: InputOptionText
  description?: InputOptionText
  disabled?: boolean | undefined
  children?: InputOptions

  [key: string]: any
}

export type InputOption = InputOptionObject | string | number
