import {
  CSSRawClassesList,
  CSSClass,
  Variants,
  VariantsWithClassesList,
  WithVariantProps,
  WithVariantPropsAndClassesList,
  Data,
} from '@/core';

import { ComponentPropsOptions, PropType } from 'vue';

import { VCInputOptions } from '@/components/Input/Type';

type VcProps<ComponentOptions extends WithVariantProps<Data> = {
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

type VCWithClassesListProps<
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

type VCConfiguration = {
   TInput?: VCInputOptions,
   VanillaInputText?: VCInputOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
};

export {
  VCConfiguration,
  VcProps,
  VCWithClassesListProps,
};
