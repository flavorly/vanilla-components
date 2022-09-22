import type { ComponentPropsOptions, PropType } from 'vue'

import type {
  CSSRawClassesList,
  CssClass,
  Data,
  Variants,
  VariantsWithClassesList,
  WithVariantProps,
  WithVariantPropsAndClassesList,
 } from './index'
import type { AvatarProps } from '@/components/avatar/config'
import type { ButtonProps } from '@/components/components/button/config'
import type { CardProps } from '@/components/components/card/config'
import type { CheckboxProps } from '@/components/components/checkbox/config'
import type { DatatableProps } from '@/components/components/datatable/config'
import type { DatetimePickerProps } from '@/components/components/datetime-input/config'
import type { DialogProps } from '@/components/components/dialog/config'
import type { DropdownProps } from '@/components/components/Dropdown/config'
import type { FormErrorsProps } from '@/components/components/FormErrors/Type'
import type { FormFeedbackProps } from '@/components/components/FormFeedback/config'
import type { FormLabelProps } from '@/components/components/FormLabel/Type'
import type { FormSectionProps } from '@/components/components/FormSection/Type'
import type { InputProps } from '@/components/components/input/config'
import type { InputGroupProps } from '@/components/components/InputGroup/Type'
import type { PhoneNumberProps } from '@/components/components/PhoneNumber/Type'
import type { RichRadioProps } from '@/components/components/RichRadio/Type'
import type { RichRadioOptionProps } from '@/components/components/RichRadio/RichRadioOption/Type'
import type { RichSelectProps } from '@/components/components/RichSelect/Type'
import type { RichSelectOptionWithImageProps } from '@/components/components/RichSelect/RichSelectOptionWithImage/Type'
import type { RichSelectOptionWithIndicatorsProps } from '@/components/components/RichSelect/RichSelectOptionWithIndicators/Type'
import type { RichSelectStateProps } from '@/components/components/RichSelect/RichSelectState/Type'
import type { RichSelectTagWithImageProps } from '@/components/components/RichSelect/RichSelectTagWithImage/Type'
import type { SelectProps } from '@/components/components/select/config'
import type { SelectCountryProps } from '@/components/components/SelectCountry/Type'
import type { SelectCountryOptionProps } from '@/components/components/SelectCountry/SelectCountryOption/Type'
import type { SkeletonBarProps } from '@/components/components/Skeletons/SkeletonBar/Type'
import type { SlideoverProps } from '@/components/components/slideover/config'
import type { StatusIndicatorProps } from '@/components/components/StatusIndicator/Type'
import type { TextareaProps } from '@/components/components/textarea/type'
import type { ToggleProps } from '@/components/components/toggle/config'

/**
 * Stores the Type for all components available in project
 */
interface VanillaComponentConfiguration {
  Avatar?: AvatarProps
  Button?: ButtonProps
  Card?: CardProps
  Checkbox?: CheckboxProps
  Datatable?: DatatableProps
  DatetimePicker?: DatetimePickerProps
  Dialog?: DialogProps
  Dropdown?: DropdownProps
  DropdownExtended?: DropdownProps

  FormErrors?: FormErrorsProps
  FormFeedback?: FormFeedbackProps
  FormLabel?: FormLabelProps
  FormSection?: FormSectionProps

  Input?: InputProps
  InputGroup?: InputGroupProps

  PhoneNumber?: PhoneNumberProps

  RichRadio?: RichRadioProps
  RichRadioOption?: RichRadioOptionProps

  RichSelect?: RichSelectProps
  RichSelectOptionWithImage?: RichSelectOptionWithImageProps
  RichSelectOptionWithIndicators?: RichSelectOptionWithIndicatorsProps
  RichSelectState?: RichSelectStateProps
  RichSelectTagWithImage?: RichSelectTagWithImageProps

  Select?: SelectProps
  SelectCountry?: SelectCountryProps
  SelectCountryOption?: SelectCountryOptionProps

  SkeletonBar?: SkeletonBarProps
  Slideover?: SlideoverProps
  StatusIndicator?: StatusIndicatorProps

  Textarea?: TextareaProps
  Toggle?: ToggleProps

  [key: string]: any
}

/**
 * Props definition for the component
 */
type VanillaComponentProps<ComponentOptions extends WithVariantProps<Data> = {
  classes?: CssClass
  fixedClasses?: CssClass
  variants?: Variants<Data>
  variant?: string
  class?: string
  errors?: string
  feedback?: string
  name?: string
  hasItemBellow?: boolean
  hasItemAbove?: boolean
  showErrors?: boolean
  showFeedback?: boolean
}, PropsOptions extends Readonly<ComponentPropsOptions> = {
  classes: {
    type: PropType<CssClass>
    default: undefined
  }
  fixedClasses: {
    type: PropType<CssClass>
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
    type: PropType<string | undefined>
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
    type: PropType<CssClass>
    default: undefined
  }
  fixedClasses: {
    type: PropType<CssClass>
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
    type: PropType<string | undefined>
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
      type: PropType<string | undefined>
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
      type: PropType<string | undefined>
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
