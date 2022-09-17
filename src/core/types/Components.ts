import type { ComponentPropsOptions, PropType } from 'vue'
import type {
  CSSClass,
  CSSRawClassesList,
  Data,
  Errors,
  Variants,
  VariantsWithClassesList,
  WithVariantProps,
  WithVariantPropsAndClassesList,
 } from '@/core/types'

import type { VanillaAvatarProps } from '@/components/Avatar/Type'
import type { VanillaButtonProps } from '@/components/Button/Type'
import type { VanillaCardProps } from '@/components/Card/Type'
import type { VanillaCheckboxProps } from '@/components/Checkbox/Type'
import type { VanillaDatatableProps } from '@/components/Datatable/Type'
import type { VanillaDatetimePickerProps } from '@/components/DatetimePicker/Type'
import type { VanillaDialogProps } from '@/components/Dialog/Type'
import type { VanillaDropdownProps } from '@/components/Dropdown/Type'
import type { VanillaFormErrorsProps } from '@/components/FormErrors/Type'
import type { VanillaFormFeedbackProps } from '@/components/FormFeedback/Type'
import type { VanillaFormLabelProps } from '@/components/FormLabel/Type'
import type { VanillaFormSectionProps } from '@/components/FormSection/Type'
import type { VanillaInputProps } from '@/components/Input/Type'
import type { VanillaInputGroupProps } from '@/components/InputGroup/Type'
import type { VanillaPhoneNumberProps } from '@/components/PhoneNumber/Type'
import type { VanillaRichRadioProps } from '@/components/RichRadio/Type'
import type { VanillaRichRadioOptionProps } from '@/components/RichRadio/RichRadioOption/Type'
import type { VanillaRichSelectProps } from '@/components/RichSelect/Type'
import type { VanillaRichSelectOptionWithImageProps } from '@/components/RichSelect/RichSelectOptionWithImage/Type'
import type { VanillaRichSelectOptionWithIndicatorsProps } from '@/components/RichSelect/RichSelectOptionWithIndicators/Type'
import type { VanillaRichSelectStateProps } from '@/components/RichSelect/RichSelectState/Type'
import type { VanillaRichSelectTagWithImageProps } from '@/components/RichSelect/RichSelectTagWithImage/Type'
import type { VanillaSelectProps } from '@/components/Select/Type'
import type { VanillaSelectCountryProps } from '@/components/SelectCountry/Type'
import type { VanillaSelectCountryOptionProps } from '@/components/SelectCountry/SelectCountryOption/Type'
import type { VanillaSkeletonBarProps } from '@/components/Skeletons/SkeletonBar/Type'
import type { VanillaSlideoverProps } from '@/components/Slideover/Type'
import type { VanillaStatusIndicatorProps } from '@/components/StatusIndicator/Type'
import type { VanillaTextareaProps } from '@/components/Textarea/Type'
import type { VanillaToggleProps } from '@/components/Toggle/Type'

/**
 * Stores the Type for all components available in project
 */
interface VanillaComponentConfiguration {
  VanillaAvatar?: VanillaAvatarProps
  VanillaButton?: VanillaButtonProps
  VanillaCard?: VanillaCardProps
  VanillaCheckbox?: VanillaCheckboxProps
  VanillaDatatable?: VanillaDatatableProps
  VanillaDatetimePicker?: VanillaDatetimePickerProps
  VanillaDialog?: VanillaDialogProps
  VanillaDropdown?: VanillaDropdownProps
  VanillaDropdownExtended?: VanillaDropdownProps

  VanillaFormErrors?: VanillaFormErrorsProps
  VanillaFormFeedback?: VanillaFormFeedbackProps
  VanillaFormLabel?: VanillaFormLabelProps
  VanillaFormSection?: VanillaFormSectionProps

  VanillaInput?: VanillaInputProps
  VanillaInputGroup?: VanillaInputGroupProps

  VanillaPhoneNumber?: VanillaPhoneNumberProps

  VanillaRichRadio?: VanillaRichRadioProps
  VanillaRichRadioOption?: VanillaRichRadioOptionProps

  VanillaRichSelect?: VanillaRichSelectProps
  VanillaRichSelectOptionWithImage?: VanillaRichSelectOptionWithImageProps
  VanillaRichSelectOptionWithIndicators?: VanillaRichSelectOptionWithIndicatorsProps
  VanillaRichSelectState?: VanillaRichSelectStateProps
  VanillaRichSelectTagWithImage?: VanillaRichSelectTagWithImageProps

  VanillaSelect?: VanillaSelectProps
  VanillaSelectCountry?: VanillaSelectCountryProps
  VanillaSelectCountryOption?: VanillaSelectCountryOptionProps

  VanillaSkeletonBar?: VanillaSkeletonBarProps
  VanillaSlideover?: VanillaSlideoverProps
  VanillaStatusIndicator?: VanillaStatusIndicatorProps

  VanillaTextarea?: VanillaTextareaProps
  VanillaToggle?: VanillaToggleProps

  [key: string]: any
}

/**
 * Props definition for the component
 */
