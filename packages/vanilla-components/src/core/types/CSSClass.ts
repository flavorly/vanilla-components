export interface CSSClassKeyValuePair {

  [key: string]: any
}

export type CSSClasses = CSSClass[]

export type CSSClass = CSSClassKeyValuePair | string | CSSClasses | undefined

export type CSSRawClassesList<ClassesKeys extends string = string> = {
  [key in ClassesKeys]?: CSSClass
}

export type CSSClassesList<ClassesKeys extends string = string> = {
  [key in ClassesKeys]?: CSSClass
}
