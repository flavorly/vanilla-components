import { ComponentPropsOptions, PropType } from 'vue';
import {
  CSSRawClassesList,
  CSSClass,
  Variants,
  VariantsWithClassesList,
  WithVariantProps,
  WithVariantPropsAndClassesList,
  Data,
  Errors,
} from '@/core/types';

import { VanillaDatetimePickerProps } from '@/components/DatetimePicker';
import { VanillaFormErrorsProps } from '@/components/FormErrors';
import { VanillaFormFeedbackProps } from '@/components/FormFeedback';
import { VanillaInputProps } from '@/components/Input';
import { VanillaPhoneNumberProps } from '@/components/PhoneNumber';
import { VanillaRichSelectProps } from '@/components/RichSelect';
import { VanillaSelectCountryProps } from '@/components/SelectCountry';
import { VanillaTextareaProps } from '@/components/Textarea';

/**
 * Stores the Type for all components available in project
 */
type VanillaComponentConfiguration = {
  VanillaDatetimePicker?: VanillaDatetimePickerProps,
  VanillaFormErrors?: VanillaFormErrorsProps,
  VanillaFormFeedback?: VanillaFormFeedbackProps
  VanillaInput?: VanillaInputProps,
  VanillaPhoneNumber?: VanillaPhoneNumberProps,
  VanillaRichSelect?: VanillaRichSelectProps,
  VanillaSelectCountry?: VanillaSelectCountryProps,
  VanillaTextarea?: VanillaTextareaProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
};


/**
 * Props definition for the component
 */
type VanillaComponentProps<ComponentOptions extends WithVariantProps<Data> = {
  classes?: CSSClass;
  fixedClasses?: CSSClass;
  variants?: Variants<Data>;
  variant?: string;
  class?: string;
  errors?: Errors;
  feedback?: string;
  name?: string;
  hasItemBellow?: boolean;
  hasItemAbove?: boolean;
  showErrors?: boolean;
  showFeedback?: boolean;
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
    default: undefined | string | never;
  },
  errors: {
    type:PropType<Errors>;
    default: undefined;
  },
  feedback: {
    type:PropType<string | undefined>;
    default: undefined;
  },
  name: {
    type: PropType<string | undefined>;
    default: string;
    required: boolean,
  },
  hasItemBellow: {
    type: PropType<boolean>;
    default: boolean;
    required: boolean,
  },
  hasItemAbove: {
    type: PropType<boolean>;
    default: boolean;
    required: boolean,
  },
  showErrors: {
    type: PropType<boolean>;
    default: boolean;
    required: boolean,
  },
  showFeedback: {
    type: PropType<boolean>;
    default: boolean;
    required: boolean,
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
    type: PropType<string | undefined>;
    default: undefined;
  },
  errors: {
    type: PropType<Errors>;
    default: undefined;
  },
  feedback: {
    type: PropType<string | undefined>;
    default: undefined;
  },
  name: {
    type: PropType<string | undefined>;
    default: string;
    required: boolean,
  },
  hasItemBellow: {
    type: PropType<boolean>;
    default: boolean;
    required: boolean,
  },
  hasItemAbove: {
    type: PropType<boolean>;
    default: boolean;
    required: boolean,
  },
  showErrors: {
    type: PropType<boolean>;
    default: boolean;
    required: boolean,
  },
  showFeedback: {
    type: PropType<boolean>;
    default: boolean;
    required: boolean,
  },
};

/**
 * Same as above but with classes list
 */
type VanillaComponentWithClassesListProps<
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
    errors: {
      type:PropType<Errors>;
      default: undefined;
    },
    feedback: {
      type:PropType<string | undefined>;
      default: undefined;
    },
    name: {
      type: PropType<string | undefined>;
      default: string;
      required: boolean,
    },
    hasItemBellow: {
      type: PropType<boolean>;
      default: boolean;
      required: boolean,
    },
    hasItemAbove: {
      type: PropType<boolean>;
      default: boolean;
      required: boolean,
    },
    showErrors: {
      type: PropType<boolean>;
      default: boolean;
      required: boolean,
    },
    showFeedback: {
      type: PropType<boolean>;
      default: boolean;
      required: boolean,
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
    errors: {
      type:PropType<Errors>;
      default: undefined;
    },
    feedback: {
      type:PropType<string | undefined>;
      default: undefined;
    },
    name: {
      type: PropType<string | undefined>;
      default: string;
      required: boolean,
    },
    hasItemBellow: {
      type: PropType<boolean>;
      default: boolean;
      required: boolean,
    },
    hasItemAbove: {
      type: PropType<boolean>;
      default: boolean;
      required: boolean,
    },
    showErrors: {
      type: PropType<boolean>;
      default: boolean;
      required: boolean,
    },
    showFeedback: {
      type: PropType<boolean>;
      default: boolean;
      required: boolean,
    },
  };

export {
  VanillaComponentConfiguration,
  VanillaComponentProps,
  VanillaComponentWithClassesListProps,
};
