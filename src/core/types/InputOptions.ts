export type NormalizedOptions = Array<NormalizedOption>;

export type InputOptionValue = string | number | undefined | null | object | boolean;

export type InputOptionText = string | number | undefined;

export type NormalizedOption = {
  value: InputOptionValue
  text: InputOptionText
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw?: any
  children?: NormalizedOptions
  disabled?: boolean | 'disabled'
};

export type InputOptions = Array<InputOption> | { [key: string]: InputOptionText };

export type InputOptionObject = {
  value?: InputOptionValue
  text?: InputOptionText
  disabled?: boolean | undefined
  children?: InputOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
};

export type InputOption = InputOptionObject | string | number;