type VanillaComponentProps<ComponentOptions extends WithVariantProps<Data> = {
  classes?: CSSClass
  fixedClasses?: CSSClass
  variants?: Variants<Data>
  variant?: string
  class?: string
  errors?: Errors
  feedback?: string
  name?: string
  autocomplete?: string | boolean
  hasItemBellow?: boolean
  hasItemAbove?: boolean
  showErrors?: boolean
  showFeedback?: boolean
}, PropsOptions extends Readonly<ComponentPropsOptions> = {
  classes: {
    type: PropType<CSSClass>
    default: undefined
  }
  fixedClasses: {
    type: PropType<CSSClass>
    default: undefined
  }
  variants: {
    type: PropType<Variants<ComponentOptions>>
    default: undefined
  }
  variant: {
    type: PropType<string | undefined>
    default: undefined | string | never
  }
  errors: {
    type: PropType<Errors>
    default: undefined
  }
  feedback: {
    type: PropType<string | undefined>
    default: undefined
  }
  name: {
    type: PropType<string | undefined>
    default: string
    required: boolean
  }
  autocomplete: {
    type: PropType<string | boolean>
    default: string | boolean
    required: boolean
  }
  hasItemBellow: {
    type: PropType<boolean>
    default: boolean
    required: boolean
  }
  hasItemAbove: {
    type: PropType<boolean>
    default: boolean
    required: boolean
  }
  showErrors: {
    type: PropType<boolean>
    default: boolean
    required: boolean
  }
  showFeedback: {
    type: PropType<boolean>
    default: boolean
    required: boolean
  }
}> = PropsOptions & {
  classes: {
    type: PropType<CSSClass>
    default: undefined
  }
  fixedClasses: {
    type: PropType<CSSClass>
    default: undefined
  }
  variants: {
    type: PropType<Variants<ComponentOptions>>
    default: undefined
  }
  variant: {
    type: PropType<string | undefined>
    default: undefined
  }
  errors: {
    type: PropType<Errors>
    default: undefined
  }
  feedback: {
    type: PropType<string | undefined>
    default: undefined
  }
  name: {
    type: PropType<string | undefined>
    default: string
    required: boolean
  }
  autocomplete: {
    type: PropType<string | boolean>
    default: string | boolean
    required: boolean
  }
  hasItemBellow: {
    type: PropType<boolean>
    default: boolean
    required: boolean
  }
  hasItemAbove: {
    type: PropType<boolean>
    default: boolean
    required: boolean
  }
  showErrors: {
    type: PropType<boolean>
    default: boolean
    required: boolean
  }
  showFeedback: {
    type: PropType<boolean>
    default: boolean
    required: boolean
  }
}

/**
 * Same as above but with classes list
 */
type VanillaComponentWithClassesListProps<
  ClassesKeys extends string,
  ComponentOptions extends WithVariantPropsAndClassesList<Data, ClassesKeys> = WithVariantPropsAndClassesList<Data, ClassesKeys>,
  PropsOptions extends Readonly<ComponentPropsOptions> = {
    classes: {
      type: PropType<CSSRawClassesList<ClassesKeys>>
      default: undefined
    }
    fixedClasses: {
      type: PropType<CSSRawClassesList<ClassesKeys>>
      default: undefined
    }
    variants: {
      type: PropType<VariantsWithClassesList<ComponentOptions, ClassesKeys>>
      default: undefined
    }
    variant: {
      type: PropType<string | undefined>
      default: undefined
    }
    errors: {
      type: PropType<Errors>
      default: undefined
    }
    feedback: {
      type: PropType<string | undefined>
      default: undefined
    }
    name: {
      type: PropType<string | undefined>
      default: string
      required: boolean
    }
    autocomplete: {
      type: PropType<string | boolean>
      default: string | boolean
      required: boolean
    }
    hasItemBellow: {
      type: PropType<boolean>
      default: boolean
      required: boolean
    }
    hasItemAbove: {
      type: PropType<boolean>
      default: boolean
      required: boolean
    }
    showErrors: {
      type: PropType<boolean>
      default: boolean
      required: boolean
    }
    showFeedback: {
      type: PropType<boolean>
      default: boolean
      required: boolean
    }
  }> = PropsOptions & {
    classes: {
      type: PropType<CSSRawClassesList<ClassesKeys>>
      default: undefined
    }
    fixedClasses: {
      type: PropType<CSSRawClassesList<ClassesKeys>>
      default: undefined
    }
    variants: {
      type: PropType<VariantsWithClassesList<ComponentOptions, ClassesKeys>>
      default: undefined
    }
    variant: {
      type: PropType<string | undefined>
      default: undefined
    }
    errors: {
      type: PropType<Errors>
      default: undefined
    }
    feedback: {
      type: PropType<string | undefined>
      default: undefined
    }
    name: {
      type: PropType<string | undefined>
      default: string
      required: boolean
    }
    autocomplete: {
      type: PropType<string | boolean>
      default: string | boolean
      required: boolean
    }
    hasItemBellow: {
      type: PropType<boolean>
      default: boolean
      required: boolean
    }
    hasItemAbove: {
      type: PropType<boolean>
      default: boolean
      required: boolean
    }
    showErrors: {
      type: PropType<boolean>
      default: boolean
      required: boolean
    }
    showFeedback: {
      type: PropType<boolean>
      default: boolean
      required: boolean
    }
  }

export {
  VanillaComponentConfiguration,
  VanillaComponentProps,
  VanillaComponentWithClassesListProps,
}
