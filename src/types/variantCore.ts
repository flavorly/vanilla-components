import {
  CSSRawClassesList,
  CSSClass, Variants, VariantsWithClassesList, WithVariantProps, WithVariantPropsAndClassesList, Data,
} from '@variantjs/core';

import { ComponentPropsOptions, PropType } from 'vue';
// import { TButtonOptions } from './components/t-button';
// import { TCardOptions } from './components/t-card';
// import { TCheckboxOptions } from './components/t-checkbox';
// import { TInputOptions } from './components/t-input';
// import { TInputGroupOptions } from './components/t-input-group';
// import { TRadioOptions } from './components/t-radio';
// import { TSelectOptions } from './components/t-select';
// import { TTagOptions } from './components/t-tag';
// import { TTextareaOptions } from './components/t-textarea';

type VariantJSProps<ComponentOptions extends WithVariantProps<Data> = {
  classes?: CSSClass;
  fixedClasses?: CSSClass;
  variants?: Variants<Data>;
  variant?: string;
  class?: string;
}, PropsOptions extends Readonly<ComponentPropsOptions> = {
  classes: {
    type: PropType<CSSClass>;
    default: undefined;
  },
  fixedClasses: {
    type: PropType<CSSClass>;
    default: undefined;
  },
  variants: {
    type: PropType<Variants<ComponentOptions>>;
    default: undefined;
  },
  variant: {
    type:PropType<string | undefined>;
    default: undefined;
  },
}> = PropsOptions & {
  classes: {
    type: PropType<CSSClass>;
    default: undefined;
  },
  fixedClasses: {
    type: PropType<CSSClass>;
    default: undefined;
  },
  variants: {
    type: PropType<Variants<ComponentOptions>>;
    default: undefined;
  },
  variant: {
    type:PropType<string | undefined>;
    default: undefined;
  },
};

type VariantJSWithClassesListProps<
  ClassesKeys extends string,
  ComponentOptions extends WithVariantPropsAndClassesList<Data, ClassesKeys> = WithVariantPropsAndClassesList<Data, ClassesKeys>,
  PropsOptions extends Readonly<ComponentPropsOptions> = {
    classes: {
      type: PropType<CSSRawClassesList<ClassesKeys>>;
      default: undefined;
    },
    fixedClasses: {
      type: PropType<CSSRawClassesList<ClassesKeys>>;
      default: undefined;
    },
    variants: {
      type: PropType<VariantsWithClassesList<ComponentOptions, ClassesKeys>>;
      default: undefined;
    },
    variant: {
      type:PropType<string | undefined>;
      default: undefined;
    },
  }> = PropsOptions & {
    classes: {
      type: PropType<CSSRawClassesList<ClassesKeys>>;
      default: undefined;
    },
    fixedClasses: {
      type: PropType<CSSRawClassesList<ClassesKeys>>;
      default: undefined;
    },
    variants: {
      type: PropType<VariantsWithClassesList<ComponentOptions, ClassesKeys>>;
      default: undefined;
    },
    variant: {
      type:PropType<string | undefined>;
      default: undefined;
    },
  };

type VariantJSConfiguration = {
  // TInput?: TInputOptions
  // TSelect?: TSelectOptions
  // TRadio?: TRadioOptions
  // TCheckbox?: TCheckboxOptions
  // TButton?: TButtonOptions
  // TTextarea?: TTextareaOptions
  // TTag?: TTagOptions
  // TCard?: TCardOptions
  // TInputGroup?: TInputGroupOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
};

export { VariantJSConfiguration, VariantJSProps, VariantJSWithClassesListProps };
