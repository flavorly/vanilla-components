export interface CSSClassKeyValuePair {

  [key: string]: any
}

export type CSSClasses = CssClass[]

export type CssClass = CSSClassKeyValuePair | string | CSSClasses | undefined

export type CSSRawClassesList<ClassesKeys extends string = string> = {
  [key in ClassesKeys]?: CssClass
}

export type CSSClassesList<ClassesKeys extends string = string> = {
  [key in ClassesKeys]?: CssClass
}
