import type { ComponentPropsOptions, PropType } from 'vue'
import type { CSSRawClassesList, Data, VariantsWithClassesList, WithVariantPropsAndClassesList } from './index'
import type * as Components from '@/components'

/**
 * Stores the Type for all components available in project
 */
interface ComponentsConfiguration {
  Avatar?: Components.AvatarProps
  Button?: Components.ButtonProps
  Card?: Components.CardProps
  Checkbox?: Components.CheckboxProps
  CheckboxGroup?: Components.CheckboxProps
  CountryInput?: Components.CountryInputProps
  CountryInputOption?: Components.CountryInputOptionProps
  Datatable?: Components.DatatableProps
  DateTimeInput?: Components.DateTimeInputProps
  Dialog?: Components.DialogProps
  Dropdown?: Components.DropdownProps
  FormErrors?: Components.FormErrorsProps
  FormFeedback?: Components.FormFeedbackProps
  FormLabel?: Components.FormLabelProps
  FormSection?: Components.FormSectionProps
  Input?: Components.InputProps
  InputGroup?: Components.InputGroupProps
  PhoneInput?: Components.PhoneInputProps
  RichRadio?: Components.RichRadioProps
  RichRadioOption?: Components.RichRadioOptionProps
  RichSelect?: Components.RichSelectProps
  RichSelectOptionWithImage?: Components.RichSelectOptionWithImageProps
  RichSelectOptionWithIndicators?: Components.RichSelectOptionWithIndicatorsProps
  RichSelectTagWithImage?: Components.RichSelectTagWithImageProps
  Select?: Components.SelectProps
  SkeletonBar?: Components.SkeletonBarProps
  Slideover?: Components.SlideoverProps
  StatusIndicator?: Components.StatusIndicatorProps
  Textarea?: Components.TextareaProps
  Toggle?: Components.ToggleProps
  [key: string]: any
}

/**
 * Same as above but with classes list
 */
type ComponentProps<
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
  ComponentsConfiguration,
  ComponentProps,
}
