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

import { VanillaAvatarProps } from '@/components/Avatar/Type';
import { VanillaButtonProps } from '@/components/Button/Type';
import { VanillaCardProps } from '@/components/Card/Type';
import { VanillaCheckboxProps } from '@/components/Checkbox/Type';
import { VanillaDatatableProps } from '@/components/Datatable/Type';
import { VanillaDatetimePickerProps } from '@/components/DatetimePicker/Type';
import { VanillaDialogProps } from '@/components/Dialog/Type';
import { VanillaDropdownProps } from '@/components/Dropdown/Type';
import { VanillaFormErrorsProps } from '@/components/FormErrors/Type';
import { VanillaFormFeedbackProps } from '@/components/FormFeedback/Type';
import { VanillaFormLabelProps } from '@/components/FormLabel/Type';
import { VanillaFormSectionProps } from '@/components/FormSection/Type';
import { VanillaInputProps } from '@/components/Input/Type';
import { VanillaInputGroupProps } from '@/components/InputGroup/Type';
import { VanillaPhoneNumberProps } from '@/components/PhoneNumber/Type';
import { VanillaRichRadioProps } from '@/components/RichRadio/Type';
import { VanillaRichRadioOptionProps } from '@/components/RichRadio/RichRadioOption/Type';
import { VanillaRichSelectProps } from '@/components/RichSelect/Type';
import { VanillaRichSelectOptionWithImageProps } from '@/components/RichSelect/RichSelectOptionWithImage/Type';
import { VanillaRichSelectOptionWithIndicatorsProps } from '@/components/RichSelect/RichSelectOptionWithIndicators/Type';
import { VanillaRichSelectStateProps } from '@/components/RichSelect/RichSelectState/Type';
import { VanillaRichSelectTagWithImageProps } from '@/components/RichSelect/RichSelectTagWithImage/Type';
import { VanillaSelectProps } from '@/components/Select/Type';
import { VanillaSelectCountryProps } from '@/components/SelectCountry/Type';
import { VanillaSelectCountryOptionProps } from '@/components/SelectCountry/SelectCountryOption/Type';
import { VanillaSkeletonBarProps } from '@/components/Skeletons/SkeletonBar/Type';
import { VanillaSlideoverProps } from '@/components/Slideover/Type';
import { VanillaStatusIndicatorProps } from '@/components/StatusIndicator/Type';
import { VanillaTextareaProps } from '@/components/Textarea/Type';
import { VanillaToggleProps } from '@/components/Toggle/Type';
/**
 * Stores the Type for all components available in project
 */
type VanillaComponentConfiguration = {
  VanillaAvatar?: VanillaAvatarProps,
  VanillaButton?: VanillaButtonProps,
  VanillaCard?: VanillaCardProps,
  VanillaCheckbox?: VanillaCheckboxProps,
  VanillaDatatable?: VanillaDatatableProps,
  VanillaDatetimePicker?: VanillaDatetimePickerProps,
  VanillaDialog?: VanillaDialogProps,
  VanillaDropdown?: VanillaDropdownProps,
  VanillaDropdownExtended?: VanillaDropdownProps,

  VanillaFormErrors?: VanillaFormErrorsProps,
  VanillaFormFeedback?: VanillaFormFeedbackProps,
  VanillaFormLabel?: VanillaFormLabelProps,
  VanillaFormSection?: VanillaFormSectionProps,

  VanillaInput?: VanillaInputProps,
  VanillaInputGroup?: VanillaInputGroupProps,

  VanillaPhoneNumber?: VanillaPhoneNumberProps,

  VanillaRichRadio?: VanillaRichRadioProps,
  VanillaRichRadioOption?: VanillaRichRadioOptionProps,

  VanillaRichSelect?: VanillaRichSelectProps,
  VanillaRichSelectOptionWithImage?: VanillaRichSelectOptionWithImageProps,
  VanillaRichSelectOptionWithIndicators?: VanillaRichSelectOptionWithIndicatorsProps,
  VanillaRichSelectState?: VanillaRichSelectStateProps,
  VanillaRichSelectTagWithImage?: VanillaRichSelectTagWithImageProps,

  VanillaSelect?: VanillaSelectProps,
  VanillaSelectCountry?: VanillaSelectCountryProps,
  VanillaSelectCountryOption?: VanillaSelectCountryOptionProps,

  VanillaSkeletonBar?: VanillaSkeletonBarProps,
  VanillaSlideover?: VanillaSlideoverProps,
  VanillaStatusIndicator?: VanillaStatusIndicatorProps,

  VanillaTextarea?: VanillaTextareaProps,
  VanillaToggle?: VanillaToggleProps,
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
  autocomplete?: string | boolean;
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
  autocomplete: {
    type: PropType<string | boolean>;
    default: string | boolean;
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
  autocomplete: {
    type: PropType<string | boolean>;
    default: string | boolean;
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
    autocomplete: {
      type: PropType<string | boolean>;
      default: string | boolean;
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
    autocomplete: {
      type: PropType<string | boolean>;
      default: string | boolean;
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
